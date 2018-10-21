import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class CreateGamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameName: '',
      isGameCreated: false,
    };
    this.createGame = this.createGame.bind(this);
    this.updateGameName = this.updateGameName.bind(this);
  }

  updateGameName(e) {
    this.setState({ gameName: e.target.value });
  }

  createGame() {
    const { networkManager } = this.props;
    const { gameName } = this.state;
    networkManager.joinGame(gameName);
    this.setState({ isGameCreated: true });
  }

  render() {
    const { isGameCreated } = this.state;
    if (isGameCreated) {
      return <Redirect to="/lobby" />;
    }
    const { gameName } = this.state;
    const { nickname } = this.props;
    return (
      <div>
        <div>
          <span>Create game</span>
          <input type="text" value={gameName} onChange={this.updateGameName} />
          <input type="button" value="OK" onClick={this.createGame} />
          <div>{nickname}</div>
        </div>
        <div>
          <Link to="/">Back</Link>
        </div>
      </div>
    );
  }
}

export default CreateGamePage;
