import { useEffect, useRef, useState } from "react";
import styles from "./Controls.module.css";
import TextareaAutosize from "react-textarea-autosize";

export function Controls({ isdisabled=false, onSend }) {
  const [content, setContent] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!isdisabled && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isdisabled]);

  function handleContentChanges(event) {
    setContent(event.target.value);
  }

  function handleContentSend() {
    if (content.length > 0) {
      onSend(content);
      setContent("");
    }
  }

  function handleEnterPress(event){
    if(event.key === "Enter" && !event.shiftKey){
        event.preventDefault()
        handleContentSend()
    }
  }

  return (
    <div className={styles.Controls}>
      <div className={styles.TextAreaContainer}>
        <TextareaAutosize
          ref={textareaRef}
          disabled={isdisabled}
          className={styles.TextArea}
          placeholder="Create Your Messages"
          value={content}
          minRows={1}
          maxRows={4}
          onChange={handleContentChanges}
          onKeyDown={handleEnterPress}
        />
      </div>
      <button disabled={isdisabled} className={styles.Button} onClick={handleContentSend}>
        <SendIcon />
      </button>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#5f6368"
    >
      <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" />
    </svg>
  );
}
