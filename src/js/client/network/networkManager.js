import io from 'socket.io-client';
import { serverAdress } from '../../configuration/configuration';

class NetworkManager {
  constructor() {
    try {
      this.socket = io.connect(
        serverAdress,
        {
          transports: ['websocket'],
          reconnectionAttempts: 15,
        },
      );
    } catch (err) {
      console.log(err);
    }
  }

  joinGame(name) {
    this.socket.emit('joinGame', name);
  }

  sendPlayerData(playerData) {
    this.socket.emit('sendPlayerData', playerData);
  }

  sendChatMessage(chatMessage) {
    this.socket.emit('sendChatMessage', chatMessage);
  }

  registerChatMessageReceived(callback) {
    this.socket.on('sendChatMessageToGame', callback);
  }

  unregisterChatMessageReceived() {
    this.socket.off('sendChatMessageToGame');
  }

  getAllGames() {
    this.socket.emit('getAllGames');
  }

  registerAllGamesReceived(callback) {
    this.socket.on('sendAllGames', callback);
  }

  unregisterAllGamesReceived() {
    this.socket.off('sendAllGames');
  }
}

export default NetworkManager;
