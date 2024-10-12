# Stage 1: Build the React app
FROM node:20 as build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for better caching of npm install
COPY package*.json ./

# Clean npm cache and install dependencies
RUN npm cache clean --force && npm install

# Copy the rest of the project files
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React files from the build stage
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
