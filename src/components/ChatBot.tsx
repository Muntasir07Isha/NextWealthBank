"use client";

import { useState } from "react";
import Image from "next/image";
import { query } from "@/utils/huggingFace";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function Chatbot() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false); // Toggle chatbot visibility
  const [loading, setLoading] = useState<boolean>(false);

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setIsOpen(!isOpen);

    // Add initial message if it's the first time opening the chatbot
    if (!messages.length) {
      setMessages([{ role: "bot", content: "Hi, I am your AI Finance advisor." }]);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return; // Ignore empty input

    // Add user message to the chat
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setLoading(true); // Set loading to true while fetching

    try {
      const response = await query({ inputs: input });
      console.log("Bot's Response:", response);

      // Add bot's response to the chat
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: response.generated_text || "I couldn't process that." },
      ]);
    } catch (error) {
      console.error("Error querying the API:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Something went wrong. Please try again later." },
      ]);
    } finally {
      setLoading(false); // Reset loading
      setInput(""); // Clear the input field
    }
  };

  return (
    <>
      {/* Chatbot Avatar */}
      <div
        onClick={toggleChatbot}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#007bff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        <Image src="/bot-avatar.png" alt="Chatbot Avatar" width={40} height={40} />
      </div>

      {/* Chatbot UI */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "20px",
            width: "300px",
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              padding: "10px",
              borderBottom: "1px solid #ddd",
              backgroundColor: "#007bff",
              color: "white",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              textAlign: "center",
            }}
          >
            Chat with AI
          </div>
          <div
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              padding: "10px",
            }}
          >
            {messages.map((msg, index) => (
              <p
                key={index}
                style={{
                  color: msg.role === "user" ? "blue" : "green",
                  margin: "5px 0",
                  textAlign: msg.role === "user" ? "right" : "left",
                }}
              >
                <strong>{msg.role === "user" ? "You:" : "Bot:"}</strong> {msg.content}
              </p>
            ))}
            {loading && <p style={{ color: "gray" }}>Bot is typing...</p>}
          </div>
          <div style={{ padding: "10px" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                marginBottom: "10px",
              }}
            />
            <button
              onClick={handleSend}
              style={{
                width: "100%",
                padding: "8px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
