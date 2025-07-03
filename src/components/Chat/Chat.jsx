import { useRef, useEffect, useMemo } from "react";
import styles from "./Chat.module.css";
import Markdown from "react-markdown";

const WELCOME_MESSAGE_GROUP = [{
  role: "assistant",
  content: "Hello! How can I assist you rigth now?",
}];
export function Chat({ messages = [] }) {
  const messagesEndRef = useRef(null);
  const messagesGrups = useMemo(() => messages.reduce((groups, message)=>{
    if(message.role==="user") groups.push([])
    groups[groups.length - 1].push(message);
    return groups;
  },[]), [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.Chat}>
      {[WELCOME_MESSAGE_GROUP, ...messagesGrups].map((messages, groupIndex) => (
        <div className={styles.Group} key={groupIndex}>
          {messages.map(({ role, content }, index) => (
          <div className={styles.Message} key={index} data-role={role}>
          <Markdown>{content}</Markdown>
        </div>
      ))}
        </div>
      ))}
      
      <div ref={messagesEndRef} />
    </div>
  );
}
