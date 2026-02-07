import api from "./axios";

export const createTweet=()=>{
    return api.post(`/tweets`)
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