import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { slotGridItemStyle } from '../style/style';
import { playerStatus } from '../../../../enum/playerStatus';
import User from '../../common/component/user';
import { styleArrangement } from '../../../../enum/styleArrangement';

const SlotGridItem = ({ player, backgroundColor, classes }) => (
  <Paper className={classes.slotGridItem} style={{ background: backgroundColor }}>
    <User user={player} arrangement={styleArrangement.column} />
    {player.status === playerStatus.inLobbyReady && (
      <i className={`material-icons ${classes.ready}`}>done</i>
    )}
  </Paper>
);

export default withStyles(slotGridItemStyle)(SlotGridItem);
