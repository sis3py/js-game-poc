import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import TopBar from "../../topBar/component/topBar";
import CreateGamePage from "../../createGame/component/createGamePage";
import JoinGamePage from "../../joinGame/component/joinGamePage";
import OptionsPage from "../../options/component/optionsPage";
import LobbyPage from "../../lobby/component/lobbyPage";
import GamePage from "../../game/component/gamePage";
import "../../../../../scss/main.scss";
import SocketManager from "../../../manager/socketManager";
import { theme } from "../style/style";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socketManager: new SocketManager(),
      currentPlayer: {}
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
                <TopBar
                  path={location.pathname}
                  currentPlayer={currentPlayer}
                />
                <Switch>
                  <Route
                    path="/create"
                    render={() => (
                      <CreateGamePage socketManager={socketManager} />
                    )}
                  />
                  <Route
                    path="/join"
                    render={() => (
                      <JoinGamePage
                        socketManager={socketManager}
                        currentPlayer={currentPlayer}
                      />
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
                      <GamePage
                        socketManager={socketManager}
                        currentPlayer={currentPlayer}
                      />
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
    );
  }
}

export default App;
