import React from 'react';
<<<<<<< HEAD
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
=======
>>>>>>> e7c6a4c47281a2ff81148d1af4a289d3aef8ab9e
import Message from '../classes/message';

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

<<<<<<< HEAD
  componentDidMount() {
    const { socketManager } = this.props;
    socketManager.registerChatMessageReceived(this.updateMessages);
  }

  componentWillUnmount() {
    const { socketManager } = this.props;
    socketManager.unregisterChatMessageReceived();
=======
  componentWillMount() {
    const { networkManager } = this.props;
    networkManager.unregisterChatMessageReceived();
  }

  componentDidMount() {
    const { networkManager } = this.props;
    networkManager.registerChatMessageReceived(this.updateMessages);
>>>>>>> e7c6a4c47281a2ff81148d1af4a289d3aef8ab9e
  }

  onChange(e) {
    this.setState({ currentMessage: e.target.value });
  }

  sendChatMessage() {
<<<<<<< HEAD
    const { socketManager, roomId } = this.props;
    const { currentMessage } = this.state;
    socketManager.sendChatMessage(roomId, currentMessage);
=======
    const { networkManager } = this.props;
    const { currentMessage } = this.state;
    networkManager.sendChatMessage(currentMessage);
>>>>>>> e7c6a4c47281a2ff81148d1af4a289d3aef8ab9e
    this.setState({ currentMessage: '' });
  }

  updateMessages(message) {
    const { messages } = this.state;
    this.setState({
      messages: [...messages, new Message(message.content, message.author.nickname, message.date)],
    });
  }

  renderMessages() {
    const { messages } = this.state;
    return messages.map((m, i) => (
      <div key={i}>
        <div>{m.author}</div>
        <div>{m.content}</div>
        <div>{m.formattedDate()}</div>
      </div>
    ));
  }

  render() {
    const { currentMessage } = this.state;
    return (
      <div>
        <div>{this.renderMessages()}</div>
<<<<<<< HEAD
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
=======
        <textarea onChange={this.onChange} value={currentMessage} />
        <input type="button" value="Send" onClick={this.sendChatMessage} />
>>>>>>> e7c6a4c47281a2ff81148d1af4a289d3aef8ab9e
      </div>
    );
  }
}

export default Chat;
