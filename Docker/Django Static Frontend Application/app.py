import os
import sys
from django.conf import settings
from django.urls import path
from django.http import HttpResponse
from django.core.management import execute_from_command_line

# 1. Django Configuration

# Set DEBUG explicitly to True for development mode inside the container.
# If DEBUG is False, Django requires ALLOWED_HOSTS to be set.
DEBUG = True

settings.configure(
    # Secret Key is required for security
    SECRET_KEY='django-insecure-secret-key-for-docker-app', 
    
    # Explicitly set DEBUG based on the variable above
    DEBUG=DEBUG,
    
    # REQUIRED FIX: If DEBUG is False (or implicitly becomes False), 
    # ALLOWED_HOSTS must be defined. We set it to accept all hosts ('*').
    ALLOWED_HOSTS=['*'],
    
    # Define a minimal set of installed apps
    INSTALLED_APPS=[
        'django.contrib.staticfiles',
    ],
    
    # Define the URL structure
    ROOT_URLCONF=__name__,
    
    # Define template settings (although we render raw HTML here)
    TEMPLATES=[{
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
    }],
    
    # Configure static files (required by installed apps)
    STATIC_URL='/static/',
)


HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Docker & Flask Dashboard</title>
    <!-- Google Font: Poppins -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap" rel="stylesheet">
    <!-- Font Awesome for Icons (using a common CDN) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        @keyframes glow {
            0%, 100% { box-shadow: 0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.2); }
            50% { box-shadow: 0 0 15px rgba(0, 255, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.4); }
        }
        body {
            font-family: 'Poppins', sans-serif;
            background: #121212; /* Deep Black background */
            color: #e0e0e0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }
        .dashboard {
            background-color: #1e1e1e;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7);
            max-width: 900px;
            width: 90%;
            border: 1px solid #333;
            animation: glow 4s infinite alternate; /* Subtle glow effect */
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        h1 {
            color: #00ffff; /* Cyber Blue title */
            font-weight: 800;
            font-size: clamp(1.5em, 5vw, 2.5em); /* Responsive sizing */
            margin: 0;
            letter-spacing: 1px;
        }
        .status-badge {
            display: inline-block;
            background-color: #047857; /* Emerald Green for success */
            color: #fff;
            padding: 6px 15px;
            border-radius: 20px;
            font-weight: 600;
            margin-top: 10px;
            box-shadow: 0 0 5px #047857;
        }
        .content-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        .card {
            background-color: #2a2a2a;
            padding: 25px;
            border-radius: 8px;
            border-left: 5px solid #00ffff;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        }
        .card h2 {
            color: #00ffff;
            margin-top: 0;
            font-size: 1.4em;
        }
        .card p {
            color: #cccccc;
            font-size: 0.9em;
        }
        .tech-icon i {
            font-size: 3em;
            color: #f1e05a; /* Python Yellow */
            margin-bottom: 10px;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #333;
            color: #a0a0a0;
            font-size: 0.85em;
        }
        .author-name {
            color: #ffcc00; /* Gold */
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="dashboard">
        
        <div class="header">
            <h1><i class="fas fa-ship"></i> Containerization Dashboard</h1>
            <div class="status-badge">STATUS: Deployed Successfully</div>
        </div>

        <div class="content-grid">
            
            <!-- Component 1: Technology Card -->
            <div class="card">
                <h2><i class="fab fa-python"></i> Technology Stack</h2>
                <p>
                    <strong>Language:</strong> Python 3.11+<br>
                    <strong>Framework:</strong> Django (Micro-Framework)<br>
                    <strong>Container Runtime:</strong> Docker (Alpine Multi-Stage Build)
                </p>
            </div>
            
            <!-- Component 2: Environment Card -->
            <div class="card">
                <h2><i class="fas fa-server"></i> Environment Details</h2>
                <p>
                    <strong>Internal Port:</strong> 8000<br>
                    <strong>External Port:</strong> 8000 (Mapped)<br>
                    <strong>Running OS:</strong> Alpine Linux (Optimized)
                </p>
            </div>
            
            <!-- Component 3: Build & Author Info -->
            <div class="card">
                <h2><i class="fas fa-code-branch"></i> Project Origin</h2>
                <p>
                    This is a basic, multi-stage Docker build to achieve a minimal image size. The goal is portability.
                </p>
                <p style="margin-top: 15px;">
                    **Created By:** <span class="author-name">Moshrekul Islam</span>
                </p>
            </div>
        </div>

        <div class="footer">
            Source: github/mirakib/Django Static Frontend Application
        </div>
    </div>
</body>
</html>

"""

def home(request):
    """Simple view to return the hardcoded HTML response."""
    return HttpResponse(HTML_TEMPLATE)

urlpatterns = [
    path('', home),
]

if __name__ == '__main__':
    
    # Set default environment variable for the port if not specified
    if not os.environ.get('PORT'):
        os.environ['PORT'] = '8000'

    # Run the Django development server
    execute_from_command_line([
        sys.argv[0], 
        'runserver', 
        '0.0.0.0:' + os.environ['PORT']
    ])
