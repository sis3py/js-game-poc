import React from 'react';
import { Link } from 'react-router-dom';
import { createGame } from '../logic/createGameLogic';

class CreateGamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameName: '',
    };
    this.createGame = this.createGame.bind(this);
    this.updateGameName = this.updateGameName.bind(this);
  }

  updateGameName(e) {
    this.setState({ gameName: e.target.value });
  }

  createGame() {
    const { socket, gameName } = this.state;
    createGame(socket, gameName);
  }

  render() {
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
