const playerStatus = Object.freeze({
  offline: 1,
  online: 2,
  inLobbyNotReady: 3,
  inLobbyReady: 4,
  inGame: 5,
});

module.exports = { playerStatus };
