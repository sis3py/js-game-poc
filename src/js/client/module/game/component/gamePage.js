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
    console.log(gameId);
    socketManager.getGame(gameId);
  }

  componentWillUnmount() {
    const { gameId, socketManager } = this.props;
    socketManager.leaveGame(gameId);
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
          <Game socketManager={socketManager} />
        </div>
        <div className={classes.rightPanel}>
          <Chat socketManager={socketManager} roomId={gameId} colorByPlayer={colorByPlayer} />
        </div>
      </Page>
    );
  }
}

export default withStyles(gameStyle)(GamePage);
