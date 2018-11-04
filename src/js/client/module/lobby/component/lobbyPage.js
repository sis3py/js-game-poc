import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Chat from '../../chat/component/chat';

class LobbyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGameLaunched: false,
      gameName: '',
      players: {},
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
  }

  renderPlayers() {
    const { players } = this.state;
    return Object.keys(players).map(playerId => (
      <div key={playerId}>{players[playerId].nickname}</div>
    ));
  }

  render() {
    const { socketManager, gameId } = this.props;
    const { isGameLaunched, gameName, players } = this.state;
    if (isGameLaunched) {
      return <Redirect to="/game" />;
    }
    return (
      <div>
        <div>{gameName}</div>
        <div>{this.renderPlayers()}</div>
        <Chat socketManager={socketManager} roomId={gameId} players={players} />
        <Button component={Link} to="/" size="large" color="secondary" variant="contained">
          Leave lobby
        </Button>
        <Button component={Link} to="/game" size="large" color="secondary" variant="contained">
          Play
        </Button>
      </div>
    );
  }
}

export default LobbyPage;
