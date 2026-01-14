# NGINX Reverse Proxy for Multiple Domains

This project implements a lightweight, cost-effective AWS architecture where a single NGINX reverse proxy routes incoming traffic to multiple backend web servers based on subdomain requests. The reverse proxy acts as the public entry point, while backend servers remain private and secure inside the VPC. The entire infrastructure is provisioned using Terraform in a single file for simplicity and reproducibility.

---

## Features
- Subdomain-based traffic routing using NGINX
- Secure architecture with private backend servers
- Single public entry point
- Automated provisioning with Terraform
- Automatic NGINX installation and startup via user data
- Clean separation of routing and application responsibilities
- Easily extensible for more web services

---

<img width="4116" height="2946" alt="Untitled Diagram drawio" src="https://github.com/user-attachments/assets/9255b8e5-ddbe-4059-b564-7c5b66cbba1d" />

## Architecture Overview
- Provisioned three EC2 instances:
  - One NGINX router
  - Two backend web servers
- Created security groups with least-privilege access
- Installed and enabled NGINX automatically on all instances
- Configured NGINX on the router to forward traffic based on subdomains
- Exposed only the router to the public internet
- Output public and private IPs for easy integration
- Prepared the setup for HTTPS termination at the router level


## Setup Steps

### 1. Infrastructure Provisioning
- Configure AWS credentials locally
- Initialize and apply the Terraform configuration:

  ```bash
  terraform init
  terraform apply
  ```

**Save the outputs:**
- Router **public IP**
- Web1 **private IP**
- Web2 **private IP**

### 2. Configure DNS (A Records)

**Create two A records, both pointing to the router public IP:**

| Subdomain | Type | Value |
|-----------|------|-------|
| web1.example.com | A | ROUTER_PUBLIC_IP |
| web2.example.com | A | ROUTER_PUBLIC_IP |


### 3. Configure NGINX on the Router

**SSH into the router instance:**

```sh
ssh -i path/to/your-key.pem ec2-user@ROUTER_PUBLIC_IP
``` 

**Create or update config files:**

```sh
sudo nano /etc/nginx/conf.d/web1.conf
```
```sh
sudo nano /etc/nginx/conf.d/web2.conf
```


**Test and reload:**

```sh
sudo nginx -t
sudo systemctl reload nginx
```

### 4. Place Index Files on Web Servers

**SSH into each web server (via private IP or bastion):**

```sh
ssh -i ultimate-key.pem ubuntu@WEB1_PRIVATE_IP
echo "WEB 1 OK" | sudo tee /var/www/html/index.html
```

```sh
ssh -i ultimate-key.pem ubuntu@WEB2_PRIVATE_IP
echo "WEB 2 OK" | sudo tee /var/www/html/index.html
```

### 5. Enable SSL with Certbot on Router

**Add script permission:**

```sh
sudo chmod +x ssl_nginx.sh
```

**Install and issue certificates:**

```sh
sudo ./ssl_nginx.sh web1.example.com youremail@example.com
```

```sh
sudo ./ssl_nginx.sh web2.example.com youremail@example.com
```

### 6. Verify Setup

- Access `https://web1.example.com` and `https://web2.example.com` to see respective messages.

### 7. Cleanup

To destroy the infrastructure, run:

```bash
terraform destroy
```
