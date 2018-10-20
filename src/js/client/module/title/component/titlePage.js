import React from 'react';
import { Link } from 'react-router-dom';

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
);

export default TitlePage;
