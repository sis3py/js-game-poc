import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Message from "../classes/message";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentMessage: ""
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
    this.setState({ currentMessage: "" });
  }

  updateMessages(message) {
    const { messages } = this.state;
    this.setState({
      messages: [
        ...messages,
        new Message(message.content, message.author.nickname, message.date)
      ]
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
        <TextField
          type="text"
          multiline
          placeholder="Enter message..."
          onChange={this.onChange}
          value={currentMessage}
        />
        <Button
          size="large"
          color="primary"
          variant="contained"
          onClick={this.sendChatMessage}
        >
          Send
        </Button>
      </div>
    );
  }
}

export default Chat;
