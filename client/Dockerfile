FROM node:alpine

WORKDIR /app

COPY client/package*.json ./

RUN npm install -q --no-color --no-progress

COPY client ./

CMD ["npm", "run", "start:prod"]