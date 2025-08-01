# hcb-top-teachers

## TL;DR
A just one more study project.
The project is needed to practice\consolidate knowledge I've got from different sources.

## Definitions

SCC is `Systems Communication Course` (https://tough-dev.school/architecture)

HCB is `Happy Cat Box`, an imagined company from tough-dev.school.

TT is `Top Teachers` project, the project helps Happy Cat Box check teacher candidates on professional suitability.

## Goals

Let's define the goals I want to achieve:

- [ ] Practice theory from `SCC`
  - [ ] Consolidate knowledge of `Event Storming` & `Data Modeling`
  - [ ] Go deeper in `Event-Driven Architecture` (EDA)
  - [ ] Practice `Message Broker` technologies
  - [ ] Practice the evolution of systems communication 
  - [ ] Setup `Monitoring` & `Observability`
  - [ ] Practice writing `Architecture Decision Record` (ADR)
- [ ] Practice CI\CD
  - [ ] Maintaining a well-supported history of commits, PRs, and issues
  - [ ] Find out linter's best practice
  - [ ] Practice all types of testing
  - [ ] Practice versioning code, libraries, and services
  - [ ] Practice deploying services on VPS
- [ ] Practice Clean Architecture
  - [ ] Splitting code on layers (horizontal)
  - [ ] Splitting code on features (vertical)
  - [ ] Enforce Contributors to follow Clean Architecture
  - [ ] Practice evolution of a system
- [ ] ...

## Get Started

### Requirements

I'll try to avoid dependency on specific programs. Right now to run the project, you need only:

 - Installed [docker](https://docs.docker.com/get-started/get-docker/)

### Run locally

0. (Optional) Check you have working docker
```shell
docker -v
```

1. Run docker via docker compose file
```shell
docker compose up -d --build
```

2. Stop docker
```shell
docker compose down
```

2. (Alternative) Stop docker with clean volumes
```shell
docker compose down -v
```

