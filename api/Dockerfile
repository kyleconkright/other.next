FROM node:alpine

RUN apt-get -y update

WORKDIR /app

COPY api/package*.json ./

RUN npm install -q --no-color --no-progress

COPY api ./

CMD ["npm", "run", "dev"]