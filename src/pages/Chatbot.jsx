import { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("https://api.example.com/chat", { message: input });
      const botMessage = { sender: "bot", text: response.data.reply };
      setMessages(prev => [...prev, userMessage, botMessage]);
    } catch {
      setMessages(prev => [...prev, userMessage, { sender: "bot", text: "Error in response!" }]);
    }

    setInput("");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg flex flex-col space-y-4 animate-fade-in">
      <h2 className="text-2xl font-semibold text-center text-gray-800">🌾 Ask GPT – Farming Assistant</h2>

      <div className="border border-gray-200 rounded-lg p-4 h-[450px] overflow-y-auto bg-gray-50 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`px-4 py-2 rounded-lg max-w-[80%] text-sm md:text-base 
              ${msg.sender === "user"
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-gray-200 text-gray-800"
              }`}
          >
            <span className="font-medium">{msg.sender === "user" ? "You" : "Bot"}:</span> {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask questions related to farming..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          onClick={handleSend}
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
