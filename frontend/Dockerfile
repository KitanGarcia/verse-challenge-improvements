# Specify base image
FROM node:18-alpine

# Initialize working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory above
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy rest of project files from current directory to the working directory above
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000 from your container to local network
EXPOSE 3000

# Set the command to start the Next.js server
CMD npm run dev
