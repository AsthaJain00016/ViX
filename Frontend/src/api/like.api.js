import api from "./axios";

export const likeVideo=(videoId)=>{
    return api.post(`/likes/toggle/v/${videoId}`)
}
export const dislikeVideo=(videoId)=>{
    return api.post(`/likes/toggle/dislike/v/${videoId}`)
}
export const likeTweet=(tweetId)=>{
    return api.post(`/likes/toggle/t/${tweetId}`)
}
export const likeComment=(commentId)=>{
    return api.post(`/likes/toggle/v/${commentId}`)
}

export const fetchLikedVideos=()=>{
    return api.get(`/likes/videos`)
}

export const checkVideoLikeStatus = async (videoId) => {
  const res = await api.get(`/likes/status/${videoId}`);
  return res.data.data;
};