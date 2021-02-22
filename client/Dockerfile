FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -q --no-color --no-progress

COPY ./ /app/

CMD ["npm", "run", "start"]