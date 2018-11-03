import React from 'react';
import { Link, Redirect } from 'react-router-dom';
<<<<<<< HEAD
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
=======
>>>>>>> e7c6a4c47281a2ff81148d1af4a289d3aef8ab9e

class CreateGamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameName: '',
<<<<<<< HEAD
      createdGameId: undefined,
    };
    this.createGame = this.createGame.bind(this);
    this.updateGameName = this.updateGameName.bind(this);
    this.updateGameId = this.updateGameId.bind(this);
  }

  componentDidMount() {
    const { socketManager } = this.props;
    socketManager.registerGameIdReceived(this.updateGameId);
  }

  componentWillUnmount() {
    const { socketManager } = this.props;
    socketManager.unregisterGameIdReceived();
=======
      createdGame: undefined,
    };
    this.createGame = this.createGame.bind(this);
    this.updateGameName = this.updateGameName.bind(this);
>>>>>>> e7c6a4c47281a2ff81148d1af4a289d3aef8ab9e
  }

  updateGameName(e) {
    this.setState({ gameName: e.target.value });
  }

<<<<<<< HEAD
  updateGameId(gameId) {
    this.setState({ createdGameId: gameId });
  }

  createGame() {
    const { socketManager } = this.props;
    const { gameName } = this.state;
    socketManager.createGame(gameName);
  }

  render() {
    const { createdGameId } = this.state;
    if (createdGameId) {
      return <Redirect to={`/lobby/${createdGameId}`} />;
    }
    const { gameName } = this.state;
    return (
      <Grid container alignContent="center" alignItems="center" spacing={16}>
        <Grid item xs={6}>
          <FormLabel>Create Game</FormLabel>
          <TextField
            type="text"
            label="Game name"
            onChange={this.updateGameName}
            value={gameName}
          />
        </Grid>
        <Grid item xs={6}>
          <Button size="large" color="primary" variant="contained" onClick={this.createGame}>
            Create
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button component={Link} to="/" size="large" color="secondary" variant="contained">
            Back
          </Button>
        </Grid>
      </Grid>
=======
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
>>>>>>> e7c6a4c47281a2ff81148d1af4a289d3aef8ab9e
    );
  }
}

export default CreateGamePage;
