import { useState } from 'react';
import {
    chatWithAI,
    getVideoRecommendations,
    writeTweet,
    generateVideoTitle
} from '../../api/ai.api';
import './SidebarAIChat.css';

const SidebarAIChat = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Hey! I\'m your ViX AI Assistant 🤖\n\nI can help you with:\n• Chat and answer questions\n• Suggest videos based on your interests\n• Write tweets for your content\n• Generate catchy video titles\n\nWhat would you like help with?'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const addMessage = (role, content) => {
        setMessages(prev => [...prev, { role, content }]);
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        addMessage('user', userMessage);
        setIsLoading(true);

        try {
            // Check if user is asking for recommendations
            if (userMessage.toLowerCase().includes('recommend') || userMessage.toLowerCase().includes('suggest')) {
                const interestMatch = userMessage.match(/(?:about|for|on)\s+(.+)/i);
                const interest = interestMatch ? interestMatch[1] : '';

                const response = await getVideoRecommendations([interest]);
                addMessage('assistant', response.data.aiSuggestions);
            }
            // Check if user is asking for tweet help
            else if (userMessage.toLowerCase().includes('tweet') || userMessage.toLowerCase().includes('write')) {
                const response = await writeTweet(userMessage);
                addMessage('assistant', response.data.tweet);
            }
            // Check if user is asking for title suggestions
            else if (userMessage.toLowerCase().includes('title') || userMessage.toLowerCase().includes('name')) {
                const response = await generateVideoTitle(userMessage);
                const titles = response.data.titles.join('\n');
                addMessage('assistant', `Here are some title ideas:\n\n${titles}`);
            }
            // General chat
            else {
                const history = messages.map(m => ({ role: m.role, content: m.content }));
                const aiText = await chatWithAI(userMessage, history);
                addMessage('assistant', aiText);
            }
        } catch (error) {
            console.error(error);
            addMessage('assistant', 'Oops! Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="sidebar-ai-chat">
            <div className="ai-chat-header">
                <span>🤖 ViX AI</span>
            </div>

            <div className="ai-chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`ai-message ${msg.role}`}>
                        {msg.content.split('\n').map((line, i) => (
                            <div key={i}>{line}</div>
                        ))}
                    </div>
                ))}
                {isLoading && (
                    <div className="ai-message assistant">
                        <span className="ai-typing">⏳ Thinking...</span>
                    </div>
                )}
            </div>

            <div className="ai-chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    disabled={isLoading}
                    className='text-black'
                />
                <button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    title="Send message"
                >
                    ➤
                </button>
            </div>
        </div>
    );
};

export default SidebarAIChat;
