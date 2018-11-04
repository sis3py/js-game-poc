const { messageType } = require('../../enum/messageType');
const { players } = require('../database/data');

const buildChatMessage = (playerId, message) => {
  const chatMessage = {
    author: players[playerId],
    content: message,
    date: new Date(),
    type: messageType.standard,
  };

  return chatMessage;
};

const buildChatNotification = (message) => {
  const chatNotification = {
    content: message,
    date: new Date(),
    type: messageType.notification,
  };

  return chatNotification;
};

const buildChatAlert = (message) => {
  const chatAlert = {
    content: message,
    date: new Date(),
    type: messageType.alert,
  };

  return chatAlert;
};

module.exports = { buildChatMessage, buildChatNotification, buildChatAlert };
