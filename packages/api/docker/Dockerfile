FROM node:11.14.0-alpine
MAINTAINER contact@ake3m.com

WORKDIR /var/www/website/

COPY ./package.json /var/www/website/package.json
COPY ./package-lock.json /var/www/website/package-lock.json


RUN npm i --production

COPY ./config /var/www/website/config
COPY ./lib /var/www/website/lib

EXPOSE 3002

ENTRYPOINT ["npm", "start"]
