import React, { useState, useRef, useEffect } from "react";


import {
    Home,
    MessageSquare,
    Newspaper,
    Users,
    X,
    Maximize2,
    Minimize2,
} from "lucide-react";
import "./ChatbotPanel.css";
import Logo from "../../assets/VARI.png";

const ChatbotPanel = () => {
    const [isMaximized, setIsMaximized] = useState(false);
    const [isMinimized, setIsMinimized] = useState(true);
    const [activeTab, setActiveTab] = useState("Home");
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([
        { sender: "bot", text: "Hello! How can I help you today?" },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory, isTyping]);

    const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
        setIsMinimized(false);
    };

    const closeChatbot = () => {
        setIsMaximized(false);
        setIsMinimized(true);
    };

    const handleSend = async (e) => {
        e.preventDefault();
        const userMessage = message.trim();
        if (userMessage === "") return;

        setChatHistory((prev) => [...prev, { sender: "user", text: userMessage }]);
        setMessage("");
        setIsTyping(true);

        try {
            const response = await fetch("https://chatbot-fastapi-central.azurewebsites.net/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: userMessage }),
            });

            const data = await response.json();
            console.log("BOT RESPONSE:", data);

            setChatHistory((prev) => [
                ...prev,
                { sender: "bot", text: data.answer || "🤖 No response received." },
            ]);
        } catch (err) {
            console.error("Backend error:", err);
            setChatHistory((prev) => [
                ...prev,
                { sender: "bot", text: "⚠️ Failed to connect to backend." },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "Home":
                return (
                    <div className="tab-content">
                        <div className="welcome-message">
                            <h3>Hello there.</h3>
                            <p>How can we help?</p>
                        </div>
                        <div className="section recent-message">
                            <p><strong>Recent message</strong></p>
                            {chatHistory
                                .slice()
                                .reverse()
                                .find((msg) => msg.sender === "user") ? (
                                <>
                                    <p className="subtext">
                                        {chatHistory
                                            .slice()
                                            .reverse()
                                            .find((msg) => msg.sender === "user").text}
                                    </p>
                                    <p className="subsubtext">You • just now</p>
                                </>
                            ) : (
                                <p className="subtext">No recent messages yet.</p>
                            )}
                        </div>

                        <button className="ask-btn" onClick={() => setActiveTab("Messages")}>
                            Ask a question ➝
                        </button>
                        <div className="section helpful-articles">
                            <p><strong>Helpful articles</strong></p>
                            <ul>
                                <li>🔎 What is VARI?</li>
                                <li>🚀 Getting started with VARI</li>
                            </ul>
                        </div>
                        <a
                            className="footer-banner"
                            href="https://www.linkedin.com/company/varmodel"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            🌟 Join the Varmodel community and build with us!
                        </a>

                    </div>
                );

            case "Messages":
                return (
                    <div className="tab-content">
                        <div className="chat-content">
                            {chatHistory.map((msg, idx) => (
                                <div key={idx} className={`chat-bubble ${msg.sender}`}>
                                    {msg.text}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="chat-bubble bot typing-indicator">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>
                        <form className="message-input-area" onSubmit={handleSend}>
                            <input
                                type="text"
                                placeholder="Type your message..."
                                className="message-input"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button type="submit" className="send-btn">➤</button>
                        </form>
                        <div className="privacy-note">
                            By chatting with us, you agree to the monitoring and recording of this chat
                            to deliver our services and processing of your personal data in accordance with our{" "}
                            <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
                        </div>
                    </div>
                );

            case "News":
                return (
                    <div className="tab-content">
                        <div className="news-updates">
                            <div className="chat-bubble bot">📰 Latest Product Updates</div>
                            <div className="chat-bubble bot">- New AI feature launched!</div>
                            <div className="chat-bubble bot">- Improved Slack integration.</div>
                        </div>
                    </div>
                );

            case "Help":
                return (
                    <div className="tab-content">
                        <div className="help-section">
                            <div className="chat-bubble bot">Need help? Ask me anything!</div>
                            <div className="chat-bubble bot">Try: “How do I connect to HubSpot?”</div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className={`chatbot-wrapper ${isMaximized ? "maximized" : isMinimized ? "" : "minimized"}`}>
            <div className="chatbot-header">
                <img className="chatbot-logo" src={Logo} alt="Chatbot Logo" />
                <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                    VARI
                </span>
                <div className="messages-header">
                    <div className="header-actions">
                        {!isMinimized && (
                            <>
                                <button className="expand-btn" onClick={toggleMaximize}>
                                    {isMaximized ? <Minimize2 /> : <Maximize2 />}
                                </button>
                                <button className="close-btn" onClick={closeChatbot}>
                                    <X />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="chat-window">{renderTabContent()}</div>

            <div className="chatbot-nav">
                {["Home", "Messages", "News", "Help"].map((tab) => (
                    <div
                        key={tab}
                        className={`chatbot-tab ${activeTab === tab ? "active" : ""}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {{
                            Home: <Home strokeWidth={1.5} size={20} />,
                            Messages: <MessageSquare strokeWidth={1.5} size={20} />,
                            News: <Newspaper strokeWidth={1.5} size={20} />,
                            Help: <Users strokeWidth={1.5} size={20} />,
                        }[tab]}
                        <span>{activeTab === tab ? <strong>{tab}</strong> : tab}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatbotPanel;
