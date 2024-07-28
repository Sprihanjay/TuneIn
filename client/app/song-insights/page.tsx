"use client";
import React, { useState } from "react";
import { BeatLoader } from "react-spinners";

type ChatMessage = {
  sender: "user" | "llm";
  message: string;
};

export default function SongInsights() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false); // New state for loading

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return; // Prevent empty messages

    // Add user message to chat history
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { sender: "user", message },
    ]);
    setMessage(""); // Clear the input field
    setLoading(true); // Start loading

    try {
      const res = await fetch("/api/generate-insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (res.ok) {
        const data = await res.json();
        const responseMessage = data.text;

        // Add LLM response to chat history
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { sender: "llm", message: responseMessage },
        ]);
      } else {
        console.error("Error fetching data:", res.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-customone">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mb-4">
        <div className="chat-history max-h-96 overflow-y-auto">
          {chatHistory.length === 0 ? (
            <div className="font-bold">
              Welcome to Song Insights! Start by typing a message to brainstorm
              ideas, find inspiration, or even create lyrics. Your musical
              journey begins here!
            </div>
          ) : null}
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`flex ${
                chat.sender === "user" ? "justify-end" : "justify-start"
              } mb-4`}>
              <div
                className={`p-3 rounded-lg ${
                  chat.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}>
                {chat.message}
              </div>
            </div>
          ))}
          {loading && <BeatLoader />}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md w-full max-w-2xl flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          className="bg-black text-white p-3 rounded-lg flex-grow mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-lg w-32 hover:bg-blue-600 transition-colors">
          Send
        </button>
      </form>
    </div>
  );
}
