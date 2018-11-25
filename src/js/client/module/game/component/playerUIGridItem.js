import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { playerUIGridItemStyle } from '../style/style';
import User from '../../common/component/user';
import { styleArrangement } from '../../../../enum/styleArrangement';

const PlayerUIGridItem = ({ player, backgroundColor, classes }) => (
  <div className={classes.playerUIGridItem} style={{ background: backgroundColor }}>
    <User user={player} arrangement={styleArrangement.column} />
  </div>
);

export default withStyles(playerUIGridItemStyle)(PlayerUIGridItem);
