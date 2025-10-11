# Stage 1: The Builder Stage
FROM php:8.3-fpm AS build

WORKDIR /app

# Stage 2: The Final / Runtime Stage
FROM php:8.3-fpm-alpine

WORKDIR /var/www/html

COPY index.php .

EXPOSE 9000

CMD ["php-fpm"]