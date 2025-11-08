<img src="https://skillicons.dev/icons?i=mongo,express,react,nodejs" />

# MERN Stack CRUD Application

This project is a simple CRUD application built using the MERN stack (MongoDB, Express, React, Node.js) and containerized with Docker. It demonstrates how to set up a full-stack application with a backend API and a frontend interface.

## Prerequisites

- Docker and Docker Compose installed on your machine.
- Node.js and npm installed for local development (optional).
- MongoDB instance (can be run in a Docker container).
- Basic knowledge of Docker, Node.js, and React.
- Familiarity with Vite for frontend development.
- Basic understanding of React.js framework.
- Basic understanding of Express.js framework.
- Basic understanding of MongoDB database.

## Project Structure

```
.
├── backend
│   ├── Dockerfile
│   ├── package.json
│   └── src
│       └── app.js
├── docker-compose.yml
├── frontend
│   ├── Dockerfile
│   ├── index.html
│   ├── nginx
│   │   └── default.conf
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── assets
│   │   ├── index.css
│   │   └── main.jsx
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── package-lock.json
└── README.md
```
## Technologies Used
<img src="https://skillicons.dev/icons?i=mongo,express,react,nodejs,vite,npm,nginx,docker" />


- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React.js, Vite, Axios
- **Reverse Proxy**: Nginx
- **Containerization**: Docker, Docker Compose
- **Others**: npm for package management
  
## Output Screenshots

![alt text](image.png)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/mirakib/DevOps-Projects 
cd Docker/CRUD/MERN
```
2. Build and run the application using Docker Compose:
```bash
docker compose up --build -d
```
4. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000/api/items`

5. Stop the application:

```bash
docker compose down
```
