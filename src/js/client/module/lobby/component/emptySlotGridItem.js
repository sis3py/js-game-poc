import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { emptySlotGridItemStyle } from '../style/style';

const EmptySlotGridItem = ({ classes }) => <Paper className={classes.emptySlotGridItem} />;

export default withStyles(emptySlotGridItemStyle)(EmptySlotGridItem);
