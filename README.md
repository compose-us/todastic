# Todastic

[![Build Status](https://travis-ci.com/compose-us/todastic.svg?branch=master)](https://travis-ci.com/compose-us/todastic)
[![Maintainability](https://api.codeclimate.com/v1/badges/3302583531e6947a8f3f/maintainability)](https://codeclimate.com/github/compose-us/todastic/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3302583531e6947a8f3f/test_coverage)](https://codeclimate.com/github/compose-us/todastic/test_coverage)

Simple self-, project- and task management.

## Building

Run `npm` to install necessary scripts (and `lerna`).

```
npm install
```

If you have `./node_modules/.bin` in your `$PATH`, you can run `lerna` to install all packages in the monorepo.
Otherwise, you should install `lerna` globally by doing `npm install -g lerna`.

```
lerna bootstrap
```

Running the client

```
lerna run build-client && npm run start-web
```

### Docker

Build the docker container

```
docker build -t todastic .
```

And run it as you're used to:

```
docker run -p 3000:3000 -d todastic
```

## Development

You can automatically build frontend changes with `npm run watch-web`.

## Database

From v0.2.1 on, todastic uses [mongoDB](https://www.mongodb.com/) for
user and session management. Easiest configuration option is to follow
the [12 factor](https://12factor.net/) pattern and configure todastic
via the following environment variables:

```yaml
DB_HOST
DB_USER
DB_PASSWORD
DB_PORT
DB_DATABASE
```
> User and password can be left empty if your mongodb instance doesn't
> require authentication.

You can also set the environment variable `PORT` to bind to a
different port than the standard 3000.
