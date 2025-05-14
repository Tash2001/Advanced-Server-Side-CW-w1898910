# Use official Node image as base
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire frontend code
COPY . .

# Build the React app
RUN npm run build

# Serve with a simple static server
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
