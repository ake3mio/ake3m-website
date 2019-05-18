#!/usr/bin/env bash
docker build -f docker/Dockerfile -t ake3m/web:latest .
docker push ake3m/web:latest
