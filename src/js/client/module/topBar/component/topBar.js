import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import User from './user';

const TopBar = ({ path, currentPlayer }) => (
  <AppBar position="static">
    <Tabs value={path}>
      <Tab label="Home" value="/" component={Link} to="/" />
      <Tab label="Create game" value="/create" component={Link} to="/create" />
      <Tab label="Join game" value="/join" component={Link} to="/join" />
      <Tab label="Options" value="/options" component={Link} to="/options" />
    </Tabs>
    <User user={currentPlayer} />
  </AppBar>
);

export default TopBar;
