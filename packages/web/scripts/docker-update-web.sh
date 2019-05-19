#!/usr/bin/env bash
docker-compose stop web
docker-compose rm -f web
docker rm -f ake3m/web
docker-compose up --force-recreate -d web
