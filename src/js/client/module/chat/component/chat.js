import React from 'react';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      message: '',
    };
    this.onChange = this.onChange.bind(this);
    this.sendChatMessage = this.sendChatMessage.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  componentDidMount() {
    const { networkManager } = this.props;
    networkManager.handleMessageReceived(this.updateContent);
  }

  onChange(e) {
    this.setState({ message: e.target.value });
  }

  sendChatMessage() {
    const { networkManager } = this.props;
    const { message } = this.state;
    networkManager.sendChatMessage(message);
    this.setState({ message: '' });
  }

  updateContent(message) {
    const { content } = this.state;
    this.setState({ content: content.push(message) });
  }

  render() {
    const { content, message } = this.state;
    return (
      <div>
        <div>{content}</div>
        <textarea onChange={this.onChange} value={message} />
        <input type="button" value="Send" onClick={this.sendChatMessage} />
      </div>
    );
  }
}

export default Chat;
