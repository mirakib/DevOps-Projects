# Install WordPress With Docker Compose

Running WordPress typically involves installing a LAMP (Linux, Apache, MySQL, and PHP) or LEMP (Linux, Nginx, MySQL, and PHP) stack, which can be time-consuming. However, by using tools like Docker and Docker Compose, you can streamline the process of setting up your preferred stack and installing WordPress. Instead of installing individual components by hand, you can use images, which standardize things like libraries, configuration files, and environment variables.

In this project, you will build a multi-container WordPress installation. Your containers will include a MySQL database, an Nginx web server, and WordPress itself. You will also secure your installation by obtaining TLS/SSL certificates with Let’s Encrypt for the domain you want associated with your site. Finally, you will set up a cron job to renew your certificates so that your domain remains secure.

## Key Features:

 - Docker Compose streamlines WordPress deployment by eliminating the need to manually install LAMP/LEMP stack components. Instead, you can use standardized images that bundle libraries, configurations, and environment variables into isolated containers.
   
- The setup requires four distinct services working together: a MySQL database container, a WordPress application container (with PHP-FPM), an `Nginx` web server container, and a `Certbot` container for SSL certificate management.
- Sensitive credentials (MySQL root password, database username/password) are stored in a .env file that’s excluded from version control and Docker images via `.gitignore` and `.dockerignore` files, preventing accidental exposure.
- The tutorial implements free TLS/SSL certificates through Let’s Encrypt’s Certbot, using the webroot plugin for domain validation. The process includes testing with staging certificates before obtaining production certificates.
- Docker named volumes (dbdata, wordpress, certbot-etc) store application data, database files, and SSL certificates on the host filesystem, ensuring data persists even when containers are recreated.
- The web server requires specific configuration for WordPress, including PHP processing via `FastCGI`, static asset caching, security headers (X-Frame-Options, Content-Security-Policy), and HTTP-to-HTTPS redirection.
- All containers connect through a user-defined bridge network (app-network), enabling inter-container communication while only exposing ports 80 and 443 to the outside world for security.
- A cron job runs a renewal script that uses certbot renew to automatically refresh certificates before they expire (every 90 days), then reloads the Nginx configuration to apply the updated certificates without downtime.



