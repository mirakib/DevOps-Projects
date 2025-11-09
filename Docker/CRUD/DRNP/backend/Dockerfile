# STAGE 1: Build Backend

FROM python:3.10-alpine AS builder

# Set working directory
WORKDIR /app

# Install system deps
RUN apk add --no-cache build-base libffi-dev

# Install Python deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# STAGE 2: Runtime

FROM python:3.10-alpine

# Create app directory
WORKDIR /app

# Copy installed packages
COPY --from=builder /usr/local /usr/local

# Copy Django project
COPY . .

# Set environment vars
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Expose port
EXPOSE 8000

# Run Gunicorn server
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]

