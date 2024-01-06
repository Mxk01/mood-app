FROM node:21-alpine3.18

# CD into the /app directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the /app (working) directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app to the container
COPY . .

# Expose the port used by your React Native app (e.g., 3000 for Metro Bundler)
EXPOSE 3000

# Start your React Native app
CMD ["npm", "start"]
