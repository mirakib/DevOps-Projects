# Project: Containerizing a Simple Django "Hello World" App 

[![Tech Stack](https://skillicons.dev/icons?i=django,html,css,python,docker)](https://skillicons.dev)

This project is a hands-on introduction to Docker with Django. You'll take a basic web application built with the Python Django framework and package it into a self-contained, portable unit called a Docker container. This demonstrates the core concept of Docker: making applications run consistently across any environment.

## 🎯 Goal

Learn the basic workflow of Docker with Django:

1. Create a simple Django web application.
2. Define the application's environment using a Dockerfile.
3. Build a Docker image from the Dockerfile.
4. Run the image as a container.

## 🛠️ Tech Stack

- **Python**: The core language for the application.
- **Django**: A high-level Python web framework that encourages rapid development.
- **Docker**: The containerization platform.

## 📝 Implementation Steps

### 1. Set Up Your Django Web Application

Create a project directory, and within it, create the necessary Django files.


#### `requirements.txt` (Application Dependencies)

This file lists the Python packages your app needs to run.

```
Django==4.2.7
```

> **Note:** Using a specific version is good practice for reproducibility.


### 2. Define the Docker Environment

Create a file named `Dockerfile` (with no file extension) in the same directory. This file contains instructions for Docker on how to build the image.

#### `Dockerfile` (Instructions for Docker)

```dockerfile
# Stage 1: The Builder Stage

FROM python:3.11-slim AS builder

WORKDIR /install

COPY requirements.txt .

RUN pip install --no-cache-dir --user -r requirements.txt

# Stage 2: The Final / Runtime Stage

FROM python:3.11-alpine

WORKDIR /app

COPY --from=builder /root/.local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages

COPY app.py .

ENV PORT=8000

EXPOSE 8000

CMD ["python", "app.py"]
```

---

### 3. Build the Docker Image

Use the Docker CLI (Command Line Interface) to build the image from the Dockerfile:

```bash
docker build -t django-app-image:v1 .
```


### 4. Run the Container

Once the image is built, run it as a container:

```bash
docker run -d -p 8080:8000 --name django-app django-app-image:v1
```


## 📈 Verification

Open your web browser and navigate to [http://localhost:8000](http://localhost:8000) (or the port you chose) to see the "Hello, DockerUser!" message served by the Django app running inside the Docker container.

---

## 🧹 Cleanup

Stop and remove the container when you are done:

```bash
docker stop my-django-app
docker rm my-django-app
```

---
