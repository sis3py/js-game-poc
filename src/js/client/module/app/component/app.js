import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';
import CreateGamePage from '../../createGame/component/createGamePage';
import JoinGamePage from '../../joinGame/component/joinGamePage';
import OptionsPage from '../../options/component/optionsPage';
import TitlePage from '../../title/component/titlePage';
import { serverAdress } from '../../../../configuration/configuration';
import '../../../../../scss/main.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      socket: null,
    };
    this.updateNickName = this.updateNickName.bind(this);
  }

  componentDidMount() {
    this.connectSocket();
  }

  connectSocket() {
    try {
      console.log('connexion au serveur socket');
      this.setState({
        socket: io.connect(
          serverAdress,
          {
            transports: ['websocket'],
            reconnectionAttempts: 15,
          },
        ),
      });
    } catch (err) {
      console.log(err);
    }
  }

  updateNickName(e) {
    this.setState({ nickname: e.target.value });
  }

  render() {
    const { socket, nickname } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={TitlePage} />
          <Route
            path="/create"
            render={() => <CreateGamePage socket={socket} nickname={nickname} />}
          />
          <Route path="/join" render={() => <JoinGamePage socket={socket} nickname={nickname} />} />
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
