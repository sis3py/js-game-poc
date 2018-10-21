const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// our localhost port
const port = 4001;

const app = express();

const players = {};
const games = [];

app.use(express.static('dist'));

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

// This is what the socket.io syntax is like, we will work this later
io.on('connection', (socket) => {
  console.log('New client connected');

  // // just like on the client side, we have a socket.on method that takes a callback function
  // socket.on('change color', (color) => {
  //   // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
  //   // we make use of the socket.emit method again with the argument given to use from the callback function above
  //   console.log('Color Changed to: ', color);
  //   io.sockets.emit('change color', color);
  // })

  socket.on('joinGame', (game) => {
    players[socket.id] = { ...players[socket.id], game };
    console.log(`game ${game} joined`);
    socket.join(game);
  });

  socket.on('sendPlayerData', (playerData) => {
    console.log(`Player data ${playerData} sent`);
    players[socket.id] = { ...players[socket.id], ...playerData };
    console.log(players);
  });

  socket.on('sendChatMessage', (content) => {
    socket.emit('sendChatMessageToGame', { author: players[socket.id], content, date: new Date() });
    // socket.to(players[socket.id].game).emit('sendChatMessageToGame', message);
  });

  socket.on('getAllGames', () => {
    socket.emit('sendAllGames', io.sockets.adapter.rooms);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    delete players[socket.id];
  });
});

app.get('/', (request, response) => {
  response.sendFile('dist/index.html');
});

server.listen(port, () => console.log(`Listening on port ${port}`));
