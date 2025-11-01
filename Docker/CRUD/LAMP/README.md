## Dockerized LAMP Stack with Prometheus & Grafana Monitoring

A containerized LAMP (Linux, Apache, MySQL, PHP) application deployed using Docker Compose, integrated with Prometheus and Grafana for real-time performance monitoring and metrics visualization.

![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=mirakib&repo=dockerize-lamp-monitoring-stack)

## Features

- **LAMP Stack** (Apache, MySQL, PHP) for a CRUD web app  
- **Prometheus** for collecting metrics  
- **Grafana** for visualization dashboards  
- **Exporters** for Apache, MySQL, and Node metrics  
- Fully containerized and network-isolated  
- Easy to extend or deploy on any Docker host  

---

## Architecture

[ Apache (PHP App) ] → [ Apache Exporter ] ┐

[ MySQL Database ] → [ MySQL Exporter ] ├──> [ Prometheus ] → [ Grafana ]

[ Host System ] → [ Node Exporter ] ┘

## Project Structure

project/

├── apache/

│ ├── Dockerfile 

│ ├── 000-default.conf 

│ └── index.php 

│

├── prometheus/

│ └── prometheus.yml 

│

└── compose.yml 



