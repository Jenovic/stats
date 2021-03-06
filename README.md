# Stats-service

provide the capability to create new stats as well as updating stats via HTTP calls.

## Installation

- `yarn install`
- Create an `.env` file based on the example provided
- `yarn migrate` to create the database tables as well as populate the user and course tables with dummy data

## Commands

| Command                      | Description                                  |
| ---------------------------- | -------------------------------------------- |
| `yarn api:dev`               | Run hot reloading instance of the API server |
| `yarn migrate`               | Run migrations                               |
| `yarn migrate:rollback`      | Rollback last migration                      |
| `yarn make:migration <name>` | Create new migration                         |
| `yarn test`                  | run unit test on the getAverage function     |

## Documentation

[Swagger](https://swagger.io) documentation is available at `/docs/` in your browser when running the API server in development mode. This can be used to test the routes created.

## stack

In addition to node.js which was the requirement I've used

- express.js
- mysql with sequelize
- typescript
- Joi for testing
- Yarn for dependency management

## Assumptions

- I assume that the description of this `{timeStudied: type: number description: Type in milliseconds}` was meant to be `time` instead of `type` as I have built the session model based on that assumption

- Since the focus is on the stats service, I populate the user and course databases at installation with some dummy data.

- All modals primary keys (uuid) are required and not generated by default since of the body parameters to create a session is the session id.

- Since the only information used about modules is the number of modules studied during a session, I've not created a Module model.

## Project structure

This project uses the library ts express decorators (where ts stands for typescript, the language the project is written in). It provides us with the ability to decorate our API routes, type route parameters, and use a few useful features such as dependency injection.

### Controllers and Services

Most of the logic is contained within services.
The controllers then depend on these services so that if you need to re-use logic or change the way that things are formatted, your core logic won???t change.

### Models

Given a simplified representation of these models, the only model that is worth mentioning is the SessionStudy model.

Assuming that the session belongs to a course and a user, I include a connection to both these models (as foreign fields) in the SessionStudy model

### Definitions

This is simply where all the interfaces will are stored.

### Utilities

This directory has any global utility function you may need. For instance, getAverageScore might be needed in a few places within the app

### Tests

Data validation for all the http requests made.
