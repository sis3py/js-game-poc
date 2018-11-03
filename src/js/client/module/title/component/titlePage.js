import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const TitlePage = () => (
  <AppBar position="static">
    <Tabs value="">
      <Tab label="Create game" component={Link} to="/create" />
      <Tab label="Join game" component={Link} to="/join" />
      <Tab label="Options" component={Link} to="/options" />
    </Tabs>
  </AppBar>
=======

const TitlePage = () => (
  <div>
    <ul>
      <li>
        <Link to="/create">Create Game</Link>
      </li>
      <li>
        <Link to="/join">Join Game</Link>
      </li>
      <li>
        <Link to="/options">Options</Link>
      </li>
    </ul>
  </div>
>>>>>>> e7c6a4c47281a2ff81148d1af4a289d3aef8ab9e
);

export default TitlePage;
