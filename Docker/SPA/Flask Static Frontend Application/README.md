
# Project: Containerizing a Simple Flask "Hello World" App 🐳

This project is a hands-on introduction to Docker. You'll take a basic web application built with the Python Flask framework and package it into a self-contained, portable unit called a Docker container. This demonstrates the core concept of Docker: making applications run consistently across any environment.

[![Tech Stack](https://skillicons.dev/icons?i=flask,python,docker)](https://skillicons.dev)

## 🎯 Goal

Learn the basic workflow of Docker:

1. Create a simple web application.
2. Define the application's environment using a Dockerfile.
3. Build a Docker image from the Dockerfile.
4. Run the image as a container.


## 🛠️ Tech Stack

- **Python**: The core language for the application.
- **Flask**: A lightweight micro-framework for building the web app.
- **Docker**: The containerization platform.



## 📝 Implementation Steps

### 1. Set Up Your Web Application

Create a project directory, and within it, two files: `app.py` and `requirements.txt`.

#### `app.py` (The Flask Application)

This file will contain the minimal code for a web server that responds with a simple message.

```python
from flask import Flask
import os

app = Flask(__name__)

@app.route('/')
def hello():
    # Retrieve an environment variable for a dynamic message
    name = os.environ.get('GREETING_NAME', 'World')
    return f"Hello, {name}! This app is running inside a Docker container."

if __name__ == '__main__':
    # Flask listens on all public IPs (0.0.0.0) and a standard port (e.g., 5000)
    app.run(host='0.0.0.0', port=5000)
```

#### `requirements.txt` (Application Dependencies)

This file lists the Python packages your app needs to run.

```
Flask==2.3.3
```

> **Note:** Using a specific version is good practice for reproducibility.

---

### 2. Define the Docker Environment

Create a file named `Dockerfile` (with no file extension) in the same directory. This file contains instructions for Docker on how to build the image.

#### `Dockerfile` (Instructions for Docker)

```dockerfile
# 1. Start from a lightweight Python base image (a pre-built operating system + Python)
FROM python:3.10-slim

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy the dependencies file into the container
COPY requirements.txt .

# 4. Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of the application code into the container
COPY . .

# 6. Tell Docker which port the container will listen on
EXPOSE 5000

# 7. Define the command to run the application when the container starts
CMD ["python", "app.py"]
```

---

### 3. Build the Docker Image

Use the Docker CLI (Command Line Interface) to build the image from the Dockerfile:

```bash
docker build -t flask-hello-world:latest .
```

Where:

- `docker build`: The command to build an image.
- `-t`: Tags the image with a name and optional version.
- `flask-hello-world`: The name you assign to the image.
- `:latest`: The tag (version).
- `.`: The build context (the current directory, where the Dockerfile is).

---

### 4. Run the Container

Once the image is built, run it as a container:

```bash
docker run -d -p 8080:5000 --name my-flask-app -e GREETING_NAME=DockerUser flask-hello-world:latest
```

Where:

- `docker run`: The command to start a container.
- `-d`: Runs the container in detached (background) mode.
- `-p 8080:5000`: Port mapping. Maps the container's internal port 5000 to the host machine's port 8080.
- `--name my-flask-app`: Assigns a readable name to the running container.
- `-e GREETING_NAME=DockerUser`: Sets an environment variable inside the container, which is used by the `app.py`.
- `flask-hello-world:latest`: The image to run.

---

## 📈 Verification

Open your web browser and navigate to [http://localhost:8080](http://localhost:8080) (or the port you chose) to see the "Hello, DockerUser!" message served by the Flask app running inside the Docker container.

---

## 🧹 Cleanup

Stop and remove the container when you are done:

```bash
docker stop my-flask-app
docker rm my-flask-app
```