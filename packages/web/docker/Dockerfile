FROM node:11.14.0-alpine
MAINTAINER contact@ake3m.com

COPY ./.next /var/www/website/.next
COPY ./server /var/www/website/server
COPY ./static /var/www/website/static
COPY ./static /var/www/website/static
COPY ./next.config.js /var/www/website/next.config.js
COPY ./package.json /var/www/website/package.json
COPY ./package-lock.json /var/www/website/package-lock.json

WORKDIR /var/www/website/

RUN npm i --production

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
