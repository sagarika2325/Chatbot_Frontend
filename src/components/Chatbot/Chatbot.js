import React, { useState } from "react";
import "./Chatbot.css";
import Message from "./Message";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi there! I’m your Varmodel Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    // send to backend
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/ask`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.answer },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3>Varmodel Assistant 🤖</h3>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} text={msg.text} />
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your question..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
