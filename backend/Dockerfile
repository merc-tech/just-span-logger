# Use a base image with Node.js
FROM node:18.17.1

# Set the working directory in the container
WORKDIR /app

RUN yarn set version canary

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock .yarnrc.yml /app/

# Install Yarn globally

# Install project dependencies
RUN yarn install --immutable

# Copy the rest of the application code
COPY . .

# Build your application (adjust the command based on your project)
RUN yarn exec prisma generate
RUN yarn build

# Expose the port your app runs on
EXPOSE 80

# Specify the command to run on container start
CMD ["yarn", "start:prod"]
