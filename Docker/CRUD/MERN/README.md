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
│   ├── docker-compose.yml
│   ├── package.json
│   ├── server.js
│   └── src
│       ├── config
│       ├── controllers
│       ├── models
│       └── routes
└── frontend
    ├── Dockerfile
    ├── docker-compose.yml
    ├── package.json
    ├── src
    │   ├── App.jsx
    │   ├── components
    │   ├── pages
    │   └── styles
    └── vite.config.ts  
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>       
    cd mern-crud-docker
    ```
2. Build and run the application using Docker Compose:
3.  ```bash
    docker compose up --build -d
    ```
4. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000/api/items`
5. Stop the application:
   ```bash
    docker compose down
    ```
 