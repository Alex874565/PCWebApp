import { useState, useEffect } from 'react';
import './AI.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import axios from 'axios';

function AI() {
  const [messages, setMessages] = useState([
    {
      message: "Hi, I am your AI assistant. How can I help you?",
      sentTime: "just now",
      sender: "AI",
      direction: "incoming"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [products, setProducts] = useState(null)

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: JSON.parse(localStorage.getItem("user")).name
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToAI(newMessages);
  };

  function getProducts(){
    axios
        .get(`http://localhost:3001/api/products/`)
        .then((resp) => {setProducts(resp.data)})
    }

    useEffect(() => {getProducts(); console.log("Getting products...")}, [])


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
            {"role": "system", "content": `Give answers as a shopping assistant. Please give all recommendations exclusevly from the following JSON-formatted products:\n ${products.map((product) => {
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
      <MainContainer>
        <ChatContainer>       
          <MessageList
            scrollBehavior="smooth" 
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