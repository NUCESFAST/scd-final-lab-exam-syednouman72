// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const axios = require('axios');
const cors = require('cors');
const { MongoClient } = require('mongodb');

// MongoDB connection URL
const url = 'mongodb://localhost:27017/';

// Function to connect to MongoDB and return the database object
async function connectToDatabase() {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db('ClassroomMS');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

// Create express app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Route to create a new class
app.post('/create_class', async (req, res) => {
    try {
        const classId = randomBytes(3).toString('hex');
        const { userId, title } = req.body;
        const newClass = { id: classId, data: { classId: classId, title: title }}

        const db = await connectToDatabase();
        const userCollection = db.collection('user');
        await userCollection.updateOne(
            { 'id': userId }, 
            { $push: { 'class_list': classId } }
        );

        const classesCollection = db.collection('classes');
        await classesCollection.insertOne(newClass);

        await axios.post('http://localhost:4009/events', {
            type: 'ClassCreated',
            data: classId
        });

        res.status(201).send('Class created');
    } catch (error) {
        console.error('Error creating class:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to add a class
app.post('/add_class', async (req, res) => {
    try {
        const { userId, classId } = req.body;

        const db = await connectToDatabase();
        const userCollection = db.collection('user');
        await userCollection.updateOne(
            { 'id': userId },
            { $push: { 'class_list': classId } }
        );

        res.status(202).send({});
    } catch (error) {
        console.error('Error adding class:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to get classes for a user
app.get('/get_classes/:id', async (req, response) => {
    try {
        const userId = req.params.id;
        let resClassList = [];

        const db = await connectToDatabase();
        const userCollection = db.collection('user');
        const user = await userCollection.findOne({ id: userId });
        
        if (!user) {
            return response.status(404).send('User not found');
        }

        const classesCollection = db.collection('classes');
        const classIds = user.class_list;

        for (const classId of classIds) {
            const classData = await classesCollection.findOne({ id: classId });
            if (classData) {
                resClassList.push(classData.data);
            }
        }

        response.status(200).send({ data: resClassList });
    } catch (error) {
        console.error('Error getting classes:', error);
        response.status(500).send('Internal Server Error');
    }
});

// Start the server
const PORT = 4001;
app.listen(PORT, () => {
    console.log(`Classroom service listening at port ${PORT}`);
});
