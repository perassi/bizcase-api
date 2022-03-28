# APQC

### Tech Stacks

- Language: NodeJS + TypeScript
- Runtime: NodeJS 10.x
- DataBase: PostgresSQL
- ORM: TypeORM
- Docker with `docker-compose`

## Installation

```bash
$ yarn
```

## Running the app

### API keys and secrets

You should pass env vars directly from the shell. In development mode, you can create the `.env` file. See example in `.example.env`.

```bash
# Copy env example file for default settings
cp .env.example .env
```

### TypeORM config

```bash
# Copy Typeorm config example file for database settings
cp ormconfig.json.example ormconfig.json
```
Postgres database settings in ormconfig.json

    {
      "type": "postgres",
      "host": "localhost",
      "port": 5432,
      "username": "postgres",
      "password": "postgres",
      "database": "apqc_r721",
      "entities": ["src/modules/**/**.entity{.ts,.js}"],
      "synchronize": true
    }

On application start, tables for all entities will be created.

### create database

You should create database before the first time you run the repo locally.

```bash
# use default docker-compose
docker-compose up -d

# OR use environment variables docker-compose
POSTGRES_DB=apqc_r721 POSTGRES_PORT=5432 POSTGRES_PASSWORD=postgres POSTGRES_PASSWORD=postgres docker-compose up -d
```

### Scripts

```bash
# apqc script
$ yarn apqc

# or
ts-node -r dotenv/config -r tsconfig-paths/register src/scripts/apqc.ts
```
