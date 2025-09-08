# Use official PostgreSQL image as base
FROM postgres:16-alpine

# Set version label
LABEL version="1.1.0"
LABEL description="Custom PostgreSQL for Events API - Optimized Configuration"

# Set environment variables
ENV POSTGRES_DB=event_db
ENV POSTGRES_USER=user
ENV POSTGRES_PASSWORD=password

# Copy initialization scripts
COPY ./init-scripts/ /docker-entrypoint-initdb.d/

# Copy custom configuration
COPY ./postgresql.conf /etc/postgresql/postgresql.conf

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD pg_isready -U $POSTGRES_USER -d $POSTGRES_DB || exit 1

# Expose PostgreSQL port
EXPOSE 5432

# Set custom command to use our config
CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]