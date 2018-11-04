import React from 'react';
import { Link } from 'react-router-dom';
import MaterialTabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import { tabsStyle } from '../style/style';

const Tabs = ({ path, classes }) => (
  <MaterialTabs value={path} className={classes.tabs}>
    <Tab label="Home" value="/" component={Link} to="/" />
    <Tab label="Create game" value="/create" component={Link} to="/create" />
    <Tab label="Join game" value="/join" component={Link} to="/join" />
    <Tab label="Options" value="/options" component={Link} to="/options" />
  </MaterialTabs>
);

export default withStyles(tabsStyle)(Tabs);
