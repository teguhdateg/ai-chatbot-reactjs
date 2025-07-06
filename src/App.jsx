/* eslint-disable no-unused-vars */
import { Chat } from "./components/Chat/Chat";
import { Controls } from "./components/Controls/Controls";
import styles from "./App.module.css";
import { useState } from "react";
import { Loader } from "./components/Loader/Loader";
import { AssistantGoogleAI } from "./components/Assistants/googleAi";

function App() {
  const assistant=new AssistantGoogleAI();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

   function updateLastMessage(content) {
  setMessages((prevMessages) =>
    prevMessages.map((message, index) => {
      if (index === prevMessages.length - 1) {
        return {
          ...message,
          content: `${message.content}${content}`,
        };
      }
      return message;
    })
  );
}

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

 

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    setLoading(true);
    try {
      const result = assistant.chatStream(content);
      let isFirstChunk = false;
      for await (const chunk of result) {
        if(!isFirstChunk){
          isFirstChunk = true;
          addMessage({
            content: "",
            role: "assistant",
          });
          setLoading(false);
        }
        updateLastMessage(chunk);
      }
    } catch (error) {
      console.error(error);
      addMessage({
        content: "Sorry, I could not process your request. Please try again later.",
        role: "system",
      });
    } 
    setLoading(false);
  }

  return (
    <div className={styles.App}>
      {loading && <Loader />}
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chatbot.png" alt="chatbot" />
        <h2 className={styles.Title}>AI CHATBOT REACT JS</h2>
      </header>

      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>

      <Controls isdisabled={loading} onSend={handleContentSend} />
    </div>
  );
}

export default App;
