const socketIo = require('socket.io');
const socketAuth = require('./middlewares/socketAuth');
let io;

const initWebSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: '*', // Allow all origins
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
      credentials: true
    }
  });
  // io.use(socketAuth);
  io.on('connection', (socket) => {
    console.log('socket connected', socket.id);
    socket.emit('connected');

    // Emit random data every 10 seconds
    setInterval(() => {
      const randomData = {
        id: Math.floor(Math.random() * 1000),
        value: Math.random().toString(36).substring(7),
      };
      socket.emit('randomData', randomData);
    }, 3000);
  });
};

const getIoInstance = () => {
  if (!io) {
    throw new Error("Socket.io instance not initialized!");
  }
  return io;
};

module.exports = { initWebSocket, getIoInstance };