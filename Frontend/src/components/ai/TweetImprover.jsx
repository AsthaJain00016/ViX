import { useState } from 'react';
import { improveTweet } from '../../api/ai.api';
import './TweetImprover.css';

const TweetImprover = ({ tweetContent, onUseImproved }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [improvedTweet, setImprovedTweet] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleImproveTweet = async () => {
        if (!tweetContent.trim() || isLoading) return;
        setIsLoading(true);

        try {
            const response = await improveTweet(tweetContent);
            setImprovedTweet(response.data.improvedTweet);
        } catch (error) {
            console.error(error);
            setImprovedTweet('Failed to improve tweet. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUseImproved = () => {
        if (onUseImproved) {
            onUseImproved(improvedTweet);
        }
        setIsOpen(false);
    };

    return (
        <div className="tweet-improver-container">
            <button
                className="improve-tweet-btn"
                onClick={() => {
                    if (!isOpen && !improvedTweet) {
                        handleImproveTweet();
                    }
                    setIsOpen(!isOpen);
                }}
                disabled={!tweetContent.trim()}
                title="Improve your tweet with AI"
            >
                ⚡ Improve
            </button>

            {isOpen && (
                <div className="tweet-improver-panel">
                    <div className="improver-header">
                        <h3>Improve Tweet</h3>
                        <button
                            className="close-btn"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>
                    </div>

                    <div className="improver-content">
                        <div className="original-tweet">
                            <label>Original:</label>
                            <p>{tweetContent || 'No tweet to improve'}</p>
                        </div>

                        <div className="improved-tweet">
                            <label>Improved:</label>
                            {isLoading ? (
                                <div className="loading">⏳ Improving...</div>
                            ) : (
                                <p>{improvedTweet}</p>
                            )}
                        </div>
                    </div>

                    <div className="improver-actions">
                        <button
                            className="refresh-btn"
                            onClick={handleImproveTweet}
                            disabled={isLoading}
                        >
                            🔄 Refresh
                        </button>
                        <button
                            className="use-btn"
                            onClick={handleUseImproved}
                            disabled={!improvedTweet || isLoading}
                        >
                            ✓ Use This
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TweetImprover;
