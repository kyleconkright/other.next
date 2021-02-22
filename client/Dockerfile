FROM node:alpine

WORKDIR /app

RUN ls -a

COPY package*.json ./

RUN npm install -q --no-color --no-progress

COPY ./ /app/

CMD ["npm", "run", "start:prod"]