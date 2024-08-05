//Chatbot App 
import React from 'react';
import  Chatbot  from 'react-chatbot-kit'; //Chatbot function
import 'react-chatbot-kit/build/main.css'; //Chatbot css

import config from './chatbot/config.js';
import MessageParser from './chatbot/messageParser.js';
import ActionProvider from './chatbot/actionProvider.js';

import './App.css';



function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider}/>
       </header>
    </div>
  );
}

export default App;
