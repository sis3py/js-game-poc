const { players } = require('../database/data');
const { getRandomInt } = require('../../helper/random');
const { playerStatus } = require('../../enum/playerStatus');
const { updatePlayerFromGame } = require('./gameLogic');

const generateDefaultNickname = () => `player-${getRandomInt(1, 100000)}`;

const addPlayer = (playerId) => {
  players[playerId] = {
    id: playerId,
    nickname: generateDefaultNickname(),
    game: { id: undefined },
    status: playerStatus.online,
  };
};

const removePlayer = (playerId) => {
  delete players[playerId];
};

const getPlayer = playerId => players[playerId];

const updatePlayer = (playerId, data) => {
  // Update the player data
  players[playerId] = { ...players[playerId], ...data };

  // Update the game data
  updatePlayerFromGame(players[playerId]);
};

module.exports = {
  addPlayer,
  removePlayer,
  getPlayer,
  updatePlayer,
};
