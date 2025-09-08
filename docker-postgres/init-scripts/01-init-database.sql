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