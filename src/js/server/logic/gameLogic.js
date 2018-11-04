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
    players: { [creatorId]: { id: creatorId, position: 1, ...players[creatorId] } },
    nbPlayers: 1,
  };

  return gameId;
};

// Add a player to an existing game
const addPlayerToGame = (gameId, playerId) => {
  // Increase the number of players
  games[gameId].nbPlayers = Object.keys(games[gameId].players).length + 1;

  // Add the current player to the game players object
  games[gameId].players = {
    ...games[gameId].players,
    playerId: { id: playerId, position: games[gameId].nbPlayers, ...players[playerId] },
  };
};

const removePlayerFromGame = (gameId, playerId) => {
  // Decrease the number of players
  games[gameId].nbPlayers = games[gameId].players - 1;

  // Remove the current player to the game player object
  delete games[gameId].players[playerId];

  // If no more players, the game has to be deleted
  if (games[gameId].nbPlayers === 0) {
    delete games[gameId];
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
};
