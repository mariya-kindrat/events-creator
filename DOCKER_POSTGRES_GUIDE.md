# 🐳 PostgreSQL Docker Hub Deployment Guide

This guide provides step-by-step instructions for creating, customizing, and deploying a PostgreSQL Docker image to Docker Hub for use in your Events API project.

## 📋 Prerequisites

-   Docker Desktop installed and running
-   Docker Hub account created
-   Git installed (optional, for version control)

## 🚀 Step 1: Create Custom PostgreSQL Docker Image

### 1.1 Create Dockerfile for PostgreSQL

Create a new directory for your custom PostgreSQL image:

```bash
# Create directory structure
New-Item -ItemType Directory -Path "docker-postgres" -Force
Set-Location "docker-postgres"
```

Create a `Dockerfile`:

```dockerfile
# Use official PostgreSQL image as base
FROM postgres:16-alpine

# Set environment variables
ENV POSTGRES_DB=event_db
ENV POSTGRES_USER=user
ENV POSTGRES_PASSWORD=password

# Copy initialization scripts
COPY ./init-scripts/ /docker-entrypoint-initdb.d/

# Copy custom configuration
COPY ./postgresql.conf /etc/postgresql/postgresql.conf

# Expose PostgreSQL port
EXPOSE 5432

# Set custom command to use our config
CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]
```

### 1.2 Create Initialization Scripts

Create the init scripts directory and add database setup:

```bash
New-Item -ItemType Directory -Path "init-scripts" -Force
```

Create `init-scripts/01-init-database.sql`:

```sql
-- Create additional databases if needed
CREATE DATABASE event_db_test;
CREATE DATABASE event_db_staging;

-- Create custom user with specific permissions
CREATE USER event_user WITH PASSWORD 'event_password';
GRANT ALL PRIVILEGES ON DATABASE event_db TO event_user;
GRANT ALL PRIVILEGES ON DATABASE event_db_test TO event_user;
GRANT ALL PRIVILEGES ON DATABASE event_db_staging TO event_user;

-- Connect to event_db and set up schema
\c event_db;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Set timezone
SET timezone = 'UTC';
```

Create `init-scripts/02-seed-data.sql` (optional):

```sql
-- Connect to the main database
\c event_db;

-- Insert sample categories (optional - your Prisma migrations will handle this)
-- This is just an example of how you could seed initial data

-- Create a sample admin user (you can customize this)
-- Note: This will be handled by your application, but shown as example
```

### 1.3 Create PostgreSQL Configuration

Create `postgresql.conf`:

```conf
# PostgreSQL configuration for Events API

# Connection settings
listen_addresses = '*'
port = 5432
max_connections = 100

# Memory settings
shared_buffers = 256MB
effective_cache_size = 1GB
work_mem = 4MB
maintenance_work_mem = 64MB

# Logging
log_statement = 'all'
log_duration = on
log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h '

# Performance
checkpoint_completion_target = 0.9
wal_buffers = 16MB
default_statistics_target = 100

# Locale settings
lc_messages = 'en_US.utf8'
lc_monetary = 'en_US.utf8'
lc_numeric = 'en_US.utf8'
lc_time = 'en_US.utf8'
default_text_search_config = 'pg_catalog.english'
```

## 🏗️ Step 2: Build and Test Local Image

### 2.1 Build the Docker Image

```bash
# Build the image with a tag
docker build -t andriyko1983/events-postgres:latest .

# Build with version tag
docker build -t andriyko1983/events-postgres:v1.0.0 .
```

### 2.2 Test the Image Locally

```bash
# Run the container
docker run -d \
  --name events-postgres-test \
  -p 5432:5432 \
  -e POSTGRES_DB=event_db \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  andriyko1983/events-postgres:latest

# Check if container is running
docker ps

# Test connection
docker exec -it events-postgres-test psql -U user -d event_db -c "SELECT version();"

# Stop and remove test container
docker stop events-postgres-test
docker rm events-postgres-test
```

## 📤 Step 3: Push to Docker Hub

### 3.1 Login to Docker Hub

```bash
# Login to Docker Hub
docker login

# Enter your Docker Hub username and password when prompted
```

