const { guid } = require('../../helper/guid');
const { games, players } = require('../database/data');

// Create a game
const createGame = (gameName, creatorId) => {
  // Generate an id for this game
  const gameId = guid();

  // Add the current room as game
  games[gameId] = { id: gameId, name: gameName, players: [creatorId] };

  return gameId;
};

// Add a player to an existing game
const addPlayerToGame = (gameId, playerId) => {
  games[gameId].players = [...games[gameId].players, playerId];
};

const removePlayerFromGame = (gameId, playerId) => {
  // Remove the current player to the game player list
  games[gameId].players = games[gameId].players.filter(id => id !== playerId);

  // If no more players, the game has to be deleted
  if (games[gameId].players.length === 0) {
    delete games[gameId];
  }
};

const getAvailableGames = () => games;

const getGame = (gameId) => {
  const game = {
    ...games[gameId],
    players: games[gameId].players.map(id => ({
      id,
      nickname: players[id].nickname,
    })),
  };

  return game;
};

module.exports = {
  createGame,
  addPlayerToGame,
  removePlayerFromGame,
  getAvailableGames,
  getGame,
};
