import React from 'react';
import { Link } from 'react-router-dom';

const OptionsPage = ({ nickname, updateNickName }) => (
  <div>
    <div>
      <span>Nickname</span>
      <input type="text" value={nickname} onChange={updateNickName} />
    </div>
    <div>
      <Link to="/">Back</Link>
    </div>
  </div>
);

export default OptionsPage;
