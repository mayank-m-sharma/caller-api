
const socketIo = require('socket.io');
const socketAuth = require('./middlewares/socketAuth');
let io;


const initWebSocket = (server) => {
  io = socketIo(server);
  io.use(socketAuth)
  io.on('connection', (socket) => {
        console.log('socket connected', socket.id)
        socket.emit('connected')
    });
};

const getIoInstance = () => {
  if (!io) {
    throw new Error("Socket.io instance not initialized!");
  }
  return io;
}


module.exports = { initWebSocket, getIoInstance };
