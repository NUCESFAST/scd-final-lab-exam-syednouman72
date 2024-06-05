# Event Bus Service Dockerfile
FROM node:14

# Set working directory
WORKDIR /1172_eventbus

# Copy package.json and package-lock.json
COPY package.json /1172_eventbus/package.json

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . /1172_eventbus

# Expose the port the app runs on
EXPOSE 4009

# Start the application
CMD ["node", "index.js"]
