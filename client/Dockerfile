# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React application
RUN npm run build

# Install `serve` to serve the build folder
RUN npm install -g serve

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV NODE_ENV production

# Start the app
CMD ["serve", "-s", "build", "-l", "3000"]