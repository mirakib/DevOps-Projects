#STAGE 1: builder 
FROM php:8.4-cli-alpine AS builder

# install curl (for composer installer) and git if needed (build-time only)
RUN apk add --no-cache curl git

WORKDIR /app

# copy composer manifest (empty or with deps) - keeps pattern complete
COPY src/composer.json /app/composer.json

# install composer (local) and run composer install (no dev)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
 && composer install --no-dev --no-interaction --optimize-autoloader || true

# copy app code (so we can copy built vendor if present)
COPY src/ /app

### STAGE 2: php-fpm final
FROM php:8.4-fpm-alpine AS php-fpm

# set working dir
WORKDIR /var/www/html

# install runtime packages and php extensions (pdo_mysql)
# Install build deps, compile extensions, then remove build deps to keep size small
RUN apk add --no-cache --virtual .build-deps $PHPIZE_DEPS mariadb-dev \
    && docker-php-ext-install pdo pdo_mysql \
    && apk del .build-deps \
    && rm -rf /var/cache/apk/*

# copy source from builder (read-only mount in compose but image will have files)
COPY --from=builder /app /var/www/html

# Ensure www-data owns files
RUN chown -R www-data:www-data /var/www/html \
 && find /var/www/html -type d -exec chmod 755 {} \; \
 && find /var/www/html -type f -exec chmod 644 {} \;

EXPOSE 9000
