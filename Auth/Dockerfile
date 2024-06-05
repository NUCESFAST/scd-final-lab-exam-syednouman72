# Auth Service Dockerfile
FROM node:14

# Set working directory
WORKDIR /1172_auth

# Copy package.json and package-lock.json
COPY package.json /1172_auth/package.json

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . /1172_auth

# Expose the port the app runs on
EXPOSE 4000

# Start the application
CMD ["node", "index.js"]
