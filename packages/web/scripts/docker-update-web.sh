#!/usr/bin/env bash

docker-compose stop web &&  docker-compose rm -f web && docker-compose up -d web
