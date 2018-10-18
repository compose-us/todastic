#!/bin/bash

function cleanup {
  rv=$?
  docker-compose down
  exit $rv
}
trap cleanup EXIT

docker-compose up -d todastic

# give container a bit time to start
NEXT_WAIT_TIME=0
until curl --silent --output /dev/null localhost:3000 || [ $NEXT_WAIT_TIME -eq 8 ]; do
   sleep $(( NEXT_WAIT_TIME++ ))
done

npm run codeceptjs

