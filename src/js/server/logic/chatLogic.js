const buildChatMessage = (playerId, message) => {
  const chatMessage = {
    userId: playerId,
    content: message,
    date: new Date(),
  };

  return chatMessage;
};

module.exports = { buildChatMessage };
