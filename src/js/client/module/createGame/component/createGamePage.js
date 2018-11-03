import React from "react";
import { Link, Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";

class CreateGamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameName: "",
      createdGameId: undefined
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
  }

  updateGameName(e) {
    this.setState({ gameName: e.target.value });
  }

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
          <Button
            size="large"
            color="primary"
            variant="contained"
            onClick={this.createGame}
          >
            Create
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            component={Link}
            to="/"
            size="large"
            color="secondary"
            variant="contained"
          >
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default CreateGamePage;
