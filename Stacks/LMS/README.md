<h1 align="center">🎓 LMS - Learning Management System</h1>

A full-featured Learning Management System (LMS) web application built with the **MERN stack** (MongoDB, Express, React, Node.js). Users can browse, enroll in courses, track their progress, and make payments. Admins can manage courses, users, and track enrollments.

### Preview

Here are some screenshots of the Learning Management System:

![Image](https://github.com/user-attachments/assets/5c482ee5-c8be-4796-83f0-e72d8235942f)

![Image](https://github.com/user-attachments/assets/ea83184c-e190-451a-9c06-69a0ae1c2dfd)

![Image](https://github.com/user-attachments/assets/76c764cb-f8f0-457b-a355-0e1de9d86a9a)

![Image](https://github.com/user-attachments/assets/66876e27-6155-4458-8cf9-d1e905983aca)

## Features

- User Authentication (Register/Login)
- Browse and Enroll in Courses
- Course Progress Tracking
- Admin Dashboard for Managing Courses & Users
- Upload Videos, Course Content
- Role-based Access Control

## 🛠️ Tech Stack

### Frontend
- React.js
- Redux Toolkit
- React Router
- Tailwind CSS or Bootstrap

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for Auth

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Divyanshi2408/Learning-Management-System.git
cd lms-project
```
### 2. Install Server Dependencies
```
cd server
npm install
npm run dev
```

### 3. Install Client Dependencies
```
cd ../client
npm install
npm start
```

## 💬 Contact
📧 [divyanshipal2808@gmail.com]

## Run with Docker Compose

The Compose deployment runs MongoDB, the Express API, and the Vite production build behind rootless Nginx.

1. Install Docker Desktop and start it.
2. From this directory, create the local environment file:

```powershell
Copy-Item .env.example .env
```

3. Set a local `MONGO_ROOT_PASSWORD` and a long random `JWT_SECRET` in `.env`. Add Cloudinary and SMTP values only when those features are needed.
4. Build and start the stack:

```powershell
docker compose up --build -d
```

5. Open `http://localhost:8080`. Check service status and logs with:

```powershell
docker compose ps
docker compose logs -f backend
```

6. Stop the services with:

```powershell
docker compose down
```

To remove the local MongoDB data volume as well, use `docker compose down -v`.

The frontend image is built in a separate Node stage and served by an unprivileged Nginx image. The backend also runs as a non-root UID. Secrets are supplied through `.env` and are excluded from the build context.

