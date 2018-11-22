import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { optionsStyle } from '../style/style';
import Page from '../../common/component/page';

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
    const { socketManager } = this.props;
    socketManager.updateCurrentPlayerSettings({ nickname });
  }

  render() {
    const { nickname } = this.state;
    return (
      <Page>
        <div>
          <span>Nickname</span>
          <TextField type="text" label="Nickname" onChange={this.updateNickName} value={nickname} />
          <Button size="large" color="primary" variant="contained" onClick={this.saveChanges}>
            Apply
          </Button>
        </div>
      </Page>
    );
  }
}

export default withStyles(optionsStyle)(OptionsPage);
