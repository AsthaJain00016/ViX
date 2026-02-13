import api from "./axios";

export const fetchAllComments=async(videoId)=>{
    const res=await api.get(`/comments/${videoId}`, {withCredentials: true})
    return res.data.data
}

export const addComment=async(videoId, data)=>{
    const res = await api.post(`/comments/${videoId}`, data, {withCredentials: true})
    return res.data.data
}

export const deleteComment=async(commentId)=>{
    return api.delete(`/comments/c/${commentId}`, {withCredentials: true})
}

export const updateComment=async(commentId, data)=>{
    return api.patch(`/comments/c/${commentId}`, data, {withCredentials: true})
}

export const fetchTweetComments=async(tweetId)=>{
    const res=await api.get(`/comments/t/${tweetId}`,{withCredentials:true})
    return res.data.data
}

export const addTweetComment=async(tweetId, data)=>{
    const res=await api.post(`/comments/t/${tweetId}`, data,
        {withCredentials:true}
    )
    return res.data.data
}
