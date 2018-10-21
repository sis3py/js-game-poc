import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class CreateGamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameName: '',
      createdGame: undefined,
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
    this.setState({ createdGame: gameName });
  }

  render() {
    const { createdGame } = this.state;
    if (createdGame) {
      return <Redirect to={`/lobby/${createdGame}`} />;
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