### 3.2 Tag and Push Image

```bash
# Tag the image (if not already tagged correctly)
docker tag andriyko1983/events-postgres:latest andriyko1983/events-postgres:latest
docker tag andriyko1983/events-postgres:latest andriyko1983/events-postgres:v1.0.0

# Push to Docker Hub
docker push andriyko1983/events-postgres:latest
docker push andriyko1983/events-postgres:v1.0.0
```

### 3.3 Verify Upload

1. Go to [Docker Hub](https://hub.docker.com)
2. Login to your account
3. Navigate to your repositories
4. Verify that `andriyko1983/events-postgres` appears with the correct tags

## 🔧 Step 4: Update Project Configuration

### 4.1 Update Docker Compose File

Update your `src/docker/docker-compose.yml`:

```yaml
# Use postgres/example user/password credentials

services:
    db:
        # Use your custom image from Docker Hub
        image: andriyko1983/events-postgres:latest
        restart: always
        # set shared memory limit when using docker compose
        shm_size: 128mb
        environment:
            POSTGRES_USER: user
            POSTGRES_PASSWORD: password
            POSTGRES_DB: event_db
        ports:
            - "5432:5432"
        volumes:
            # Optional: persist data
            - postgres_data:/var/lib/postgresql/data
            # Optional: custom config override
            - ./postgres.conf:/etc/postgresql/postgresql.conf:ro

    # Optional: Add pgAdmin for database management
    pgadmin:
        image: dpage/pgadmin4:latest
        restart: always
        environment:
            PGADMIN_DEFAULT_EMAIL: shtumpf@gmail.com
            PGADMIN_DEFAULT_PASSWORD: admin
        ports:
            - "8080:80"
        depends_on:
            - db

volumes:
    postgres_data:
```

### 4.2 Create Production Docker Compose

Create `docker-compose.prod.yml` for production use:

```yaml
services:
    db:
        image: andriyko1983/events-postgres:v1.0.0
        restart: unless-stopped
        shm_size: 256mb
        environment:
            POSTGRES_USER: ${DB_USER}
            POSTGRES_PASSWORD: ${DB_PASSWORD}
            POSTGRES_DB: ${DB_NAME}
        volumes:
            - postgres_data:/var/lib/postgresql/data
        networks:
            - events-network
        # Don't expose port in production - use internal network
        # ports:
        #   - "5432:5432"

    app:
        image: andriyko1983/events-api:latest
        restart: unless-stopped
        environment:
            DATABASE_URL: postgresql://${DB_USER}:${DB_PASSWORD}@db:5432/${DB_NAME}
            NEXTAUTH_URL: ${NEXTAUTH_URL}
            NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
        ports:
            - "3000:3000"
        depends_on:
            - db
        networks:
            - events-network

volumes:
    postgres_data:

networks:
    events-network:
        driver: bridge
```

### 4.3 Update Environment Variables

Create `.env.production`:

```env
# Database Configuration
DB_USER=user
DB_PASSWORD=your-secure-password
DB_NAME=event_db
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@db:5432/${DB_NAME}

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-production-secret

# Google OAuth
GOOGLE_ID=103651864623-ma6tnpp0ubl3mn3b3i1s05vr5b9uqk6q.apps.googleusercontent.com
GOOGLE_SECRET=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

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51PphsnP0tBNZLlr5p5ZC7OLLqX84Z5FtrsgqhSyv5HEkucxUyqxVT0saMPR5nIScaDo7axSzzPqRYXxccew7MOlq00mfndWS8P
STRIPE_SECRET_KEY=sk_test_51PphsnP0tBNZLlr5uC9s9Mz1paDRKxMEnEvRN931SuQ1SeGJ0CTm52exZ3nYeJv8OktlbO7XExTTeVrqLDcyhIUF005e33uAan
```

## 🚀 Step 5: Deploy and Use

### 5.1 Local Development

```bash
# Navigate to your project root
Set-Location "c:\Users\shtum\OneDrive\Desktop\react_starter_apps\projects\mine\nextjs_typescript\events-api\event_ui - Copy"

# Start the database using your custom image
Set-Location "src\docker"
docker-compose up -d

# Run Prisma migrations
Set-Location "..\..\"
npx prisma migrate dev

# Start your Next.js application
npm run dev
```

### 5.2 Production Deployment

```bash
# Pull the latest image
docker pull andriyko1983/events-postgres:latest

# Start production services
docker-compose -f docker-compose.prod.yml up -d

# Run production migrations
docker-compose -f docker-compose.prod.yml exec app npx prisma migrate deploy
```

## 🔄 Step 6: Updating Your Image

### 6.1 Version Management

When you need to update your PostgreSQL configuration:

```bash
# Make changes to your Dockerfile, configs, or init scripts

# Build new version
docker build -t andriyko1983/events-postgres:v1.1.0 .

# Test locally
docker run -d --name test-postgres -p 5433:5432 andriyko1983/events-postgres:v1.1.0

# Push new version
docker push andriyko1983/events-postgres:v1.1.0

# Update latest tag
docker tag andriyko1983/events-postgres:v1.1.0 andriyko1983/events-postgres:latest
docker push andriyko1983/events-postgres:latest
```

### 6.2 Update Project References

Update your docker-compose files to use the new version:

```yaml
services:
    db:
        image: andriyko1983/events-postgres:v1.1.0 # Update version
```

## 🛠️ Step 7: Advanced Configuration

### 7.1 Multi-Environment Support

Create different images for different environments:

```bash
# Development image
docker build -t andriyko1983/events-postgres:dev -f Dockerfile.dev .

# Staging image
# docker build -t andriyko1983/events-postgres:staging -f Dockerfile.staging .

# Production image
docker build -t andriyko1983/events-postgres:prod -f Dockerfile.prod .
```

### 7.2 Automated Builds with GitHub Actions

Create `.github/workflows/docker-postgres.yml`:

```yaml
name: Build and Push PostgreSQL Image

on:
    push:
        branches: [main]
        paths: ["docker-postgres/**"]
    pull_request:
        branches: [main]
        paths: ["docker-postgres/**"]

jobs:
    build:
        runs-on: ubuntu-latest

        steps:
            - uses: actions/checkout@v3

            - name: Set up Docker Buildx
              uses: docker/setup-buildx-action@v2

            - name: Login to Docker Hub
              uses: docker/login-action@v2
              with:
                  username: ${{ secrets.DOCKERHUB_USERNAME }}
                  password: ${{ secrets.DOCKERHUB_TOKEN }}

            - name: Build and push
              uses: docker/build-push-action@v4
              with:
                  context: ./docker-postgres
                  push: true
                  tags: |
                      andriyko1983/events-postgres:latest
                      andriyko1983/events-postgres:${{ github.sha }}
```

## 🔍 Step 8: Monitoring and Maintenance

### 8.1 Health Checks

Add health check to your Dockerfile:

```dockerfile
# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD pg_isready -U $POSTGRES_USER -d $POSTGRES_DB || exit 1
```

### 8.2 Backup Strategy

Create backup scripts:

```bash
# Backup script
docker exec events-postgres-container pg_dump -U user event_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore script
docker exec -i events-postgres-container psql -U user event_db < backup_file.sql
```

## 🚨 Troubleshooting

### Common Issues:

1. **Permission Denied**: Ensure Docker is running and you're logged in to Docker Hub
2. **Image Not Found**: Verify the image name and tag are correct
3. **Connection Refused**: Check if the container is running and ports are correctly mapped
4. **Migration Failures**: Ensure the database is fully initialized before running migrations

### Debug Commands:

```bash
# Check container logs
docker logs events-postgres-container

# Connect to container shell
docker exec -it events-postgres-container bash

# Check PostgreSQL processes
docker exec events-postgres-container ps aux

# Test database connection
docker exec events-postgres-container pg_isready -U user -d event_db
```

## 📚 Additional Resources

-   [PostgreSQL Docker Official Documentation](https://hub.docker.com/_/postgres)
-   [Docker Hub Documentation](https://docs.docker.com/docker-hub/)
-   [Prisma with PostgreSQL](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
-   [Docker Compose Documentation](https://docs.docker.com/compose/)

---

**Note**: Replace `your-username` with your actual Docker Hub username throughout this guide.
