// src/App.js
import React, { useState } from "react";
import ChatbotPanel from "./components/Chatbot/ChatbotPanel";
import LauncherButton from "./components/Chatbot/LauncherButton";
import "./App.css";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <div className="App">
      {isChatOpen && (
        <ChatbotPanel
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          closeChat={() => setIsChatOpen(false)}
        />
      )}
      <LauncherButton onClick={toggleChat} />
    </div>
  );
}

export default App;
