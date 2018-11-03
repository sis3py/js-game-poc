const { players } = require('../database/data');

const buildChatMessage = (playerId, message) => {
  const chatMessage = {
    author: players[playerId],
    content: message,
    date: new Date(),
  };

  return chatMessage;
};

module.exports = { buildChatMessage };
