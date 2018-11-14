import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { gameStyle } from '../style/style';
import Page from '../../common/component/page';
import Game from './game';
import Chat from '../../chat/component/chat';
import { getColorByPlayer } from '../../common/logic/commonLogic';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
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
    this.setState({
      players: game.players,
      isLoading: false,
    });
  }

  render() {
    const { socketManager, gameId, classes } = this.props;
    const { isLoading, players } = this.state;
    const colorByPlayer = getColorByPlayer(players);
    return (
      <Page>
        <div className={classes.leftPanel}>
          <Game socketManager={socketManager} gameId={gameId} />
        </div>
        <div className={classes.rightPanel}>
          <div className={classes.chat}>
            <Chat socketManager={socketManager} roomId={gameId} colorByPlayer={colorByPlayer} />
          </div>
        </div>
      </Page>
    );
  }
}

export default withStyles(gameStyle)(GamePage);
