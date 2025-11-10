# Use the official Node.js 22 image (Alpine = small Linux) as the build environment
FROM node:22-alpine AS build

# Set /app as the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container (for dependency install)
COPY package*.json ./

# Install all Node/npm dependencies defined in package.json
RUN npm install

# Copy the rest of the Angular project files into the container
COPY . .

# Run the Angular build command to produce the production-ready files in /app/dist
RUN npm run build

# Use a lightweight Nginx image to serve the built Angular app
FROM nginx:alpine 

# Copy the built Angular files from the build stage into Nginx's default web root
# (dist folder name must match your Angular output path: "food-delivery-ui" here)
COPY --from=build /app/dist/food-delivery-ui /usr/share/nginx/html

# Document that the container will listen on port 80 (HTTP)
EXPOSE 80

# Start Nginx in the foreground (required so the container keeps running)
CMD ["nginx", "-g", "daemon off;"]