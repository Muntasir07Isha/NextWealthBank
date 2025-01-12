"use client";

import { useState } from "react";
import { query } from "@/utils/huggingFace";
import Image from "next/image";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function InboxPage() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSend = async () => {
    if (!input.trim()) return; 

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setLoading(true);

    try {
      const customPrompt = `
        You are a professional banking chatbot and you will act as a financial advisor only.
        Answer questions related to banking, loans, accounts, and financial advice. 
        Avoid adding personal opinions or irrelevant information.
      `;
      const response = await query({ inputs: `${customPrompt} ${input}` });

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
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", fontFamily: "Arial, sans-serif", width:"80%" }}>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Image
          src="/bot.png" 
          alt="Chatbot Avatar"
          width={80}
          height={80} 
          style={{
            borderRadius: "50%",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
          }}
        />
      </div>
  
      {/* Chat messages */}
      <div
        style={{
          border: "1px solid #ddd",
          padding: "10px",
          borderRadius: "8px",
          height: "400px",
          overflowY: "auto",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              margin: "5px 0",
            }}
          >
            <p
              style={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: msg.role === "user" ? "#007bff" : "#f1f1f1",
                color: msg.role === "user" ? "white" : "black",
                maxWidth: "70%",
              }}
            >
              {msg.content}
            </p>
          </div>
        ))}
        {loading && <p style={{ color: "gray", textAlign: "center" }}>Bot is typing...</p>}
      </div>
  
  
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
  
}
