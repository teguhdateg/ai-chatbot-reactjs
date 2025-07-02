/* eslint-disable no-unused-vars */
import { Chat } from "./components/Chat/Chat";
import { Controls } from "./components/Controls/Controls";
import styles from "./App.module.css";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai"; 
import { AssistantGoogleAI } from "./components/Assistants/googleAi";
import { AssistantOpenAI } from "./components/Assistants/openai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOGGLE_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const chat = model.startChat({ history: [] });

function App() {
  const assistant=new AssistantOpenAI();
  
  const [messages, setMessages] = useState([]);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });

    try {
      const result = await assistant.chat(content, messages);
      addMessage({
        content: result,
        role: "assistant",
      });
    } catch (error) {
      console.error(error);
      addMessage({
        content: "Sorry, I could not process your request. Please try again later.",
        role: "system",
      });
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chatbot.png" alt="chatbot" />
        <h2 className={styles.Title}>AI CHATBOT REACT JS</h2>
      </header>

      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>

      <Controls onSend={handleContentSend} />
    </div>
  );
}

export default App;
