# Use a lightweight Python image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies (for psycopg2-binary)
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements.txt first (for caching)
COPY requirements.txt .

# Set pip timeout and use an alternative pip mirror
RUN pip install --upgrade pip && \
    pip install --timeout=120 --no-cache-dir -r requirements.txt --index-url https://pypi.python.org/simple

# Copy the rest of the app
COPY . .

# Expose the application port
EXPOSE 5001

# Run the FastAPI application
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "5001"]
