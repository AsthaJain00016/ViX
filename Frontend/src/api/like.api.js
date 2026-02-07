import api from "./axios";

export const likeVideo=(videoId)=>{
    return api.post(`/likes/toggle/v/${videoId}`)
}
export const likeTweet=(tweetId)=>{
    return api.post(`/likes/toggle/v/${tweetId}`)
}
export const likeComment=(commentId)=>{
    return api.post(`/likes/toggle/v/${commentId}`)
}

export const fetchLikedVideos=()=>{
    return api.get(`/likes/videos`)
}