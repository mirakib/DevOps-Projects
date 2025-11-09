<img src="https://skillicons.dev/icons?i=django,react,nginx,python" />

# DRNP Stack CRUD Application
**DRNP or Django, React, Nginx, Python stack.**

For this application, React serves as the frontend, or client-side framework, handling the user interface and getting and setting data via requests to the Django backend, which is an API built using the Django REST framework (DRF). This application will allow users to create tasks and mark them as complete or incomplete.

## Features
- Create, read and delete tasks
- Mark tasks as complete or incomplete
- Dockerized for easy deployment
- Nginx as a reverse proxy for serving the application
- Vite for fast frontend development
- NPM for package management
- Python for backend development
- Django REST framework for building the API

## Prerequisites
- Docker and Docker Compose installed on your machine
- Basic knowledge of Django, React, and Docker
- Node.js and NPM installed (for frontend development)
- Python installed (for backend development)
- Familiarity with RESTful APIs

## Project Structure

```
.
├── backend
│   ├── backend
│   │   ├── asgi.py
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── db.sqlite3
│   ├── Dockerfile
│   ├── manage.py
│   ├── requirements.txt
│   └── todo
│       ├── admin.py
│       ├── apps.py
│       ├── __init__.py
│       ├── migrations
│       ├── models.py
│       ├── serializers.py
│       ├── tests.py
│       └── views.py
├── compose.yml
├── frontend
│   ├── build
│   │   ├── asset-manifest.json
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   ├── robots.txt
│   │   └── static
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src
│       ├── App.css
│       ├── App.js
│       ├── App.test.js
│       ├── index.css
│       ├── index.js
│       ├── logo.svg
│       ├── reportWebVitals.js
│       └── setupTests.js
├── nginx
│   └── nginx.conf
├── Pipfile
├── Pipfile.lock
└── README.md
```

## Getting Started

**Note: Change IP address in `frontend/src/App.js` and `backend/backend/settings.py` if necessary to point to your backend server.**

1. Clone the repository:
   ```bash
   git clone https://github.com/mirakib/django-react-to-do.git
   ```
2. Navigate to the project directory:
   ```bash
   cd django-react-to-do
   ```
3. Build and run the Docker containers:
   ```bash
    docker compose up -d --build
    ```
    
4. Access the application:
    - Frontend: `http://localhost:3000`
    - Backend API: `http://localhost:8000/api/tasks/`
  
5. To stop the application, run:
   ```bash
   docker compose down
   ```

## Output Screenshot

![alt text](image.png)
