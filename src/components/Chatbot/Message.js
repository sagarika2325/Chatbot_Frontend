import React from "react";
import "./Message.css";

const Message = ({ sender, text }) => {
  const isBot = sender === "bot";

  return (
    <div className={`message-row ${isBot ? "bot" : "user"}`}>
      {/* Spacer pushes user messages to the right */}
      {!isBot && <div className="spacer" />}
      
      <div className={`message-bubble ${sender}`}>
        {text}
      </div>

      {/* Optional: Spacer for bot if you want symmetry */}
      {isBot && <div className="spacer" />}
    </div>
  );
};

export default Message;
