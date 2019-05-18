FROM node:11.14.0-alpine
MAINTAINER contact@ake3m.com

WORKDIR /var/www/website/

COPY ./package.json /var/www/website/package.json
COPY ./package-lock.json /var/www/website/package-lock.json

RUN npm i --production

COPY ./.next /var/www/website/.next
COPY ./server /var/www/website/server
COPY ./static /var/www/website/static
COPY ./static /var/www/website/static
COPY ./next.config.js /var/www/website/next.config.js
COPY ./public /var/www/website/public

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
