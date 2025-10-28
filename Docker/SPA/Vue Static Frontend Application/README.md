# Vue Single Page Application (SPA) with Vite, Nginx & Docker

[![Tech Stack](https://skillicons.dev/icons?i=vue,vite,nodejs,npm,nginx,docker)](https://skillicons.dev)

## 📝 Description
This project demonstrates how to build and serve a **Vue Single Page Application (SPA)** using **Vite** for lightning-fast development and **Nginx** as the production-grade static file server — all fully containerized with a **multi-stage Docker build**.

The setup is lightweight, optimized for production, and ensures clean separation between the build and serve stages.



## 🎯 Goal
To create a modern, containerized frontend stack that:
- Uses **Vite** for blazing-fast builds and hot-reload during development.
- Uses **Nginx** for efficient production serving.
- Utilizes **Docker multi-stage builds** for smaller image sizes.




## 🧰 Technologies Used

| Technology | Version | Purpose |
|-------------|----------|----------|
| **Vue** | 3.x | UI library for building Vue SPA |
| **Vite** | 5.x+ | Frontend build tool (faster alternative to CRA) |
| **Node.js** | 22.x | Used for building the Vue app |
| **npm** | 10.x | Package manager for Node modules |
| **Nginx** | stable-alpine | Production web server for static assets |
| **Docker** | 28.x+ | Containerization platform |

---

## 🏗️ Project Setup Steps

### 1️⃣ Initialize the React + Vite Project
Run the following commands to scaffold the project:
```bash
npm create vite@latest "Vue Static Frontend Application"
cd "Vue Static Frontend Application"
npm install
npm run dev
```

### 2️⃣ Create the Dockerfile

Create a `Dockerfile` in the project root with the following content:

```Dockerfile

# BUILD STAGE

FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency files first (leverage Docker cache)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build for production
RUN npm run build


# PRODUCTION STAGE

FROM nginx:1.27-alpine AS production

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

```

### 3️⃣ Create the Nginx Configuration
Create a file named `nginx.conf` in the project root with the following content:

```
server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Optional: gzip compression
    gzip on;
    gzip_types text/plain application/json text/css application/javascript;
}

```

### 4️⃣ Build and Run the Docker Container

Build the Docker image:
```bash
docker build -t my-vue-spa .
``` 
Run the container:
```bash
docker run -d -p 8080:80 --name my-vue-spa my-vue-spa
``` 

### 5️⃣ Access the Application
Open your browser and navigate to `http://localhost:8080` to see your Vue SPA served by Nginx!

## 📸 Screenshot

![Vue SPA Screenshot](image.png)
