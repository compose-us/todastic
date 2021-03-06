# Todastic

[![Build Status](https://travis-ci.com/compose-us/todastic.svg?branch=master)](https://travis-ci.com/compose-us/todastic)
[![Maintainability](https://api.codeclimate.com/v1/badges/3302583531e6947a8f3f/maintainability)](https://codeclimate.com/github/compose-us/todastic/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/compose-us/todastic/badge.svg?branch=master)](https://coveralls.io/github/compose-us/todastic?branch=master)

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

```bash
docker build -t todastic .
```

And run it as you're used to:

```bash
docker run -p 3000:3000 -d todastic
```

If you only want to start a **mongodb** and connect from your local dev environment to it:

```bash
docker run -e MONGO_INITDB_DATABASE=todastic -d --name todastic_mongo_standalone -p 127.0.0.1:27017:27017 mongo --smallfiles
```

Then start todastic with

```bash
DB_PORT=27017 DB_DATABASE=todastic SESSION_STORE=mongo npm run local
```

## Tests

The tests are run via [travis-ci](https://travis-ci.com/compose-us/todastic).

Run the following command in order to see results:
`docker-compose -p tests run -p 3000 --rm todastic npm run test`

### Browser based end-to-end tests

The browser based tests in `travis-integration-test.sh` build and start
the application via docker-compose in a docker container. The test
itself is run on the baremetal machine (Getting a browser up and running
in a container is not trivial). It reuses a installed Chrome browser.
Codecept also supports other browsers.

In case you want to start the npm task `test-browser` by hand, make
sure, the app is running on `localhost:3000` and the user `John` exists
with password `Snow`.

## Development

You can automatically build frontend changes with `npm run watch-web`.

## Database

From v0.2.2 on, todastic uses [mongoDB](https://www.mongodb.com/) for
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

`SESSION_STORE` is also configurable. Currently supported options are
`in-memory` (default, **not** suited for production) and `mongo`.

## Administration

### Adding users

You can use the node script `add-user.js` in the package `konsol` to add
a user. For more convenient usage, it is included in the root
`package.json`:
```
npm run add-user -- -u <username> -p <password> -l <language>
```
*Note*: You don't have to provide a password or language.
There will be a password auto-generated and english will be uses as language.
Known languages are english (en) and german (de).


