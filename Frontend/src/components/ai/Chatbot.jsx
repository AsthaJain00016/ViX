import { useState } from 'react';
import {
    chatWithAI,
    getVideoOverview,
    getVideoRecommendations,
    writeTweet,
    generateVideoTitle,
    improveTweet
} from '../../api/ai.api';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeMode, setActiveMode] = useState('chat'); // chat, overview, recommendations, tweet, title, improve
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! I\'m your AI assistant for ViX. Choose a feature or just chat with me!' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Mode-specific input states
    const [videoId, setVideoId] = useState('');
    const [interests, setInterests] = useState('');
    const [videoTitle, setVideoTitle] = useState('');
    const [tweetContext, setTweetContext] = useState('');
    const [topic, setTopic] = useState('');
    const [tweetToImprove, setTweetToImprove] = useState('');

    const addMessage = (role, content) => {
        setMessages(prev => [...prev, { role, content }]);
    };

    // General Chat
    const handleChat = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        addMessage('user', userMessage);
        setIsLoading(true);

        try {
            const history = messages.map(m => ({ role: m.role, content: m.content }));
            const aiText = await chatWithAI(userMessage, history);
            addMessage('assistant', aiText);
        } catch (error) {
            addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Video Overview
    const handleVideoOverview = async () => {
        if (!videoId.trim() || isLoading) return;

        addMessage('user', `Get overview for video: ${videoId}`);
        setVideoId('');
        setIsLoading(true);

        try {
            const response = await getVideoOverview(videoId);
            addMessage('assistant', response.data.overview);
        } catch (error) {
            addMessage('assistant', 'Failed to get video overview. Please check the video ID.');
        } finally {
            setIsLoading(false);
        }
    };

    // Video Recommendations
    const handleRecommendations = async () => {
        if (!interests.trim() && isLoading) return;

        const interestList = interests.split(',').map(i => i.trim()).filter(i => i);
        addMessage('user', `Recommend videos for interests: ${interestList.join(', ')}`);
        setInterests('');
        setIsLoading(true);

        try {
            const response = await getVideoRecommendations(interestList);
            const rec = `Here are the recommendations:\n\n${response.data.aiSuggestions}`;
            addMessage('assistant', rec);
        } catch (error) {
            addMessage('assistant', 'Failed to get recommendations. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Write Tweet
    const handleWriteTweet = async () => {
        if (!videoTitle.trim() && !tweetContext.trim()) {
            addMessage('assistant', 'Please provide a video title or context.');
            return;
        }

        addMessage('user', `Write tweet about: ${videoTitle || tweetContext}`);
        setVideoTitle('');
        setTweetContext('');
        setIsLoading(true);

        try {
            const response = await writeTweet(tweetContext, videoTitle);
            addMessage('assistant', response.data.tweet);
        } catch (error) {
            addMessage('assistant', 'Failed to write tweet. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Generate Title
    const handleGenerateTitle = async () => {
        if (!topic.trim() || isLoading) return;

        addMessage('user', `Generate titles for: ${topic}`);
        setTopic('');
        setIsLoading(true);

        try {
            const response = await generateVideoTitle(topic);
            const titles = response.data.titles.join('\n');
            addMessage('assistant', `Here are title suggestions:\n\n${titles}`);
        } catch (error) {
            addMessage('assistant', 'Failed to generate titles. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Improve Tweet
    const handleImproveTweet = async () => {
        if (!tweetToImprove.trim() || isLoading) return;

        addMessage('user', `Improve tweet: "${tweetToImprove}"`);
        setTweetToImprove('');
        setIsLoading(true);

        try {
            const response = await improveTweet(tweetToImprove);
            addMessage('assistant', response.data.improvedTweet);
        } catch (error) {
            addMessage('assistant', 'Failed to improve tweet. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (activeMode === 'chat') {
                handleChat();
            } else if (activeMode === 'overview') {
                handleVideoOverview();
            } else if (activeMode === 'recommendations') {
                handleRecommendations();
            } else if (activeMode === 'tweet') {
                handleWriteTweet();
            } else if (activeMode === 'title') {
                handleGenerateTitle();
            } else if (activeMode === 'improve') {
                handleImproveTweet();
            }
        }
    };

    const clearChat = () => {
        setMessages([{ role: 'assistant', content: 'Chat cleared. How can I help you?' }]);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                className="chatbot-toggle"
                onClick={() => setIsOpen(!isOpen)}
                title="AI Assistant"
            >
                {isOpen ? '✕' : '🤖'}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="chatbot-container">
                    <div className="chatbot-header">
                        <span>🤖 AI Assistant</span>
                        <button onClick={() => setIsOpen(false)}>✕</button>
                    </div>

                    {/* Mode Tabs */}
                    <div className="chatbot-tabs">
                        <button
                            className={`tab ${activeMode === 'chat' ? 'active' : ''}`}
                            onClick={() => setActiveMode('chat')}
                            title="Chat"
                        >
                            💬
                        </button>
                        <button
                            className={`tab ${activeMode === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveMode('overview')}
                            title="Video Overview"
                        >
                            📺
                        </button>
                        <button
                            className={`tab ${activeMode === 'recommendations' ? 'active' : ''}`}
                            onClick={() => setActiveMode('recommendations')}
                            title="Recommendations"
                        >
                            ⭐
                        </button>
                        <button
                            className={`tab ${activeMode === 'tweet' ? 'active' : ''}`}
                            onClick={() => setActiveMode('tweet')}
                            title="Write Tweet"
                        >
                            🐦
                        </button>
                        <button
                            className={`tab ${activeMode === 'title' ? 'active' : ''}`}
                            onClick={() => setActiveMode('title')}
                            title="Generate Title"
                        >
                            ✍️
                        </button>
                        <button
                            className={`tab ${activeMode === 'improve' ? 'active' : ''}`}
                            onClick={() => setActiveMode('improve')}
                            title="Improve Tweet"
                        >
                            ⚡
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.role}`}>
                                {msg.content.split('\n').map((line, i) => (
                                    <div key={i}>{line}</div>
                                ))}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message assistant">
                                <span className="typing-indicator">⏳ Processing...</span>
                            </div>
                        )}
                    </div>

                    {/* Input Area - Dynamic based on mode */}
                    <div className="chatbot-input-section">
                        {activeMode === 'chat' && (
                            <div className="chatbot-input">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask me anything..."
                                    disabled={isLoading}
                                    className='text-black'
                                />
                                <button onClick={handleChat} disabled={isLoading || !input.trim()}>
                                    Send
                                </button>
                            </div>
                        )}

                        {activeMode === 'overview' && (
                            <div className="chatbot-input">
                                <input
                                    type="text"
                                    value={videoId}
                                    onChange={(e) => setVideoId(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Enter video ID..."
                                    disabled={isLoading}
                                    className='text-black'
                                />
                                <button onClick={handleVideoOverview} disabled={isLoading || !videoId.trim()}>
                                    Get Overview
                                </button>
                            </div>
                        )}

                        {activeMode === 'recommendations' && (
                            <div className="chatbot-input">
                                <input
                                    type="text"
                                    value={interests}
                                    onChange={(e) => setInterests(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Interests (comma-separated)..."
                                    disabled={isLoading}
                                    className='text-black'
                                />
                                <button onClick={handleRecommendations} disabled={isLoading}>
                                    Recommend
                                </button>
                            </div>
                        )}

                        {activeMode === 'tweet' && (
                            <div className="chatbot-input-group">
                                <input
                                    type="text"
                                    value={videoTitle}
                                    onChange={(e) => setVideoTitle(e.target.value)}
                                    placeholder="Video title..."
                                    disabled={isLoading}
                                    className='text-black'
                                />
                                <input
                                    type="text"
                                    value={tweetContext}
                                    onChange={(e) => setTweetContext(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Context (optional)..."
                                    disabled={isLoading}
                                    className='text-black'
                                />
                                <button onClick={handleWriteTweet} disabled={isLoading || (!videoTitle.trim() && !tweetContext.trim())}>
                                    Write Tweet
                                </button>
                            </div>
                        )}

                        {activeMode === 'title' && (
                            <div className="chatbot-input">
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Video topic..."
                                    disabled={isLoading}
                                    className='text-black'
                                />
                                <button onClick={handleGenerateTitle} disabled={isLoading || !topic.trim()}>
                                    Generate
                                </button>
                            </div>
                        )}

                        {activeMode === 'improve' && (
                            <div className="chatbot-input">
                                <input
                                    type="text"
                                    value={tweetToImprove}
                                    onChange={(e) => setTweetToImprove(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Paste your tweet here..."
                                    disabled={isLoading}
                                    className='text-black'
                                />
                                <button onClick={handleImproveTweet} disabled={isLoading || !tweetToImprove.trim()}>
                                    Improve
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Clear Button */}
                    <button className="chatbot-clear" onClick={clearChat} disabled={isLoading}>
                        Clear Chat
                    </button>
                </div>
            )}
        </>
    );
};

export default Chatbot;
