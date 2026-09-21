FROM php:8.4-cli-alpine

WORKDIR /app

RUN docker-php-ext-install pdo pdo_mysql

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY . .

RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 8080

CMD ["php", "-S", "0.0.0.0:8080", "public/index.php"]
