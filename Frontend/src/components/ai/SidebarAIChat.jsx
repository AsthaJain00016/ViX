import { useState, useRef, useEffect } from "react";
import {
  chatWithAI,
  getVideoRecommendations,
  writeTweet,
  generateVideoTitle
} from "../../api/ai.api";
import { SendHorizonal } from "lucide-react";

const SidebarAIChat = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey! I'm your ViX AI Assistant 🤖\n\n• Chat with me\n• Get video ideas\n• Write tweets\n• Generate titles\n\nWhat would you like to create today?"
    }
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (role, content) => {
    setMessages(prev => [...prev, { role, content }]);
  };

  // ✨ STREAMING EFFECT
  const streamResponse = (text) => {
    return new Promise(resolve => {
      let index = 0;
      const speed = 18; // typing speed

      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      const interval = setInterval(() => {
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].content += text[index];
          return updated;
        });

        index++;
        if (index >= text.length) {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    addMessage("user", userMessage);
    setIsLoading(true);

    try {
      let aiText = "";

      if (userMessage.toLowerCase().includes("recommend")) {
        const response = await getVideoRecommendations([userMessage]);
        aiText = response.data.aiSuggestions;
      } else if (userMessage.toLowerCase().includes("tweet")) {
        const response = await writeTweet(userMessage);
        aiText = response.data.tweet;
      } else if (userMessage.toLowerCase().includes("title")) {
        const response = await generateVideoTitle(userMessage);
        aiText = response.data.titles.join("\n");
      } else {
        const history = messages.map(m => ({
          role: m.role,
          content: m.content
        }));
        aiText = await chatWithAI(userMessage, history);
      }

      await streamResponse(aiText);
    } catch (error) {
      await streamResponse("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-black border-l border-white/10 relative">

      {/* Subtle Purple Glow */}
      <div className="absolute inset-0 bg-linear-to-b from-purple-900/10 via-transparent to-purple-900/10 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <h2 className="text-white font-semibold tracking-wide">
          ViX AI
        </h2>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
          <span className="text-xs text-gray-400">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto px-5 py-5 space-y-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            } animate-fadeIn`}
          >
            <div
              className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap transition-all duration-300 ${
                msg.role === "user"
                  ? "bg-purple-600 text-white rounded-br-sm shadow-lg shadow-purple-900/30"
                  : "bg-linear-to-br from-white/5 to-white/10 text-gray-300 border border-white/10 rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="relative z-10 p-5 border-t border-white/10">
        <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-5 py-3 focus-within:border-purple-500 transition-all backdrop-blur-sm">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask ViX AI anything..."
            disabled={isLoading}
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="ml-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white p-2 rounded-full transition-all shadow-md shadow-purple-900/40"
          >
            <SendHorizonal size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarAIChat;
