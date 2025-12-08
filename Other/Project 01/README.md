# Building a Complete DevOps Monitoring Ecosystem

## Introduction

In this project, we implemented a comprehensive monitoring solution using Prometheus and various exporters to ensure the reliability and performance of a web application hosted on AWS EC2 instances. This setup includes Node Exporter for hardware and OS metrics, Blackbox Exporter for probing endpoints, and Alertmanager for handling alerts. Gmail integration was also configured to receive notifications for critical alerts.

## Project Components

1. **EC2 Instances:**
  - `Instance 1`: Hosts the web application, Node Exporter, and Nginx.
  - `Instance 2`: Hosts Prometheus, Blackbox Exporter, and Alertmanager.
2. **PPrometheus**: Centralized monitoring tool for collecting and
querying metrics.
3. **Node Exporter**: Collects hardware and OS-level metrics from the
web server.
4. **Blackbox Exporter**: Probes endpoints to monitor uptime and
response time.
5. **Alertmanager**: Manages alerts sent by Prometheus based on
defined rules.
6. **Gmail Integration**: Sends email notifications for critical alerts