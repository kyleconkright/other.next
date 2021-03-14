FROM node:alpine

RUN apk add --update other-api

RUN apt-get update

WORKDIR /app

COPY api/package*.json ./

RUN npm install -q --no-color --no-progress

COPY api ./

CMD ["npm", "run", "dev"]