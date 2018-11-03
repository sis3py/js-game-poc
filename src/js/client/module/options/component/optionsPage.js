<<<<<<< HEAD
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class OptionsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: props.currentPlayer.nickname,
    };
    this.updateNickName = this.updateNickName.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  updateNickName(e) {
    this.setState({ nickname: e.target.value });
  }

  saveChanges() {
    const { nickname } = this.state;
    const { socketManager, currentPlayer } = this.props;
    socketManager.updateCurrentPlayer({ ...currentPlayer, nickname });
  }

  render() {
    const { nickname } = this.state;
    return (
      <div>
        <div>
          <span>Nickname</span>
          <TextField type="text" label="Nickname" onChange={this.updateNickName} value={nickname} />
          <Button size="large" color="primary" variant="contained" onClick={this.saveChanges}>
            Apply
          </Button>
        </div>
        <div>
          <Button component={Link} to="/" size="large" color="secondary" variant="contained">
            Back
          </Button>
        </div>
      </div>
    );
  }
}
=======
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
>>>>>>> e7c6a4c47281a2ff81148d1af4a289d3aef8ab9e

export default OptionsPage;
