import React from 'react';
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

  componentWillMount() {
    const { networkManager } = this.props;
    networkManager.unregisterChatMessageReceived();
  }

  componentDidMount() {
    const { networkManager } = this.props;
    networkManager.registerChatMessageReceived(this.updateMessages);
  }

  onChange(e) {
    this.setState({ currentMessage: e.target.value });
  }

  sendChatMessage() {
    const { networkManager } = this.props;
    const { currentMessage } = this.state;
    networkManager.sendChatMessage(currentMessage);
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
        <textarea onChange={this.onChange} value={currentMessage} />
        <input type="button" value="Send" onClick={this.sendChatMessage} />
      </div>
    );
  }
}

export default Chat;
