import { useState, useEffect } from 'react';
import './AI.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AI(products) {
  const [messages, setMessages] = useState([
    {
      message: "Hi, I am your AI assistant. How can I help you?",
      sentTime: "just now",
      sender: "AI",
      direction: "incoming"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: 'user'
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToAI(newMessages);
  };



  async function processMessageToAI(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "AI") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });

    function apiRequestBody(products){
        console.log(products)
      return ({
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": `Give answers as a shopping assistant. Please give all recommendations exclusively from the following JSON-formatted products:\n ${products.map((product) => {
                return `Name: ${product.name}, Description: ${product.description}, Price: ${product.price}, Genre: ${product.genre}, Producer: ${product.producer}, Release date: ${product.date}\n;`})}.`},
          ...apiMessages
        ]
      });
    };
    console.log("Fetching resp")
    await fetch(import.meta.env.VITE_CRACK_API, 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + import.meta.env.VITE_CRACK_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody(products))
    }).then((data) => {
      return data.json();
    }).then((data) => {
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        direction: "incoming",
        sender: "AI"
      }])
      setIsTyping(false);
    });
    console.log("Fetch successful!");
}

  return (
    <div className="ai_body">
    <h2>AI Assistant</h2>
      <MainContainer>
        <ChatContainer>       
          <MessageList
            scrollBehavior="smooth"
            onScroll={(e) => e.stopPropagation()} 
            typingIndicator={isTyping ? <TypingIndicator content="AI is typing" /> : null}
          >
            {messages.map((message, i) => {
              return <Message key={i} model={message}/>
            })}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />        
        </ChatContainer>
      </MainContainer>
    </div>
  )
}
export default AI;