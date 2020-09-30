const PORT = process.env.PORT || 3000;

const express = require('express');
const socket = require('socket.io');

const app = express();

app.use(express.static(`${__dirname}/public`));

const server = app.listen(PORT);

const io = socket(server);
io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);

  // Handle chat message event
  socket.on('chat', (data) => {
    // console.log(data);
    io.sockets.emit('chat', data);
  });

  // Handle "user is typing" event
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});