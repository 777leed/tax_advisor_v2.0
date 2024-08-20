import { createChatBotMessage } from "react-chatbot-kit";

import Menu from "../Widgets/Menu/Menu.jsx";
import FormInfo from "../Widgets/FormInfo/FormInfo.jsx";

const botName = "TaxUI";

const config = {
  botName: botName,
  initialMessages: [
    createChatBotMessage(`Hello, how may I offer my services?`, 
      {
        widget: "menu",
        delay: 500,
        withAvatar: true,
      }),
  
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#52DE7C",
    },
    chatButton: {
      backgroundColor: "#52DE7C",
    },
  },
  state : {
    gist: '',

  },

  
  widgets: [
    {
      widgetName: "menu",
      widgetFunc: (props) => <Menu {...props} />,
      mapStateToProps: ["gist"],
      
    },
    {
      widgetName: "formInfo",
      widgetFunc: (props) => <FormInfo {...props} />,
      mapStateToProps: ["gist"],
    }
  ],
};

export default config;