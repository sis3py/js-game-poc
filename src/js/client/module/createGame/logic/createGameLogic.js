export const createGame = (socket, gameName) => {
    socket.emit('createGame', gameName);
};