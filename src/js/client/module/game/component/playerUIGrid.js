import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { playerUIGridStyle } from '../style/style';
import { getColorByPlayer } from '../../common/logic/commonLogic';
import CurrentPlayerUIGridItem from './currentPlayerUIGridItem';
import PlayerUIGridItem from './playerUIGridItem';

class PlayerUIGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      socketManager, gameId, currentPlayer, players, classes,
    } = this.props;
    const colorByPlayer = getColorByPlayer(players);
    return (
      <div className={classes.playerUIGrid}>
        <CurrentPlayerUIGridItem player={currentPlayer} color={colorByPlayer[currentPlayer.id]} />
        {players.filter(player => player.id !== currentPlayer.id).map((player, position) => (
          <PlayerUIGridItem key={position} player={player} color={colorByPlayer[player.id]} />
        ))}
      </div>
    );
  }
}

export default withStyles(playerUIGridStyle)(PlayerUIGrid);
