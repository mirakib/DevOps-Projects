#!/bin/sh

set -e

echo "──────────────────────────────────────────"
echo " Running database migrations..."
echo "──────────────────────────────────────────"
python manage.py migrate --noinput

echo "──────────────────────────────────────────"
echo " Starting Gunicorn server on port 8000..."
echo "──────────────────────────────────────────"


exec gunicorn core.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3 \
    --timeout 120 \
    --access-logfile - \
    --error-logfile -
