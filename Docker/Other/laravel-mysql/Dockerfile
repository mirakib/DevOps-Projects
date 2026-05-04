FROM php:8.4-cli-alpine AS builder

WORKDIR /app

RUN apk add --no-cache \
        curl \
        zip \
        unzip \
        git \
        libpng-dev \
        oniguruma-dev \
        libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring xml

COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer

COPY composer.json .

RUN composer install --no-dev --no-scripts --optimize-autoloader --no-interaction

COPY . .

RUN mkdir -p bootstrap/cache storage/logs storage/framework/cache storage/framework/sessions storage/framework/views \
    && chmod -R 775 bootstrap/cache storage \
    && composer dump-autoload --optimize

FROM php:8.4-cli-alpine AS production

WORKDIR /app

RUN apk add --no-cache libpng-dev oniguruma-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring xml

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app /app

RUN mkdir -p storage/logs storage/framework/cache storage/framework/sessions storage/framework/views bootstrap/cache \
    && chown -R appuser:appgroup /app \
    && chmod +x /app/entrypoint.sh

USER appuser

EXPOSE 8000

ENTRYPOINT ["./entrypoint.sh"]