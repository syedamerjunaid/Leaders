# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory inside the container
WORKDIR /app

# Copy the entire project to the container
COPY . .

# Install dependencies
RUN pip install --no-cache-dir fastapi uvicorn psycopg2-binary

# Expose the application port
EXPOSE 5001

# Start the FastAPI application
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "5007"]
  