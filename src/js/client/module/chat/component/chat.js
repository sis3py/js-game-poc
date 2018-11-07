import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Message from '../classes/message';
import { chatStyle } from '../style/style';
import { messageType } from '../../../../enum/messageType';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentMessage: '',
    };
    this.onKeyPress = this.onKeyPress.bind(this);
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

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.sendChatMessage();
    }
  }

  sendChatMessage() {
    const { socketManager, roomId } = this.props;
    const { currentMessage } = this.state;
    socketManager.sendChatMessage(roomId, currentMessage);
    this.setState({ currentMessage: '' });
  }

  updateMessages(message) {
    const { messages } = this.state;
    this.setState({
      messages: [
        ...messages,
        new Message(message.content, message.author, message.date, message.type),
      ],
    });
  }

  renderMessages() {
    const { classes } = this.props;
    const { messages } = this.state;
    return messages.map((message, index) => {
      switch (message.type) {
        case messageType.standard:
          return this.renderStandardMessage(index, classes, message);
        case messageType.notification:
        case messageType.alert:
          return Chat.renderNotificationMessage(index, classes, message);
        default:
          throw new Error(`Message type not handled (${message.type})`);
      }
    });
  }

  static renderNotificationMessage(key, classes, message) {
    return (
      <div key={key} className={`${classes.message} ${classes.notification}`}>
        <div className={classes.date}>{`[${message.formattedDate()}]`}</div>
        <div>{message.content}</div>
      </div>
    );
  }

  renderStandardMessage(key, classes, message) {
    const { colorByPlayer } = this.props;
    return (
      <div key={key} className={classes.message}>
        <div className={classes.date}>{`[${message.formattedDate()}]`}</div>
        <div className={classes.author} style={{ color: colorByPlayer[message.author.id] }}>
          {`${message.author.nickname}:`}
        </div>
        <div className={classes.content}>{message.content}</div>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const { currentMessage } = this.state;
    return (
      <Paper className={classes.chat}>
        <div className={classes.messages}>{this.renderMessages()}</div>
        <div className={classes.actions}>
          <TextField
            className={classes.textfield}
            type="text"
            multiline
            placeholder="Enter message..."
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
            value={currentMessage}
          />
          <Button
            className={classes.button}
            size="large"
            color="primary"
            variant="contained"
            onClick={this.sendChatMessage}
          >
            Send
          </Button>
        </div>
      </Paper>
    );
  }
}

export default withStyles(chatStyle)(Chat);
