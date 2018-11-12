import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Chat from '../../chat/component/chat';
import Title from './title';
import SlotGrid from './slotGrid';
import Page from '../../common/component/page';
import { lobbyStyle } from '../style/style';
import { isGameReadyToBeLaunched } from '../logic/logic';
import { getColorByPlayer } from '../../common/logic/commonLogic';
import { playerStatus } from '../../../../enum/playerStatus';

class LobbyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isGameReadyToBeLaunched: false,
      gameName: '',
      players: [],
    };
    this.setPlayerReady = this.setPlayerReady.bind(this);
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

  setPlayerReady() {
    const { socketManager, gameId } = this.props;
    socketManager.setPlayerReady(gameId);
  }

  updateGame(game) {
    this.setState({
      gameName: game.name,
      players: game.players,
      isLoading: false,
      isGameReadyToBeLaunched: isGameReadyToBeLaunched(game),
    });
  }

  render() {
    const {
      socketManager, gameId, currentPlayer, classes,
    } = this.props;
    const {
      isLoading, isGameReadyToBeLaunched, gameName, players,
    } = this.state;
    const colorByPlayer = getColorByPlayer(players);
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (isGameReadyToBeLaunched) {
      return <Redirect to={`/game/${gameId}`} />;
    }
    return (
      <Page>
        <div className={classes.leftPanel}>
          <SlotGrid players={players} colorByPlayer={colorByPlayer} />
        </div>
        <div className={classes.rightPanel}>
          <Title title={gameName} />
          <div className={classes.chat}>
            <Chat socketManager={socketManager} roomId={gameId} colorByPlayer={colorByPlayer} />
          </div>
          <div className={classes.actions}>
            <Button component={Link} to="/" size="large" color="secondary" variant="contained">
              Leave lobby
            </Button>
            {currentPlayer.status === playerStatus.inLobbyNotReady && (
              <Button
                className={classes.readyButton}
                size="large"
                color="primary"
                variant="contained"
                onClick={this.setPlayerReady}
              >
                Ready
              </Button>
            )}
          </div>
        </div>
      </Page>
    );
  }
}

export default withStyles(lobbyStyle)(LobbyPage);
