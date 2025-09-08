# PostgreSQL Docker Images - Advanced Configuration

This directory contains advanced PostgreSQL Docker configurations for the Events API project, supporting multiple environments with optimized settings.

## 🏗️ Architecture Overview

```
docker-postgres/
├── Dockerfile              # Base/legacy Dockerfile
├── Dockerfile.dev          # Development environment
├── Dockerfile.staging      # Staging environment
├── Dockerfile.prod         # Production environment
├── configs/
│   ├── postgresql.dev.conf      # Development PostgreSQL config
│   ├── postgresql.staging.conf  # Staging PostgreSQL config
│   └── postgresql.prod.conf     # Production PostgreSQL config
├── init-scripts/
│   ├── 01-init-database.sql     # Database initialization
│   └── 02-seed-data.sql         # Optional seed data
├── scripts/                     # Utility scripts
├── build-images.ps1            # PowerShell build script
└── README.md                   # This file
```

## 🚀 Quick Start

### Local Development

```powershell
# Build development image
.\build-images.ps1 dev

# Or build all environments
.\build-images.ps1 all

# Push to Docker Hub (requires login)
.\build-images.ps1 all -Push
```

### Using Docker Compose

```bash
# Development
docker-compose -f docker-compose.yml up -d

# Staging
docker-compose -f docker-compose.staging.yml up -d

# Production
docker-compose -f docker-compose.prod.yml up -d
```

## 🔧 Environment Configurations

### Development (`Dockerfile.dev`)

-   **Optimized for**: Fast development, verbose logging
-   **Security**: Relaxed (trust authentication)
-   **Performance**: Optimized for speed over safety
-   **Logging**: All statements logged
-   **Memory**: Conservative settings (128MB shared_buffers)

### Staging (`Dockerfile.staging`)

-   **Optimized for**: Testing production-like environment
-   **Security**: Balanced security settings
-   **Performance**: Balanced performance/safety
-   **Logging**: Moderate logging (modifications only)
-   **Memory**: Moderate settings (256MB shared_buffers)

### Production (`Dockerfile.prod`)

-   **Optimized for**: Maximum performance and safety
-   **Security**: Full security enabled
-   **Performance**: Optimized for production workloads
-   **Logging**: Minimal logging (DDL only)
-   **Memory**: High-performance settings (512MB shared_buffers)

## 📊 Configuration Comparison

| Setting            | Development | Staging  | Production    |
| ------------------ | ----------- | -------- | ------------- |
| shared_buffers     | 128MB       | 256MB    | 512MB         |
| max_connections    | 50          | 100      | 200           |
| log_statement      | all         | mod      | ddl           |
| fsync              | off         | on       | on            |
| synchronous_commit | off         | on       | on            |
| Authentication     | trust       | password | scram-sha-256 |

## 🔨 Building Images

### Using PowerShell Script (Recommended)

```powershell
# Build specific environment
.\build-images.ps1 dev
.\build-images.ps1 staging
.\build-images.ps1 prod

# Build all environments
.\build-images.ps1 all

# Build and push to Docker Hub
.\build-images.ps1 all -Push

# Test images after building
.\build-images.ps1 dev  # Automatically tests after build
```

### Manual Docker Commands

```bash
# Development
docker build -t andriyko1983/events-postgres:latest-dev -f Dockerfile.dev .

# Staging
docker build -t andriyko1983/events-postgres:latest-staging -f Dockerfile.staging .

# Production
docker build -t andriyko1983/events-postgres:latest-prod -f Dockerfile.prod .
```

## 🧪 Testing Images

Each environment image can be tested locally:

```bash
# Test development image
docker run -d --name test-dev-postgres \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD=test_password \
  andriyko1983/events-postgres:latest-dev

# Test connection
docker exec test-dev-postgres pg_isready -U user -d event_db

# Clean up
docker stop test-dev-postgres && docker rm test-dev-postgres
```

## 🔄 CI/CD Integration

### GitHub Actions

The project includes automated workflows:

-   **`docker-postgres.yml`**: Builds and pushes PostgreSQL images
-   **`docker-app.yml`**: Builds and pushes application images
-   **`deploy.yml`**: Handles deployment to staging/production

### Workflow Triggers

-   **Push to main/develop**: Builds all images
-   **PR to main**: Builds and tests images (no push)
-   **Manual dispatch**: Build specific environments

### Required Secrets

Set these in your GitHub repository secrets:

```
DOCKERHUB_USERNAME=andriyko1983
DOCKERHUB_TOKEN=your_docker_hub_token
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=event_db
NEXTAUTH_URL=your_nextauth_url
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_ID=your_google_oauth_id
GOOGLE_SECRET=your_google_oauth_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## 🔐 Security Features

### Production Security

-   SCRAM-SHA-256 password encryption
-   Non-root user execution
-   Minimal logging to prevent data leaks
-   Health checks for container monitoring

### Development Security

-   Trust authentication for easy development
-   Verbose logging for debugging
-   Relaxed connection settings

## 📈 Performance Tuning

### Memory Settings by Environment

**Development**:

-   Optimized for low resource usage
-   Fast startup times
-   Suitable for local development

**Staging**:

-   Balanced resource usage
-   Production-like performance testing
-   Moderate connection limits

**Production**:

-   Maximum performance settings
-   High connection limits
-   Optimized for concurrent users

## 🛠️ Maintenance

### Version Management

Images are tagged with:

-   Environment suffix: `-dev`, `-staging`, `-prod`
-   Version numbers: `1.1.0-dev`, `1.1.0-staging`, `1.1.0-prod`
-   Latest tags: `latest-dev`, `latest-staging`, `latest-prod`

### Updating Configurations

1. Modify the appropriate config file in `configs/`
2. Update the Dockerfile if needed
3. Build and test the new image
4. Push to Docker Hub
5. Update docker-compose files to use new version

### Backup and Recovery

```bash
# Backup
docker exec postgres-container pg_dump -U user event_db > backup.sql

# Restore
docker exec -i postgres-container psql -U user event_db < backup.sql
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**: Check Docker is running and you have sufficient disk space
2. **Connection Issues**: Verify environment variables and network settings
3. **Permission Errors**: Ensure proper Docker Hub authentication
4. **Performance Issues**: Check memory settings for your environment

### Debug Commands

```bash
# Check container logs
docker logs postgres-container

# Connect to container
docker exec -it postgres-container bash

# Check PostgreSQL configuration
docker exec postgres-container cat /etc/postgresql/postgresql.conf

# Monitor PostgreSQL processes
docker exec postgres-container ps aux | grep postgres
```

## 📚 Additional Resources

-   [PostgreSQL Configuration Documentation](https://www.postgresql.org/docs/16/runtime-config.html)
-   [Docker Multi-stage Builds](https://docs.docker.com/develop/dev-best-practices/)
-   [PostgreSQL Performance Tuning](https://wiki.postgresql.org/wiki/Performance_Optimization)
-   [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/)

---

**Note**: Always test configuration changes in development before applying to staging or production environments.
