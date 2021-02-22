FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -q --no-color --no-progress

COPY ./ /app/

RUN npm run build

CMD ["npm", "run", "start"]