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
