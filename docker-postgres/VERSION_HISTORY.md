# PostgreSQL Docker Image Version History

## v1.2.0 (2025-01-08) - Step 7 Implementation

### Major Features - Advanced Configuration

-   **Multi-Environment Support**: Added dedicated Dockerfiles for different environments
    -   `Dockerfile.dev` - Development environment with verbose logging and relaxed security
    -   `Dockerfile.staging` - Staging environment with balanced performance and security
    -   `Dockerfile.prod` - Production environment with maximum security and performance
-   **Environment-Specific Configurations**: Optimized PostgreSQL settings per environment
    -   Development: Fast startup, verbose logging, trust authentication
    -   Staging: Balanced settings for production-like testing
    -   Production: Maximum performance, security, and reliability
-   **CI/CD Integration**: Complete GitHub Actions workflows
    -   Automated multi-environment image building
    -   Security scanning with Trivy
    -   Automated deployment workflows
    -   Version management and tagging
-   **Build Automation**: PowerShell build script with testing
    -   `build-images.ps1` - Build, test, and push images for all environments
    -   Automated image testing after build
    -   Support for individual or batch environment builds
-   **Deployment Scripts**: Local deployment automation
    -   `deploy-local.ps1` - Easy local environment management
    -   Support for dev, staging, and production environments
    -   Health checks and status monitoring

### New Files Added

```
docker-postgres/
├── Dockerfile.dev              # Development environment
├── Dockerfile.staging          # Staging environment
├── Dockerfile.prod            # Production environment
├── configs/
│   ├── postgresql.dev.conf    # Development PostgreSQL config
│   ├── postgresql.staging.conf # Staging PostgreSQL config
│   └── postgresql.prod.conf   # Production PostgreSQL config
├── build-images.ps1           # Build automation script
└── README.md                  # Comprehensive documentation

.github/workflows/
├── docker-postgres.yml        # PostgreSQL image CI/CD
├── docker-app.yml             # Application image CI/CD
└── deploy.yml                 # Deployment workflow

Root level:
├── docker-compose.staging.yml  # Staging compose file
├── .env.staging               # Staging environment variables
└── deploy-local.ps1           # Local deployment script
```

### Configuration Differences by Environment

| Setting            | Development | Staging  | Production    |
| ------------------ | ----------- | -------- | ------------- |
| shared_buffers     | 128MB       | 256MB    | 512MB         |
| max_connections    | 50          | 100      | 200           |
| log_statement      | all         | mod      | ddl           |
| fsync              | off         | on       | on            |
| synchronous_commit | off         | on       | on            |
| Authentication     | trust       | password | scram-sha-256 |

### CI/CD Features

-   **Automated Building**: Triggers on changes to docker-postgres directory
-   **Multi-Platform**: Builds for linux/amd64 and linux/arm64
-   **Security Scanning**: Trivy vulnerability scanning for all images
-   **Testing**: Automated container testing in CI pipeline
-   **Version Management**: Automatic version history updates
-   **Deployment**: Automated deployment to staging and production

### Usage Examples

```powershell
# Build all environments
.\docker-postgres\build-images.ps1 all

# Deploy staging locally
.\deploy-local.ps1 staging up

# Build and push production image
.\docker-postgres\build-images.ps1 prod -Push
```

## v1.1.1 (2025-01-07)

### Changes

-   **Performance**: Improved autovacuum settings for better maintenance
    -   Reduced `autovacuum_naptime` from 20s to 15s
    -   Lowered vacuum thresholds from 50 to 40
    -   Added `autovacuum_vacuum_scale_factor = 0.1`
    -   Added `autovacuum_analyze_scale_factor = 0.05`
-   **Documentation**: Updated configuration comments

### Configuration Changes

```diff
- autovacuum_naptime = 20s
- autovacuum_vacuum_threshold = 50
- autovacuum_analyze_threshold = 50
+ autovacuum_naptime = 15s
+ autovacuum_vacuum_threshold = 40
+ autovacuum_analyze_threshold = 40
+ autovacuum_vacuum_scale_factor = 0.1
+ autovacuum_analyze_scale_factor = 0.05
```

## v1.1.0 (2025-01-07)

### Changes

-   **Performance**: Major configuration optimization for Events API workload
    -   Increased `max_connections` from 100 to 200
    -   Doubled `shared_buffers` from 256MB to 512MB
    -   Increased `effective_cache_size` from 1GB to 2GB
    -   Doubled `work_mem` from 4MB to 8MB
    -   Doubled `maintenance_work_mem` from 64MB to 128MB
    -   Doubled `wal_buffers` from 16MB to 32MB
-   **Logging**: Optimized for production
    -   Changed `log_statement` from 'all' to 'ddl'
    -   Added `log_min_duration_statement = 1000`
    -   Added connection/disconnection logging
-   **Features**: Added advanced PostgreSQL features
    -   Enabled partitionwise joins and aggregates
    -   Added WAL compression
    -   Configured background writer settings
    -   Enhanced autovacuum configuration
-   **Health**: Added Docker health check
-   **Security**: Added `password_encryption = scram-sha-256`

### Configuration Changes

```diff
- max_connections = 100
- shared_buffers = 256MB
- effective_cache_size = 1GB
- work_mem = 4MB
- maintenance_work_mem = 64MB
- wal_buffers = 16MB
- log_statement = 'all'
+ max_connections = 200
+ shared_buffers = 512MB
+ effective_cache_size = 2GB
+ work_mem = 8MB
+ maintenance_work_mem = 128MB
+ wal_buffers = 32MB
+ log_statement = 'ddl'
+ log_min_duration_statement = 1000
+ [many additional optimizations]
```

## v1.0.0 (Initial Release)

### Changes

-   **Base**: PostgreSQL 16-alpine
-   **Databases**: Created `event_db`, `event_db_test`, `event_db_staging`
-   **Users**: Created `event_user` with appropriate permissions
-   **Extensions**: Installed `uuid-ossp` and `pgcrypto`
-   **Configuration**: Basic production-ready settings
-   **Initialization**: Custom database setup scripts

### Features

-   Multi-environment database support
-   Custom PostgreSQL configuration
-   Automated database initialization
-   Extension support for Events API

---

## Upgrade Instructions

### From v1.1.0 to v1.1.1

1. Pull new image: `docker pull andriyko1983/events-postgres:v1.1.1`
2. Update docker-compose files to use `v1.1.1`
3. Restart containers: `docker-compose down && docker-compose up -d`
4. No data migration required

### From v1.0.0 to v1.1.0

1. **Backup your data first**: Use `scripts/backup-database.ps1`
2. Pull new image: `docker pull andriyko1983/events-postgres:v1.1.0`
3. Update docker-compose files to use `v1.1.0`
4. Restart containers: `docker-compose down && docker-compose up -d`
5. Monitor performance improvements

## Testing New Versions

Before deploying to production:

1. Test locally on different port: `docker run -d --name test-postgres -p 5433:5432 andriyko1983/events-postgres:vX.X.X`
2. Run connection tests: `docker exec test-postgres pg_isready -U user -d event_db`
3. Verify configuration: `docker exec test-postgres psql -U user -d event_db -c "SHOW max_connections;"`
4. Check health status: `docker ps` (should show "healthy")
5. Clean up: `docker stop test-postgres && docker rm test-postgres`
