# Bizcase API

## Tech Stacks

- Language: NodeJS + TypeScript
- Runtime: NodeJS 10.x
- DataBase: PostgresSQL
- Framework: [NestJS](https://docs.nestjs.com)
- ORM: [TypeORM](https://typeorm.io/)
- Docker with `docker-compose`
- [Jenkins](https://jenkins.io/) for CI/CD

## Installation

```bash
$ yarn
```

## Configuration

### API keys and secrets

You should pass env vars directly from the shell. In development mode, you can create the `.env` file. See example in `.example.env`.

```bash
# Copy env example file for default settings
cp .env.example .env
```

### TypeORM config

2 TypeORM is used and they are specified in .env file and configured from `src/database.config.ts`.

### Create database

You should create database before the first time you run the repo locally.

```bash
# use default docker-compose
docker-compose up -d

# OR use environment variables docker-compose
POSTGRES_DB=biz_case POSTGRES_PORT=5432 POSTGRES_PASSWORD=postgres POSTGRES_PASSWORD=postgres docker-compose up -d
```

## Development

### Start Development Server
```bash
# development in watch mode
$ yarn dev

# debug
$ yarn start:debug

```

### Linting

```bash
$ yarn lint
```

### Test
```bash
$ yarn test

# in watch mode
$ yarn test:watch
```

## Production
```bash
$ docker-compose -p bizcase-api up
```

## API Documentation
```bash
$ yarn dev
# or
$ yarn build && yarn start:prod
```

You can see [swagger](https://swagger.io/) documentation from `http://{{host}}:{{port}}/docs`.