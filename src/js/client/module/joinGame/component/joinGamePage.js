import React from 'react';
import { Link, Redirect } from 'react-router-dom';
<<<<<<< HEAD
import Button from '@material-ui/core/Button';
import GamesList from './gameList';
=======
>>>>>>> e7c6a4c47281a2ff81148d1af4a289d3aef8ab9e

class JoinGamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
<<<<<<< HEAD
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
=======
      joinedGame: undefined,
    };
    this.updateGames = this.updateGames.bind(this);
    this.getAllGames = this.getAllGames.bind(this);
    this.renderGames = this.renderGames.bind(this);
  }

  componentWillMount() {
    const { networkManager } = this.props;
    networkManager.unregisterAllGamesReceived();
  }

  componentDidMount() {
    const { networkManager } = this.props;
    networkManager.registerAllGamesReceived(this.updateGames);
    this.getAllGames();
  }

  getAllGames() {
    const { networkManager } = this.props;
    networkManager.getAllGames();
  }

  updateGames(games) {
    this.setState({ games: Object.keys(games) });
  }

  joinGame(game) {
    const { networkManager } = this.props;
    networkManager.joinGame(game);
    this.setState({ joinedGame: game });
  }

  renderGames() {
    const { games } = this.state;
    return games.map(g => (
      <div key={g} onClick={() => this.joinGame(g)} role="button">
        {g}
      </div>
    ));
  }

  render() {
    const { joinedGame } = this.state;
    if (joinedGame) {
      return <Redirect to={`/lobby/${joinedGame}`} />;
    }
    return (
      <div>
        <div>{this.renderGames()}</div>
        <input type="button" value="Refresh" onClick={this.getAllGames} />
        <div>
          <Link to="/">Back</Link>
>>>>>>> e7c6a4c47281a2ff81148d1af4a289d3aef8ab9e
        </div>
      </div>
    );
  }
}

export default JoinGamePage;
