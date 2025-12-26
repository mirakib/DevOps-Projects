# Building a Complete DevOps Monitoring Ecosystem

## Introduction

In this project, we implemented a comprehensive monitoring solution using Prometheus and various exporters to ensure the reliability and performance of a web application hosted on AWS EC2 instances. This setup includes Node Exporter for hardware and OS metrics, Blackbox Exporter for probing endpoints, and Alertmanager for handling alerts. Gmail integration was also configured to receive notifications for critical alerts.

## Project Components

1. **EC2 Instances:**
  - `Instance 1`: Hosts the web application, Node Exporter, and Nginx.
  - `Instance 2`: Hosts Prometheus, Blackbox Exporter, and Alertmanager.
2. **Prometheus**: Centralized monitoring tool for collecting and
querying metrics.
3. **Node Exporter**: Collects hardware and OS-level metrics from the
web server.
4. **Blackbox Exporter**: Probes endpoints to monitor uptime and
response time.
5. **Alertmanager**: Manages alerts sent by Prometheus based on
defined rules.
6. **Gmail Integration**: Sends email notifications for critical alerts

## Setup Instructions

1. **Launch EC2 Instances**:
  Create two EC2 instances with appropriate security groups allowing necessary ports. Adjust security settings to allow necessary ports:
  - Prometheus: 9090
   - Alert manager: 9093
   - Blackbox Exporter: 9115
   - Node Exporter: 9100
   - Email transmissions: 587
   - Nginx: 80

2. **Install and Configure Node Exporter and Deploy Web application on Instance 1**
   - **Install Node Exporter**

     ```bash
     wget https://github.com/prometheus/node_exporter/releases/download/v1.8.1/node_exporter-1.8.1.linux-amd64.tar.gz
     ```
     ```bash
     tar xvfz node_exporter-1.8.1.linux-amd64.tar.gz 
     ```
     ```bash
     cd node_exporter-1.8.1.linux-amd64
     ```
     ```bash
     ./node_exporter
     ```

   - **Install Nginx**

     ```bash
     sudo apt install nginx
     ```

3. **Install and Configure Prometheus, Blackbox Exporter, and Alertmanager on Instance 2**

     - **Install Prometheus**
       ```bash
       wget https://github.com/prometheus/prometheus/releases/download/v2.52.0/prometheus-2.52.0.linux-amd64.tar.gz
        ```
       ```bash
        tar xvfz prometheus-2.52.0.linux-amd64.tar.gz 
        ```
      
       ```bash
        cd prometheus-2.52.0.linux-amd64
        ```
      
       ```bash
        ./prometheus --config.file=prometheus.yml
        ```


     - **Install Blackbox**
       ```bash
       wget https://github.com/prometheus/blackbox_exporter/releases/download/v0.25.0/blackbox_exporter-0.25.0.linux-amd64.tar.gz
        ```
       ```bash
        tar xvfz blackbox_exporter-0.25.0.linux-amd64.tar.gz 
        ```
      
       ```bash
        cd blackbox_exporter-0.25.0.linux-amd64
        ```
      
       ```bash
        ./blackbox_exporter
        ```
       
     - **Install AlertManager**

       ```bash
       wget https://github.com/prometheus/alertmanager/releases/download/v0.27.0/alertmanager-0.27.0.linux-amd64.tar.gz
        ```
       ```bash
        tar xvfz alertmanager-0.27.0.linux-amd64.tar.gz
        ```
      
       ```bash
        cd alertmanager-0.27.0.linux-amd64
        ```
      
       ```bash
        ./alertmanager --config.file=alertmanager.yml
        ```
 4. **Create Gmail Authentication Password**

    1. Enable Two-Factor Authentication (2FA):
       - Log in to your Google account and navigate to Google Account Security.
       - Under the "Signing in to Google" section, find "2-Step Verification" and click on it.
       - Follow the prompts to set up 2FA. You might need to provide your phone number and verify it via a code sent by SMS.
    2. Generate an App Password:
       - Once 2FA is enabled, go back to the Google Account Security page.
       - Search this on your browser :- https://myaccount.google.com/apppassowords  
       - You might need to sign in again for security reasons.
       - On the "App passwords" page, click on the "Select app" dropdown and choose "Other (Custom name)".
       - Enter a name for the app password, such as "Prometheus Alertmanager", and click "Generate".
       - Google will provide you with a 16-character app password. Make sure to copy this password.
    3. Use the App Password in Your Configuration:
       - Replace <your-app-password> in your alertmanager.yml configuration with the generated app password.
