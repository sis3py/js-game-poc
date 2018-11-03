import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import GamesList from './gameList';

class JoinGamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      joinedGameId: undefined,
    };
    this.updateGames = this.updateGames.bind(this);
    this.getAllGames = this.getAllGames.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }

  componentDidMount() {
    const { socketManager } = this.props;
    socketManager.registerAllGamesReceived(this.updateGames);
    this.getAllGames();
  }

  componentWillUnmount() {
    const { socketManager } = this.props;
    socketManager.unregisterAllGamesReceived();
  }

  getAllGames() {
    const { socketManager } = this.props;
    socketManager.getAllGames();
  }

  updateGames(games) {
    this.setState({ games: Object.keys(games).map(gameId => games[gameId]) });
  }

  joinGame(gameId) {
    const { socketManager } = this.props;
    socketManager.joinGame(gameId);
    this.setState({ joinedGameId: gameId });
  }

  render() {
    const { joinedGameId, games } = this.state;
    const { currentPlayer } = this.props;
    if (joinedGameId) {
      return <Redirect to={`/lobby/${joinedGameId}`} />;
    }
    return (
      <div>
        <div>{currentPlayer.nickname}</div>
        <GamesList games={games} joinGame={this.joinGame} />
        <Button size="large" color="primary" variant="contained" onClick={this.getAllGames}>
          Refresh
        </Button>
        <div>
          <Button component={Link} to="/" size="large" color="secondary" variant="contained">
            Back
          </Button>
        </div>
      </div>
    );
  }
}

export default JoinGamePage;
