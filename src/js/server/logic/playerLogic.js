const { players } = require('../database/data');
const { getRandomInt } = require('../../helper/random');
const { playerStatus } = require('../../enum/playerStatus');

const generateDefaultNickname = () => `player-${getRandomInt(1, 100000)}`;

const addPlayer = (playerId) => {
  players[playerId] = {
    id: playerId,
    nickname: generateDefaultNickname(),
    game: { id: undefined },
    status: playerStatus.online,
    position: { x: 0, y: 0 },
  };
};

const removePlayer = (playerId) => {
  delete players[playerId];
};

const getPlayer = playerId => players[playerId];

const updatePlayer = (playerId, data) => {
  // Update the player data
  players[playerId] = { ...players[playerId], ...data };
};

module.exports = {
  addPlayer,
  removePlayer,
  getPlayer,
  updatePlayer,
};
