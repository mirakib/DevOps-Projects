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