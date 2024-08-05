class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse = (message) => {
    console.log(message);
    // Send the message to the ActionProvider's response method
    this.actionProvider.response(message);
  };
}

export default MessageParser;
