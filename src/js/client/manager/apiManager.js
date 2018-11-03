import 'whatwg-fetch';
import { serverAdress } from '../../configuration/configuration';

class ApiManager {
  static getPlayer(playerId) {
    fetch(`${serverAdress}/api/v1/player/${playerId}`)
      .then(response => response.json())
      .then((json) => {
        console.log(json);
      });
  }
}

export default ApiManager;
