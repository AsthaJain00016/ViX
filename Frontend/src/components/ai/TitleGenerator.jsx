import { useState } from 'react';
import { generateVideoTitle } from '../../api/ai.api';
import './TitleGenerator.css';

const TitleGenerator = ({ topic, onSelectTitle }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [titles, setTitles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateTitle = async () => {
        if (!topic.trim() || isLoading) return;
        setIsLoading(true);

        try {
            const response = await generateVideoTitle(topic);
            setTitles(response.data.titles || []);
        } catch (error) {
            console.error(error);
            setTitles(['Failed to generate titles']);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectTitle = (title) => {
        if (onSelectTitle) {
            onSelectTitle(title);
        }
        setIsOpen(false);
    };

    return (
        <div className="title-generator-container">
            <button 
                className="generate-title-btn"
                onClick={() => {
                    if (!isOpen && titles.length === 0) {
                        handleGenerateTitle();
                    }
                    setIsOpen(!isOpen);
                }}
                disabled={!topic.trim()}
                title="Generate AI video title suggestions"
            >
                ✍️ AI Titles
            </button>

            {isOpen && (
                <div className="title-generator-panel">
                    <div className="generator-header">
                        <h3>Title Suggestions</h3>
                        <button 
                            className="close-btn"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>
                    </div>

                    <div className="titles-list">
                        {isLoading ? (
                            <div className="loading">⏳ Generating titles...</div>
                        ) : titles.length > 0 ? (
                            titles.map((title, index) => (
                                <button
                                    key={index}
                                    className="title-option"
                                    onClick={() => handleSelectTitle(title)}
                                    title="Click to use this title"
                                >
                                    <span className="title-text">{title}</span>
                                    <span className="use-icon">→</span>
                                </button>
                            ))
                        ) : (
                            <div className="no-titles">No titles generated yet</div>
                        )}
                    </div>

                    <button 
                        className="regenerate-btn"
                        onClick={handleGenerateTitle}
                        disabled={isLoading}
                    >
                        🔄 Generate More
                    </button>
                </div>
            )}
        </div>
    );
};

export default TitleGenerator;
