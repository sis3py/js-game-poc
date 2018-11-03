import React from 'react';
import { Link, Redirect } from 'react-router-dom';
<<<<<<< HEAD
import Button from '@material-ui/core/Button';
=======
>>>>>>> e7c6a4c47281a2ff81148d1af4a289d3aef8ab9e
import Chat from '../../chat/component/chat';

class LobbyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGameLaunched: false,
<<<<<<< HEAD
      gameName: '',
      players: [],
    };
    this.updateGame = this.updateGame.bind(this);
  }

  componentDidMount() {
    const { gameId, socketManager } = this.props;
    socketManager.getGame(gameId);
    socketManager.registerGameReceived(this.updateGame);
  }

  componentWillUnmount() {
    const { gameId, socketManager } = this.props;
    socketManager.leaveGame(gameId);
    socketManager.unregisterGameReceived();
  }

  updateGame(game) {
    this.setState({ gameName: game.name, players: game.players });
=======
      players: [],
    };
    this.updatePlayers = this.updatePlayers.bind(this);
  }

  componentDidMount() {
    const { name, networkManager } = this.props;
    networkManager.getPlayersInGame(name);
    networkManager.registerPlayersInGameReceived(this.updatePlayers);
  }

  componentWillUnmount() {
    const { name, networkManager } = this.props;
    networkManager.leaveGame(name);
    networkManager.unregisterPlayersInGameReceived();
  }

  updatePlayers(players) {
    this.setState({ players });
>>>>>>> e7c6a4c47281a2ff81148d1af4a289d3aef8ab9e
  }

  renderPlayers() {
    const { players } = this.state;
    return players.map(p => <div key={p.id}>{p.nickname}</div>);
  }

  render() {
<<<<<<< HEAD
    const { socketManager, gameId, currentPlayer } = this.props;
    const { isGameLaunched, gameName } = this.state;
=======
    const { networkManager, name } = this.props;
    const { isGameLaunched } = this.state;
>>>>>>> e7c6a4c47281a2ff81148d1af4a289d3aef8ab9e
    if (isGameLaunched) {
      return <Redirect to="/game" />;
    }
    return (
      <div>
<<<<<<< HEAD
        <div>{gameName}</div>
        <div>{currentPlayer.nickname}</div>
        <div>{this.renderPlayers()}</div>
        <Chat socketManager={socketManager} roomId={gameId} />
        <Button component={Link} to="/" size="large" color="secondary" variant="contained">
          Leave lobby
        </Button>
        <Button component={Link} to="/game" size="large" color="secondary" variant="contained">
          Play
        </Button>
=======
        <div>{name}</div>
        <div>{this.renderPlayers()}</div>
        <Chat networkManager={networkManager} />
        <Link to="/">Leave lobby</Link>
>>>>>>> e7c6a4c47281a2ff81148d1af4a289d3aef8ab9e
      </div>
    );
  }
}

export default LobbyPage;
