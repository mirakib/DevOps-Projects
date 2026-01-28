# Containerized web application using Amazon ECS and AWS Fargate

In this project, we will build and deploy a containerized/auto-scaling web application that will randomly display a cat picture, or dog picture (depending on what the user selects). We will also implement container observability tools, perform load testing on the web application, and monitor the outcome. The Cats and Dogs application consists of three services: **Web (landing page)**, **Cats (cats page)** and **Dogs (dogs page)**. In this lab, Web and Cats use the Amazon EC2 launch type and Dogs uses the AWS Fargate launch type on a single cluster

## Architecture Diagram

<img width="2414" height="1125" alt="image" src="https://github.com/user-attachments/assets/4232f155-e0e1-43d8-9b2d-a83c9f9a783d" />

