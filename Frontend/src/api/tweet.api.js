import api from "./axios";

export const createTweet=(data)=>{
    return api.post(`/tweets`, data)
}

export const fetchUserTweets=(userId)=>{
    return api.get(`/tweets/user/${userId}`)
}

export const updateTweet=(tweetId)=>{
    return api.patch(`/tweets/${tweetId}`)
}
export const deleteTweet=(tweetId)=>{
    return api.delete(`/tweets/${tweetId}`)
}