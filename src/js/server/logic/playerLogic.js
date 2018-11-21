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
    coordinates: { x: 0, y: 0 },
  };
};

const removePlayer = (playerId) => {
  delete players[playerId];
};

const getPlayer = playerId => players[playerId];

const updatePlayerSettings = (playerId, nickname) => {
  players[playerId].nickname = nickname;
};

const updatePlayerGameData = (playerId, gameId, status) => {
  players[playerId].game = { id: gameId };
  players[playerId].status = status;
};

const updatePlayerStatus = (playerId, status) => {
  players[playerId].status = status;
};

const updatePlayerCoordinates = (playerId, x, y, direction) => {
  players[playerId].coordinates = {
    x,
    y,
    direction,
  };
};

module.exports = {
  addPlayer,
  removePlayer,
  getPlayer,
  updatePlayerSettings,
  updatePlayerGameData,
  updatePlayerStatus,
  updatePlayerCoordinates,
};
