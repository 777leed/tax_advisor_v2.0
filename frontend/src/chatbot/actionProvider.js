class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  async response(userMessage) {
    try {
      // Send a POST request to your API endpoint with the user's message
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userMessage }),
      });

      const data = await response.json();
      // Create a message from the response
      const chatBotMessage = this.createChatBotMessage(data || "I'm not sure how to respond.");
      this.updateChatbotState(chatBotMessage);
    } catch (error) {
      console.error('Error fetching response:', error);
      const errorMessage = this.createChatBotMessage("Sorry, I couldn't process your request at the moment.");
      this.updateChatbotState(errorMessage);
    }
  }

  updateChatbotState(message) {
    this.setState(prevState => ({
      ...prevState, messages: [...prevState.messages, message]
    }));
  }
}

export default ActionProvider;
