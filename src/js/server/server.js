const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
<<<<<<< HEAD
const {
  createGame,
  addPlayerToGame,
  removePlayerFromGame,
  getAvailableGames,
  getGame,
} = require('./logic/gameLogic');
const {
  addPlayer, removePlayer, getPlayer, updatePlayer,
} = require('./logic/playerLogic');
const { buildChatMessage } = require('./logic/chatLogic');

const port = 4001;
const app = express();
app.use(express.static('dist'));
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  // Add the current user to the list of players with default data
  addPlayer(socket.id);

  socket.on('createGame', (gameName) => {
    // Create the game and get the id
    const gameId = createGame(gameName, socket.id);

    // Join the room related to the given game
    socket.join(gameId);

    // Send the game id
    socket.emit('sendGameId', gameId);
  });

  socket.on('joinGame', (gameId) => {
    // Add the current player to the game player list
    addPlayerToGame(gameId, socket.id);

    // Join the room related to the given game
    socket.join(gameId);
  });

  socket.on('leaveGame', (gameId) => {
    // Remove the current player from the game player list
    removePlayerFromGame(gameId, socket.id);

    // Leave the room related to the given game
    socket.leave(gameId);
  });

  socket.on('getCurrentPlayer', () => {
    socket.emit('sendCurrentPlayer', getPlayer(socket.id));
  });

  socket.on('updateCurrentPlayer', (data) => {
    updatePlayer(socket.id, data);
    socket.emit('sendCurrentPlayer', getPlayer(socket.id));
  });

  socket.on('sendChatMessage', ({ roomId, chatMessage }) => {
    io.in(roomId).emit('sendChatMessageToGame', buildChatMessage(socket.id, chatMessage));
  });

  socket.on('getAllGames', () => {
    socket.emit('sendAllGames', getAvailableGames());
  });

  socket.on('getGame', (gameId) => {
    io.in(gameId).emit('sendGame', getGame(gameId));
  });

  socket.on('disconnect', () => {
    removePlayer(socket.id);
  });
});

app.get('/*', (request, response) => {
=======

// our localhost port
const port = 4001;

const app = express();

const players = {};
const games = {};

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
    // Store the player
    players[socket.id] = { ...players[socket.id], game };

    socket.join(game);
  });

  socket.on('leaveGame', (game) => {
    socket.leave(game);
  });

  socket.on('sendPlayerData', (playerData) => {
    console.log(`Player data ${playerData} sent`);
    players[socket.id] = { ...players[socket.id], ...playerData };
    console.log(players);
  });

  socket.on('sendChatMessage', (content) => {
    io.in(players[socket.id].game).emit('sendChatMessageToGame', {
      author: players[socket.id],
      content,
      date: new Date(),
    });
  });

  socket.on('getAllGames', () => {
    socket.emit('sendAllGames', io.sockets.adapter.rooms);
  });

  socket.on('getPlayersInGame', (game) => {
    socket.emit(
      'sendPlayersInGames',
      Object.keys(io.sockets.adapter.rooms[game].sockets).map(id => ({
        id,
        nickname: players[id].nickname,
      })),
    );
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    delete players[socket.id];
  });
});

app.get('/', (request, response) => {
>>>>>>> e7c6a4c47281a2ff81148d1af4a289d3aef8ab9e
  response.sendFile('dist/index.html');
});

server.listen(port, () => console.log(`Listening on port ${port}`));
