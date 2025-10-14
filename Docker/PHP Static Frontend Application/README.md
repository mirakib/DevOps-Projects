# Project: Lightweight PHP Static Site 🐘

This project packages a minimal PHP static site inside a tiny Alpine-based image that uses PHP's built-in development server. The result is a fast-to-build container ideal for demos or lightweight prototypes.

---

## 🎯 Goal

1. Run a simple PHP page with Docker using the official CLI image.
2. Demonstrate a compact single-stage Dockerfile for PHP applications.
3. Serve content over port 8080 via PHP's built-in web server.
4. Keep the container footprint minimal by relying on Alpine Linux.

---

## 🛠️ Tech Stack

- **Application**: Static PHP page
- **Language**: PHP 8.3
- **Runtime**: PHP built-in server (`php -S`)
- **Base Image**: `php:8.3-cli-alpine`
- **Containerization**: Docker (single-stage build)

---

## 📝 Implementation Steps

### 1. Prepare the project files

- `index.php`: Your PHP entry point.
- `Dockerfile`: Declares the container build.



### 2. Review the Dockerfile

#### Note: Standard Version Using Base Image.
           Setup: Simple production 
           “SAPIs” (Server APIs): Apache
           Image Size: 506MB

```dockerfile
# Stage 1:
FROM php:8.3 AS build

# Stage 2:
FROM php:8.3-apache 

WORKDIR /var/www/html

COPY index.php .

# Apache listens on port 80 by default
EXPOSE 80 

CMD ["apache2-foreground"]
```

#### Note: Optimized Version Using Alpine Image.
           Setup: Dev/Test
           “SAPIs” (Server APIs): CLI (php -S)
           Image Size: 107MB

```dockerfile
FROM php:8.3-cli-alpine
WORKDIR /var/www/html
COPY index.php .

EXPOSE 8080
CMD ["php", "-S", "0.0.0.0:8080", "-t", "/var/www/html"]
```

⚠️ Limitations

1. The PHP built-in web server is:
2. Single-threaded → handles one request at a time
3. Not optimized → no caching, compression, or load balancing
4. For development only, per the official PHP docs

Perfect for:
✅ Quick testing
✅ Local dev containers
✅ CI/CD previews

Not good for:
❌ High traffic production sites
❌ SSL, caching, advanced routing


✅ TL;DR

| Setup                        | What’s Serving Requests      | Suitable For    | Multi-threaded? |
|------------------------------|-----------------------------|-----------------|-----------------|
| php:8.3-cli-alpine + php -S  | PHP’s built-in HTTP server  | Dev / Local     | ❌              |
| php:8.3-apache               | Apache                      | Production      | ✅              |
| php:8.3-fpm + Nginx          | Nginx + FPM                 | Production      | ✅              |


The image copies the application into `/var/www/html`, exposes port 8080, and starts PHP's built-in server to handle requests.

### 3. Build the Docker image

```bash
docker build -t php-lite-static:v1 .
```

### 4. Start the container

Map port 8080 from the container to your host and launch in detached mode:

```bash
docker run -d -p 8080:8080 --name php-lite-app php-lite-static:v1
```

---

## 📈 Verification


1. Open a browser and visit [http://localhost:8080](http://localhost:8080) to confirm the page loads.



## 🔍 Why the Built-in Server?

- Keeps the container image extremely small and quick to build.
- Great for rapid prototyping and educational use cases.
