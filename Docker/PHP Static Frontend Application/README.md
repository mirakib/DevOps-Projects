# Project: Optimized PHP Static Site Containerization 🐘

This project focuses on containerizing a minimal PHP web application using a multi-stage Docker build. The primary objective is to demonstrate how to deploy PHP applications with the smallest possible container image by discarding unnecessary build tools, achieving high efficiency and security.

## 🎯 Goal
1. Understand and implement a multi-stage Docker build pattern for PHP applications.
2. Differentiate between the build stage (with development tools) and the final runtime stage (minimal image).
3. Build a final container image that is significantly smaller than a single-stage build.
4. Learn best practices for containerizing PHP applications.
5. Understand the use of PHP-FPM in a containerized environment.
6. Explore the use of Alpine Linux for minimal base images.


## 🛠️ Tech Stack
- **Application**: Simple PHP Static Web Page
- **Language**: PHP (version 8.3)
- **Runtime**: PHP-FPM (FastCGI Process Manager)
- **Containerization**: Docker (Multi-Stage Build)
- **Base Image**: php:8.3-fpm-alpine (Minimal production base)


## 📝 Implementation Steps

The process involves creating the application files and then building the optimized image.

### Set Up Your Files

Create a project directory (e.g., php-web-app/) containing two files:

    index.php: Contains the PHP code and HTML structure.

    Dockerfile: Defines the multi-stage build process.

### Define the Multi-Stage Build

The Dockerfile is split into two stages:

    Stage 1 (build): Used to compile or install any necessary dependencies (though minimal for this static example).

    Stage 2 (Final): Starts from the tiny php:8.3-fpm-alpine base and copies only the index.php file, resulting in a significantly smaller final image.

### Build the Docker Image

Execute the build command from your project directory:
Bash

```docker build -t php-fpm-alpine:v1 .```

### Run the Container

Launch the container, mapping a host port (e.g., 8080) to the PHP-FPM internal port (9000):
Bash

```docker run -d -p 8080:9000 --name php-app-live php-fpm-alpine:v1```

📈 Verification

The container will run the PHP-FPM process internally. To verify success:

    Check Status: Run docker ps and confirm the php-app-live container is running (Up).

    Check Logs: Run docker logs php-app-live to ensure the FPM server started without errors. (Note: To view the website in your browser, this container requires a web server like Nginx or Apache acting as a reverse proxy, which is a setup typically handled by Docker Compose.)

🧹 Cleanup

Stop and remove the container when you are finished testing:
```Bash
docker stop php-app-live
docker rm php-app-live
```