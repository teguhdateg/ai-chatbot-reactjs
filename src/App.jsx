/* eslint-disable no-unused-vars */
import { Chat } from "./components/Chat/Chat";
import { Controls } from "./components/Controls/Controls";
import styles from "./App.module.css";
import { useState } from "react";
import { AssistantOpenAI } from "./components/Assistants/openai";
import { Loader } from "./components/Loader/Loader";

function App() {
  const assistant=new AssistantOpenAI();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
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
