# Stage 1:
FROM php:8.3 AS build

# Stage 2:
FROM php:8.3-apache 

WORKDIR /var/www/html

COPY index.php .

# Apache listens on port 80 by default
EXPOSE 80 

CMD ["apache2-foreground"]