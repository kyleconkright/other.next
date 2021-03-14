FROM node:8

RUN apt-get update && apt-get install -y

WORKDIR /app

COPY api/package*.json ./

RUN npm install -q --no-color --no-progress

COPY api ./

CMD ["npm", "run", "dev"]