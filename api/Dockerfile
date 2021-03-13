FROM node:alpine

WORKDIR /app

COPY api/package*.json ./

RUN npm install -q --no-color --no-progress

COPY api ./

CMD ["npm", "run", "dev"]