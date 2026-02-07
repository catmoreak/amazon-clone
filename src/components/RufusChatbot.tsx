import React, { useState, useRef, useEffect } from "react";
import { X, Send, Minimize2, Maximize2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import rufusImage from "../assets/rufus.png";
import {
  GEMINI_API_KEY,
  GEMINI_CONFIG,
  RUFUS_SYSTEM_PROMPT,
} from "../config/gemini";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

interface Message {
  id: string;
  text: string;
  sender: "user" | "rufus";
  timestamp: Date;
}

export const RufusChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Rufus, your AI shopping assistant. I can help you find products, answer questions about items, compare prices, and provide personalized recommendations. What can I help you with today?",
      sender: "rufus",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Create a shopping-focused prompt
      const model = genAI.getGenerativeModel({ model: GEMINI_CONFIG.model });
      const prompt = `${RUFUS_SYSTEM_PROMPT}\n\nCustomer message: "${inputMessage}"`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text =
        response.text() ||
        "I can help you find great deals and products. What are you looking for today?";

      const rufusMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: text,
        sender: "rufus",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, rufusMessage]);
    } catch (error) {
      console.error("Error generating response:", error);

      // Provide helpful fallback responses based on common queries
      let fallbackResponse = "I'm here to help you shop! ";
      const lowerInput = inputMessage.toLowerCase();

      if (lowerInput.includes("deal") || lowerInput.includes("sale")) {
        fallbackResponse +=
          "Check out our Today's Deals section for amazing discounts on electronics, fashion, and home items!";
      } else if (lowerInput.includes("track") || lowerInput.includes("order")) {
        fallbackResponse +=
          "You can track your orders in the 'Returns & Orders' section of your account.";
      } else if (lowerInput.includes("compare") || lowerInput.includes("vs")) {
        fallbackResponse +=
          "I can help you compare products! Tell me which items you're considering and I'll highlight their key differences.";
      } else if (
        lowerInput.includes("recommend") ||
        lowerInput.includes("suggest")
      ) {
        fallbackResponse +=
          "Based on popular choices, I recommend checking out our Best Sellers in your category of interest!";
      } else if (
        lowerInput.includes("price") ||
        lowerInput.includes("cheap") ||
        lowerInput.includes("budget")
      ) {
        fallbackResponse +=
          "Use the price filter on the left side of search results to find items within your budget!";
      } else {
        fallbackResponse +=
          "While I'm having connection issues, you can browse our categories or use the search bar to find what you need!";
      }

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponse,
        sender: "rufus",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestedQuestions = [
    "What are today's deals?",
    "Track my order",
    "Compare iPhone vs Samsung",
    "Best laptops under $1000",
    "Recommend a good smartphone",
    "Find wireless headphones",
  ];

  return (
    <>
      {/* Floating Rufus Icon */}
      {!isOpen && (
        <div
          className="fixed bottom-24 right-8 z-40 rufus-icon-wrapper animate-fade-in-up"
          onClick={() => setIsOpen(true)}
        >
          <div className="rufus-tooltip">Chat with Rufus AI</div>
          <div className="relative group">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#ff9900] to-[#ff6600] p-0.5 shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105 cursor-pointer">
              <img
                src={rufusImage}
                alt="Rufus AI Assistant"
                className="w-full h-full rounded-full object-cover bg-white"
              />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-24 right-8 z-50 chat-transition rufus-chat-shadow ${
            isMinimized
              ? "w-80 h-14"
              : "w-96 h-[480px] max-h-[calc(100vh-140px)]"
          } bg-white rounded-lg flex flex-col overflow-hidden border border-gray-200 animate-slide-up`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#232f3e] to-[#37475a] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={rufusImage}
                alt="Rufus"
                className="w-10 h-10 rounded-full bg-white p-0.5"
              />
              <div>
                <h3 className="font-bold text-base">Rufus</h3>
                <p className="text-xs text-gray-300">AI Shopping Assistant</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:bg-white/20 p-1 rounded transition-colors"
              >
                {isMinimized ? (
                  <Maximize2 size={18} />
                ) : (
                  <Minimize2 size={18} />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] ${
                        message.sender === "user"
                          ? "bg-[#ff9900] text-white"
                          : "bg-white border border-gray-200"
                      } rounded-lg p-3 shadow-sm`}
                    >
                      {message.sender === "rufus" && (
                        <div className="flex items-center gap-2 mb-1">
                          <img
                            src={rufusImage}
                            alt="Rufus"
                            className="w-5 h-5 rounded-full"
                          />
                          <span className="text-xs font-semibold text-gray-600">
                            Rufus
                          </span>
                        </div>
                      )}
                      <p
                        className={`text-sm ${message.sender === "rufus" ? "text-gray-800" : ""}`}
                      >
                        {message.text}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "user"
                            ? "text-orange-100"
                            : "text-gray-400"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2">
                        <img
                          src={rufusImage}
                          alt="Rufus"
                          className="w-5 h-5 rounded-full"
                        />
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="px-4 py-2 bg-white border-t border-gray-200">
                  <p className="text-xs text-gray-600 mb-2">Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.slice(0, 4).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputMessage(question);
                          sendMessage();
                        }}
                        className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask Rufus anything about shopping..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff9900] focus:border-transparent text-sm"
                    disabled={isTyping}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={isTyping || !inputMessage.trim()}
                    className="bg-[#ff9900] text-white p-2 rounded-full hover:bg-[#ff6600] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={20} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Powered by AI • May occasionally provide inaccurate info
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
