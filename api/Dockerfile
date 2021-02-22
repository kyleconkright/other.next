WORKDIR /app

COPY package*.json ./

RUN npm install -q --no-color --no-progress

COPY ./ /app/

CMD ["npx", "ts-node", "server.ts"]