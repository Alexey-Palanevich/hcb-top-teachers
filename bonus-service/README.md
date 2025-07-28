## Description

This service is part of `Top Teachers` project.
It's responsible for manager's bonuses. 

All current user stories can be found in [User Stories](#user-stories) part.

Service is written on NestJS with Fastify under the hood. 
You can find out how to work with it in [Service Get Started](#get-started)

## Get Started

In general, you don't need to setup anything like in usual NestJS project, because everything is done in [Dockerfile](./Dockerfile)
and the service is running by common [docker-compose](../docker-compose.yml).

Dockerfile already has required steps to run service in dev\prod mode. 
If you want to run only this service, please make a new docker-compose setup with Kafka infrastructure (credentials in [main.ts](./src/main.ts)).


I also leave typical NestJS steps.

### Project setup

```bash
$ npm install
```

### Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## User Stories

An original document can be found in [TopTeachers](../docs/TopTeachers.md)



## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
