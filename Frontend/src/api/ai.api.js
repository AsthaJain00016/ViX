import axios from './axios';

// AI Chat - Send message and get response
export const chatWithAI = async (message, history = []) => {
    try {
        const response = await axios.post('/ai/chat', { message, history });
        // return the AI response string (ApiResponse.data.response)
        return response.data.data?.response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Get Video Overview
export const getVideoOverview = async (videoId) => {
    try {
        const response = await axios.post('/ai/video/overview', { videoId });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Get Video Recommendations
export const getVideoRecommendations = async (interests = [], userId = null) => {
    try {
        const response = await axios.post('/ai/video/recommendations', { interests, userId });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Write Tweet
export const writeTweet = async (context = '', videoTitle = '') => {
    try {
        const response = await axios.post('/ai/tweet/write', { context, videoTitle });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Generate Video Title
export const generateVideoTitle = async (topic, description = '', keywords = '') => {
    try {
        const response = await axios.post('/ai/title/generate', { topic, description, keywords });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Improve Tweet
export const improveTweet = async (tweet) => {
    try {
        const response = await axios.post('/ai/tweet/improve', { tweet });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
