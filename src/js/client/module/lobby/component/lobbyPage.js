import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Chat from '../../chat/component/chat';

class LobbyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGameLaunched: false,
    };
  }

  render() {
    const { networkManager } = this.props;
    const { isGameLaunched } = this.state;
    if (isGameLaunched) {
      return <Redirect to="/game" />;
    }
    return (
      <div>
        <Chat networkManager={networkManager} />
        <Link to="/">Leave lobby</Link>
      </div>
    );
  }
}

export default LobbyPage;
