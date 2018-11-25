import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { currentPlayerUIGridItemStyle } from '../style/style';
import User from '../../common/component/user';
import { styleArrangement } from '../../../../enum/styleArrangement';

const CurrentPlayerUIGridItem = ({ player, backgroundColor, classes }) => (
  <div className={classes.currentPlayerUIGridItem} style={{ background: backgroundColor }}>
    <User user={player} arrangement={styleArrangement.column} />
  </div>
);

export default withStyles(currentPlayerUIGridItemStyle)(CurrentPlayerUIGridItem);
