import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Chat from '../../chat/component/chat';

class LobbyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGameLaunched: false,
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
  }

  renderPlayers() {
    const { players } = this.state;
    return players.map(p => <div key={p.id}>{p.nickname}</div>);
  }

  render() {
    const { networkManager, name } = this.props;
    const { isGameLaunched } = this.state;
    if (isGameLaunched) {
      return <Redirect to="/game" />;
    }
    return (
      <div>
        <div>{name}</div>
        <div>{this.renderPlayers()}</div>
        <Chat networkManager={networkManager} />
        <Link to="/">Leave lobby</Link>
      </div>
    );
  }
}

export default LobbyPage;
