FROM php:8.3-cli-alpine
WORKDIR /var/www/html
COPY index.php .

# Expose any port you want
EXPOSE 8080

# Use PHP's built-in web server
CMD ["php", "-S", "0.0.0.0:8080", "-t", "/var/www/html"]