CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS system_metadata (
   id UUID PRIMARY KEY,
   key_name VARCHAR(100) NOT NULL UNIQUE,
    value TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO system_metadata (id, key_name, value)
VALUES (
   gen_random_uuid(),
   'platform_name',
   'Velqora Platform'
);