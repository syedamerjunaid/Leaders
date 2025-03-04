# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory inside the container
WORKDIR /app

# Copy requirements.txt first (for better caching)
COPY requirements.txt .

# Install dependencies inside a virtual environment
RUN python -m venv venv && \
    ./venv/bin/pip install --upgrade pip && \
    ./venv/bin/pip install --no-cache-dir -r requirements.txt

# Copy the rest of the app
COPY . .

# Expose the FastAPI application port
EXPOSE 5001

# Start the FastAPI app using the virtual environment
CMD ["./venv/bin/uvicorn", "server:app", "--host", "0.0.0.0", "--port", "5001"]
