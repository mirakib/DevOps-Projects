# Project: Angular SPA Deployment with Docker 🐳


## 📜 Description

This project is a complete, containerized implementation of a **Angular 17** web application. The primary goal is to demonstrate a highly optimized, production-ready deployment using a multi-stage Docker build.

The application itself is a simple static "Hello World" page designed to test the containerization pipeline.

## 🛠️ Tech Stack

| Component | Technology | Version |
| :-- | :-- | :-- |
| Web framework | Angular | 17 |
| Build toolchain | Node.js | LTS (node:lts-alpine base) |
| Web server | Nginx | Alpine flavor |

## 📦 Container Strategy

| Stage | Purpose | Docker image |
| :-- | :-- | :-- |
| Stage 1 | Install dependencies and build Angular assets | `node:lts-alpine` |
| Stage 2 | Serve compiled assets via production web server | `nginx:alpine` |

### Key Optimization Feature

The core of this project is the `Dockerfile`, which uses a multi-stage build pattern:

1. **Stage 1 – Build:** Install dependencies and compile the Angular bundle using `node:lts-alpine`.
2. **Stage 2 – Serve:** Copy the build artifacts into `nginx:alpine` and expose port 80 for production-ready delivery.

## 🚀 Getting Started

Follow these instructions to build and run the application on your local machine.


1.  **Build the Image:**
    Navigate to the project directory in your terminal and run the following command. This will create a Docker image tagged with the name you provide.

    ```bash
    docker build -t image-name:v1 .
    ```

2.  **Run the Container:**
    Once the image is built, use this command to start the container. This maps your local port 8080 to the container's internal port.

    ```bash
    docker run -d -p 8080:80 --name container-name image-name:v1
    ```

### Verification

Once the container is running, access the application in your web browser:

**URL:** `http://localhost:8080`

### Cleanup

To stop and remove the running container:

```
docker stop container-name
docker rm container-name
```