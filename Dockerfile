# Base image
FROM node:16-alpine

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

ENV PORT 8001

# Expose port 8001
EXPOSE $PORT

# Start the app
CMD ["npm", "start"]