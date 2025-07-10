import React, { useState } from "react";
import './MessagesTab.css';

const MessagesTab = ({
  onAskQuestionClick,
  toggleMaximize,
  closeChatbot,
  isMaximized
}) => {
  const [messages] = useState([
    { id: 1, sender: 'Intercom', text: 'Asked for Email', time: '4h ago' },
    { id: 2, sender: 'Fin', text: "I'm here and ready to assist you.", time: '3d ago' }
  ]);

  return (
    <div className="messages-tab-wrapper">
      <div className="messages-tab-header">
        <h2 className="messages-title">Messages</h2>
        <div className="tab-actions">
          <button className="icon-button" onClick={toggleMaximize}>
            {isMaximized ? '🗕' : '🗖'}
          </button>
          <button className="icon-button" onClick={closeChatbot}>
            ❌
          </button>
        </div>
      </div>

      <div className="message-list">
        {messages.map(msg => (
          <div key={msg.id} className="message-card">
            <div className="message-header">{msg.sender} • {msg.time}</div>
            <div className="message-text">{msg.text}</div>
          </div>
        ))}
      </div>

      <div className="ask-btn-container">
        <button className="ask-btn" onClick={onAskQuestionClick}>
          Ask a question <span className="ask-icon">❓</span>
        </button>
      </div>

      <div className="privacy-footer">
        <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
      </div>
    </div>
  );
};

export default MessagesTab;
