# Task Management API

### Proposal: Task and user management API.

### Easy Setup Video Guide: https://www.youtube.com/watch?v=Zx7PVbdsRHQ
## 1) What was used?

- NestJS - https://nestjs.com/
- PostgreSQL - https://www.postgresql.org/
- Prisma ORM - https://www.prisma.io/
- Swagger - https://swagger.io/
- Docker - https://www.docker.com/
- NodeJS - You need Node >= 18 for this project.

### Things to Remember:

You need Docker to run the project.
Every time the project is taken down and restarted, all the PostgreSQL tables are dropped. This is only required for development environments.

## 2) Demo

### 2.1) Swagger API

![Swagger API](https://i.imgur.com/PCYUTG4.png)

### 2.2) To test the API, first you must use the Create New User endpoint, and set up your credentials:
![Swagger API](https://i.mgur.com/vXOoxzF.png)

### 2.3) Then you must use the sign-in endpoint, using your registered credentials, so you can get the access Token:
![Swagger API](https://i.imgur.com/KoRlqpG.png)

### 2.4) On the top of the screen, click the Authorize button and add your access token to Authorize any further requests:
![Swagger API](https://i.imgur.com/Ox41hqR/png)

## 3) Installation

### 3.1) Create a .env file in the root of the project for database access with the following:

```sh
DATABASE_URL="postgres://postgres:postgres@localhost:5432/task_management?schema=public"
JWT_SECRET="SUPERSEGREDOSECRETO"
```

### 3.2) In the root of the project, run "docker compose up" to start the docker containers.

```sh
docker compose up
```

### 3.3) To access the API documentation, run the project and access:
http://localhost:3000/api-docs

### 3.4) Back-end runs by default on:
http://localhost:3000/

### 3.5) There is a global '/api' decorator before every route.
