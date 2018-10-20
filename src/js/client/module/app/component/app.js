import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateGamePage from '../../createGame/component/createGamePage';
import JoinGamePage from '../../joinGame/component/joinGamePage';
import OptionsPage from '../../options/component/optionsPage';
import TitlePage from '../../title/component/titlePage';
import LobbyPage from '../../lobby/component/lobbyPage';
import GamePage from '../../game/component/gamePage';
import { generateDefaultNickname } from '../logic/appLogic';
import '../../../../../scss/main.scss';
import NetworkManager from '../../../network/networkManager';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: generateDefaultNickname(),
      networkManager: new NetworkManager(),
    };
    this.updateNickName = this.updateNickName.bind(this);
  }

  componentDidMount() {
    const { networkManager, nickname } = this.state;
    networkManager.sendPlayerData({ nickname });
  }

  updateNickName(e) {
    const { networkManager } = this.state;
    this.setState(
      { nickname: e.target.value },
      networkManager.sendPlayerData({ nickname: e.target.value }),
    );
  }

  render() {
    const { networkManager, nickname } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={TitlePage} />
          <Route
            path="/create"
            render={() => <CreateGamePage networkManager={networkManager} nickname={nickname} />}
          />
          <Route
            path="/join"
            render={() => <JoinGamePage networkManager={networkManager} nickname={nickname} />}
          />
          <Route path="/lobby" render={() => <LobbyPage networkManager={networkManager} />} />
          <Route path="/game" render={() => <GamePage networkManager={networkManager} />} />
          <Route
            path="/options"
            render={() => <OptionsPage updateNickName={this.updateNickName} nickname={nickname} />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
