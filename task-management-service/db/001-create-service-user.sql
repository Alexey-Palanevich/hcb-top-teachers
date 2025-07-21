CREATE DATABASE shadow_prisma_db;

CREATE USER service_user WITH PASSWORD 'service_pass';

GRANT USAGE ON SCHEMA public TO service_user;
GRANT CREATE ON SCHEMA public TO service_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO service_user;

\c shadow_prisma_db
GRANT USAGE ON SCHEMA public TO service_user;
GRANT CREATE ON SCHEMA public TO service_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO service_user;
