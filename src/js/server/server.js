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
const { playerStatus } = require('../enum/playerStatus');

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

    // Update the player data :
    // - set the game id
    // - set the player status to in lobby
    updatePlayer(socket.id, { game: { id: gameId }, status: playerStatus.inLobbyNotReady });

    // Get the player
    const player = getPlayer(socket.id);

    // Send the updated current player
    socket.emit('sendCurrentPlayer', player);

    // Join the room related to the given game
    socket.join(gameId);

    // Send the game id
    socket.emit('sendGameId', gameId);
  });

  socket.on('joinGame', (gameId) => {
    // Add the current player to the game player list
    addPlayerToGame(gameId, socket.id);

    // Update the player data :
    // - set the game id
    // - set the player status to in lobby
    updatePlayer(socket.id, { game: { id: gameId }, status: playerStatus.inLobbyNotReady });

    // Get the player
    const player = getPlayer(socket.id);

    // Send the updated current player
    socket.emit('sendCurrentPlayer', player);

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

    // - unset the game id
    // - set the player status to in online
    updatePlayer(socket.id, { game: { id: undefined }, status: playerStatus.online });

    // Get the player
    const player = getPlayer(socket.id);

    // Send the updated current player
    socket.emit('sendCurrentPlayer', player);

    // Leave the room related to the given game
    socket.leave(gameId);

    // Get the game
    const game = getGame(gameId);

    // Only if the game is still existing
    if (game) {
      // Send the game data to every players that are still in the game
      io.in(game.id).emit('sendGame', getGame(game.id));

      // Send a notification about this
      io.in(game.id).emit(
        'sendChatMessageToGame',
        buildChatNotification(`${player.nickname} left the game`),
      );
    }
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

  socket.on('setPlayerReady', (gameId) => {
    // Set the player status to lobby ready
    updatePlayer(socket.id, { status: playerStatus.inLobbyReady });

    // Get the player
    const player = getPlayer(socket.id);

    // Send the updated current player
    socket.emit('sendCurrentPlayer', player);

    // Send the new data related to the game
    io.in(gameId).emit('sendGame', getGame(gameId));
  });

  socket.on('disconnect', () => {
    // Get the player
    const player = getPlayer(socket.id);

    // Get the player game id
    const gameId = player.game.id;

    // Only if the player was in a game
    if (gameId) {
      // Remove the current player from the game player list
      removePlayerFromGame(gameId, socket.id);

      // Get the game
      const game = getGame(gameId);

      // Only if the game is still existing
      if (game) {
        // Send the game data to every players that are still in the game
        io.in(gameId).emit('sendGame', getGame(gameId));

        // Send a notification about this
        io.in(gameId).emit(
          'sendChatMessageToGame',
          buildChatNotification(`${player.nickname} left the game`),
        );
      }
    }

    // Remove the player from the player list
    removePlayer(socket.id);
  });
});

app.get('/*', (request, response) => {
  response.sendFile('dist/index.html');
});

server.listen(port, () => console.log(`Listening on port ${port}`));
