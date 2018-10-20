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

  createGame(name) {
    this.socket.emit('createGame', name);
  }

  sendPlayerData(playerData) {
    this.socket.emit('sendPlayerData', playerData);
  }

  sendChatMessage(chatMessage) {
    this.socket.emit('sendChatMessage', chatMessage);
  }

  handleMessageReceived(onMessageReceived) {
    console.log('handleMessageReceived');
    this.socket.on('sendChatMessageToGame', onMessageReceived);
  }
}

export default NetworkManager;
