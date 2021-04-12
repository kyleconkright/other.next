import app from './app';

const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);

export const io = socketIo(server, {
  cors: {
    origin: "https://other.supply",
    methods: ["GET", "POST"]
  }
});

server.listen(5001, () => {
  console.log(`Server Running... ${process.env.CLIENT_URL}`);
})