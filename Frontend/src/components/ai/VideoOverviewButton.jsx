import { useState } from 'react';
import { getVideoOverview } from '../../api/ai.api';
import './VideoOverviewButton.css';

const VideoOverviewButton = ({ videoId, videoTitle }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [overview, setOverview] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGetOverview = async () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            const response = await getVideoOverview(videoId);
            setOverview(response.data.overview);
        } catch (error) {
            console.error(error);
            setOverview('Failed to generate overview. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="video-overview-button-container">
            <button
                className="video-overview-btn"
                onClick={() => {
                    if (!isOpen && !overview) {
                        handleGetOverview();
                    }
                    setIsOpen(!isOpen);
                }}
                title="Get AI video overview"
            >
                🤖 Overview
            </button>

            {isOpen && (
                <div className="video-overview-panel">
                    <div className="overview-header">
                        <h3>Video Overview</h3>
                        <button
                            className="close-btn"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>
                    </div>

                    <div className="overview-content">
                        {isLoading ? (
                            <div className="loading">⏳ Analyzing video...</div>
                        ) : (
                            <div className="overview-text">
                                {overview.split('\n').map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        className="refresh-btn"
                        onClick={handleGetOverview}
                        disabled={isLoading}
                    >
                        🔄 Refresh
                    </button>
                </div>
            )}
        </div>
    );
};

export default VideoOverviewButton;
