export const createGame = (socket, roomName) => {
    socket.emit('createGame', roomName);
};