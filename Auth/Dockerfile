# Use a lightweight Debian-based Python image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies required for psycopg2-binary
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    python3-dev \
    libpq-dev \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements.txt first (for caching)
COPY requirements.txt .

# Set pip timeout, install wheel, and use an alternative PyPI mirror
RUN pip install --upgrade pip setuptools wheel && \
    pip install --timeout=120 --no-cache-dir -r requirements.txt --index-url https://pypi.org/simple

# Copy the rest of the app
COPY . .

# Expose the application port
EXPOSE 5001

# Run the FastAPI application
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "5001"]
