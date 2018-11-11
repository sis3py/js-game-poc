import React from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Page from '../../common/component/page';
import GamesList from './gameList';
import { joinGameStyle } from '../style/style';

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
    const { classes } = this.props;
    const { joinedGameId, games } = this.state;
    if (joinedGameId) {
      return <Redirect to={`/lobby/${joinedGameId}`} />;
    }
    return (
      <Page>
        <div className={classes.panel}>
          <GamesList games={games} joinGame={this.joinGame} />
          <Button
            className={classes.refreshButton}
            size="large"
            color="primary"
            variant="contained"
            onClick={this.getAllGames}
          >
            Refresh
          </Button>
        </div>
      </Page>
    );
  }
}

export default withStyles(joinGameStyle)(JoinGamePage);
