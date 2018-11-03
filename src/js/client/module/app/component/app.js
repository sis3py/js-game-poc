import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
<<<<<<< HEAD
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import TopBar from '../../topBar/component/topBar';
import CreateGamePage from '../../createGame/component/createGamePage';
import JoinGamePage from '../../joinGame/component/joinGamePage';
import OptionsPage from '../../options/component/optionsPage';
import LobbyPage from '../../lobby/component/lobbyPage';
import GamePage from '../../game/component/gamePage';
import '../../../../../scss/main.scss';
import SocketManager from '../../../manager/socketManager';
import { theme } from '../style/style';
=======
import CreateGamePage from '../../createGame/component/createGamePage';
import JoinGamePage from '../../joinGame/component/joinGamePage';
import OptionsPage from '../../options/component/optionsPage';
import TitlePage from '../../title/component/titlePage';
import LobbyPage from '../../lobby/component/lobbyPage';
import GamePage from '../../game/component/gamePage';
import { generateDefaultNickname } from '../logic/appLogic';
import '../../../../../scss/main.scss';
import NetworkManager from '../../../network/networkManager';
>>>>>>> e7c6a4c47281a2ff81148d1af4a289d3aef8ab9e

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      socketManager: new SocketManager(),
      currentPlayer: {},
    };

    this.setPlayer = this.setPlayer.bind(this);
  }

  componentDidMount() {
    const { socketManager } = this.state;
    socketManager.getCurrentPlayer();
    socketManager.registerGetCurrentPlayerReceived(this.setPlayer);
  }

  componentWillUnmount() {
    const { socketManager } = this.state;
    socketManager.unregisterGetCurrentPlayerReceived();
  }

  setPlayer(currentPlayer) {
    this.setState({ currentPlayer });
  }

  render() {
    const { socketManager, currentPlayer } = this.state;
    if (!currentPlayer) {
      return <div>Loading...</div>;
    }
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Route
            path="/"
            render={({ location }) => (
              <React.Fragment>
                <TopBar path={location.pathname} currentPlayer={currentPlayer} />
                <Switch>
                  <Route
                    path="/create"
                    render={() => <CreateGamePage socketManager={socketManager} />}
                  />
                  <Route
                    path="/join"
                    render={() => (
                      <JoinGamePage socketManager={socketManager} currentPlayer={currentPlayer} />
                    )}
                  />
                  <Route
                    path="/lobby/:gameId"
                    render={props => (
                      <LobbyPage
                        gameId={props.match.params.gameId}
                        socketManager={socketManager}
                        currentPlayer={currentPlayer}
                      />
                    )}
                  />
                  <Route
                    path="/game"
                    render={() => (
                      <GamePage socketManager={socketManager} currentPlayer={currentPlayer} />
                    )}
                  />
                  <Route
                    path="/options"
                    render={() => (
                      <OptionsPage
                        key={currentPlayer}
                        socketManager={socketManager}
                        currentPlayer={currentPlayer}
                      />
                    )}
                  />
                </Switch>
              </React.Fragment>
            )}
          />
        </BrowserRouter>
      </MuiThemeProvider>
=======
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
          <Route
            path="/lobby/:name"
            render={props => (
              <LobbyPage name={props.match.params.name} networkManager={networkManager} />
            )}
          />
          <Route path="/game" render={() => <GamePage networkManager={networkManager} />} />
          <Route
            path="/options"
            render={() => <OptionsPage updateNickName={this.updateNickName} nickname={nickname} />}
          />
        </Switch>
      </BrowserRouter>
>>>>>>> e7c6a4c47281a2ff81148d1af4a289d3aef8ab9e
    );
  }
}

export default App;
