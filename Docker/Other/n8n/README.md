This project provides a beginner-friendly walkthrough for installing and configuring n8n on a self-hosted Ubuntu server using Docker Compose. You’ll also learn how to resolve common setup errors, secure your instance with HTTPS, and avoid pitfalls during production deployment.


# Key Features:

- **Self-hosting n8n** provides full control, data privacy, and freedom from vendor lock-in.  
- **Docker Compose on Ubuntu** enables a stable, production-ready deployment with simplified service management.  
- **PostgreSQL database** ensures persistent storage for workflows and credentials.  
- **Nginx with Let’s Encrypt** secures access using HTTPS and acts as a reverse proxy.  
- **Initial configuration** includes database setup, container deployment, HTTPS enablement, and owner account creation.  
- **Security hardening** requires HTTPS, strong credentials, restricted access, firewalls, and regular updates.  
- **Free license activation** unlocks advanced features and integrations at no additional cost.  
- **Visual workflow editor** allows building automation with drag-and-drop nodes and minimal coding.  
- **Automated incident response** can detect outages, attempt recovery, and send real-time notifications.  
- **Extensible architecture** supports cloud platforms, ticketing systems, custom APIs, and AI-driven autom

### Choosing the Right Deployment: Cloud vs. Self-Hosted

| Option                    | Pros                                   | Cons                                | Recommended For                              |
|---------------------------|----------------------------------------|-------------------------------------|----------------------------------------------|
| **n8n Cloud**             | No setup, managed infrastructure, auto-scaling | Paid, limited backend control       | Non-technical users, quick start              |
| **Self-hosted (Docker)**  | Full control, cost-effective, secure   | Requires setup and server maintenance | Developers, teams with infrastructure         |
| **Bare-metal (Node.js)**  | Maximum flexibility                    | Manual configuration and updates    | Advanced users, edge or custom use cases      |



## Prerequisites

Before starting, ensure you have:

- An Ubuntu 22.04 server (or newer)
- A registered domain name pointed to your server
- Root access or sudo privileges
- Docker and Docker Compose installed
- Optional: An email account for Let’s Encrypt SSL

## Start n8n and Verify Installation

```sh
docker compose up -d
```

## Accessing n8n

```
http://your_server_ip:5678
```

## Secure n8n with HTTPS

We’ll use Nginx and Let’s Encrypt to serve n8n over HTTPS.

```sh
sudo apt install nginx certbot python3-certbot-nginx -y
```

### Option 1: HTTP-Only Proxy (for local or insecure setup)

```nginx
server {
  listen 80;
  server_name n8n.yourdomain.com;

  location / {
    proxy_pass http://localhost:5678;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

### Option 2: HTTPS with Let’s Encrypt (recommended for production)

```nginx
server {
  listen 443 ssl;
  server_name n8n.yourdomain.com;

  ssl_certificate /etc/letsencrypt/live/n8n.yourdomain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/n8n.yourdomain.com/privkey.pem;

  location / {
    proxy_pass http://localhost:5678;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Save it as `/etc/nginx/sites-available/n8n` and enable it:

```sh
sudo ln -s /etc/nginx/sites-available/n8n /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### Issue SSL Certificate

```sh
sudo certbot --nginx -d n8n.yourdomain.com
```

## Initial n8n Web Interface Setup

1. Set Up Owner Account
2. Customize Your Instance
3. Free Features Registration
4. License Key Activation
