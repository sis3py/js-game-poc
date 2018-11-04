import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Message from '../classes/message';
import { chatStyle } from '../style/style';
import playerColors from '../../../enum/playerColors';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentMessage: '',
    };
    this.onChange = this.onChange.bind(this);
    this.sendChatMessage = this.sendChatMessage.bind(this);
    this.updateMessages = this.updateMessages.bind(this);
  }

  componentDidMount() {
    const { socketManager } = this.props;
    socketManager.registerChatMessageReceived(this.updateMessages);
  }

  componentWillUnmount() {
    const { socketManager } = this.props;
    socketManager.unregisterChatMessageReceived();
  }

  onChange(e) {
    this.setState({ currentMessage: e.target.value });
  }

  sendChatMessage() {
    const { socketManager, roomId } = this.props;
    const { currentMessage } = this.state;
    socketManager.sendChatMessage(roomId, currentMessage);
    this.setState({ currentMessage: '' });
  }

  updateMessages(message) {
    const { players } = this.props;
    const { messages } = this.state;
    this.setState({
      messages: [...messages, new Message(message.content, players[message.userId], message.date)],
    });
  }

  renderMessages() {
    const { classes } = this.props;
    const { messages } = this.state;
    return messages.map((m, i) => (
      <div key={i} className={classes.message}>
        <div className={classes.date}>{`[${m.formattedDate()}]`}</div>
        <div className={classes.author} style={{ color: playerColors[m.author.position] }}>
          {`${m.author.nickname}:`}
        </div>
        <div className={classes.content}>{m.content}</div>
      </div>
    ));
  }

  render() {
    const { classes } = this.props;
    const { currentMessage } = this.state;
    return (
      <div className={classes.chat}>
        <div className={classes.messages}>{this.renderMessages()}</div>
        <div className={classes.actions}>
          <TextField
            type="text"
            multiline
            placeholder="Enter message..."
            onChange={this.onChange}
            value={currentMessage}
          />
          <Button size="large" color="primary" variant="contained" onClick={this.sendChatMessage}>
            Send
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(chatStyle)(Chat);
