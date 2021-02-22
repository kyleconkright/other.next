FROM node:alpine

WORKDIR /app

COPY api/package.json /app/package.json
COPY api/package-lock.json /app/package-lock.json

RUN npm install -q --no-color --no-progress

COPY api ./

RUN npm run build

CMD ["npm", "run", "start:prod"]