from flask import Flask
import os

app = Flask(__name__)

@app.route('/')
def hello():
    # Retrieve an environment variable for a dynamic message
    name = os.environ.get('GREETING_NAME', 'World')
    return f"Hello, {name}! This app is running inside a Docker container."

if __name__ == '__main__':
    # Flask listens on all public IPs (0.0.0.0) and a standard port (e.g., 5000)
    app.run(host='0.0.0.0', port=5000)