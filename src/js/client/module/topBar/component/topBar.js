import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Tabs from './tabs';
import User from './user';
import { topBarStyle } from '../style/style';

const TopBar = ({ path, currentPlayer, classes }) => (
  <AppBar position="static" className={classes.topBar}>
    <Tabs path={path} />
    <User user={currentPlayer} />
  </AppBar>
);

export default withStyles(topBarStyle)(TopBar);
