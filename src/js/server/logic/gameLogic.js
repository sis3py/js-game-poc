const { guid } = require('../../helper/guid');
const { games, players } = require('../database/data');

// Create a game
const createGame = (gameName, creatorId) => {
  // Generate an id for this game
  const gameId = guid();

  // Add the current room as game
  games[gameId] = {
    id: gameId,
    name: gameName,
    players: [players[creatorId]],
    nbPlayers: 1,
  };

  return gameId;
};

// Add a player to an existing game
const addPlayerToGame = (gameId, playerId) => {
  // Increase the number of players
  games[gameId].nbPlayers += 1;

  // Add the current player to the game players array
  games[gameId].players = [...games[gameId].players, players[playerId]];
};

const removePlayerFromGame = (gameId, playerId) => {
  // Decrease the number of players
  games[gameId].nbPlayers -= 1;

  // Remove the current player to the game player array
  games[gameId].players = games[gameId].players.filter(p => p.id !== playerId);

  // If no more players, the game has to be deleted
  if (games[gameId].nbPlayers === 0) {
    delete games[gameId];
  }
};

const updatePlayerFromGame = (player) => {
  // Each time the player data are updated
  // A new player instance is created due to immutability
  // So we need to update the game with the updated player reference
  if (player.game.id) {
    games[player.game.id].players = games[player.game.id].players.map(
      p => (p.id === player.id ? player : p),
    );
  }
};

const getAvailableGames = () => games;

const getGame = gameId => games[gameId];

module.exports = {
  createGame,
  addPlayerToGame,
  removePlayerFromGame,
  getAvailableGames,
  getGame,
  updatePlayerFromGame,
};
