# **Deploying a Python App to AWS ECS using GitHub Actions & Terraform**  
 
## **Overview**  

This project automates the deployment of a **Python application** to **AWS Elastic Container Service (ECS)** using **GitHub Actions, Docker, and Terraform**.  

By the end of this guide, you'll have a fully automated **CI/CD pipeline** that:  
- **Builds a Docker image** of the Python app  
- **Pushes the image to AWS Elastic Container Registry (ECR)**  
- **Deploys the containerized app to ECS (Fargate)**  
- **Uses Terraform to provision and manage AWS infrastructure**  

---

## **Project Goals**  

- **Develop a Python-based web application**
- **Containerize the app using Docker and push it to AWS ECR**
- **Deploy the app to AWS ECS using Terraform**
- **Automate testing, building, and deployment using GitHub Actions**  
