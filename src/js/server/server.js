const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
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
const { buildChatMessage, buildChatNotification } = require('./logic/chatLogic');

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

    // Update the player data with the game id
    updatePlayer(socket.id, { game: { id: gameId } });

    // Join the room related to the given game
    socket.join(gameId);

    // Send the game id
    socket.emit('sendGameId', gameId);
  });

  socket.on('joinGame', (gameId) => {
    // Add the current player to the game player list
    addPlayerToGame(gameId, socket.id);

    // Update the player data with the game id
    updatePlayer(socket.id, { game: { id: gameId } });

    // Get the player
    const player = getPlayer(socket.id);

    // Send a notification about this
    io.in(gameId).emit(
      'sendChatMessageToGame',
      buildChatNotification(`${player.nickname} joined the game`),
    );

    // Join the room related to the given game
    socket.join(gameId);
  });

  socket.on('leaveGame', (gameId) => {
    // Remove the current player from the game player list
    removePlayerFromGame(gameId, socket.id);

    // Update the player data with the game id
    updatePlayer(socket.id, { game: { id: undefined } });

    // Leave the room related to the given game
    socket.leave(gameId);

    // Get the player
    const player = getPlayer(socket.id);

    // Send a notification about this
    io.in(gameId).emit(
      'sendChatMessageToGame',
      buildChatNotification(`${player.nickname} left the game`),
    );
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
    // Get the player
    const player = getPlayer(socket.id);

    // Remove the current player from the game player list
    if (player.game.id) {
      removePlayerFromGame(player.game.id, socket.id);
      // Send a notification about this
      io.in(player.game.id).emit(
        'sendChatMessageToGame',
        buildChatNotification(`${player.nickname} left the game`),
      );
    }

    // Remove the player from the player list
    removePlayer(socket.id);
  });
});

app.get('/*', (request, response) => {
  response.sendFile('dist/index.html');
});

server.listen(port, () => console.log(`Listening on port ${port}`));
