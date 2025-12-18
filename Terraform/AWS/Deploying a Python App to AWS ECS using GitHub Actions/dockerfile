# Stage 1: The Builder Stage

FROM python:3.11-slim AS builder

WORKDIR /install

COPY requirements.txt .

RUN pip install --no-cache-dir --user -r requirements.txt

# Stage 2: The Final / Runtime Stage

FROM python:3.11-alpine

WORKDIR /app

COPY --from=builder /root/.local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages

COPY app.py .

ENV PORT=8000

EXPOSE 8000

CMD ["python", "app.py"]