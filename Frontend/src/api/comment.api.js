import api from "./axios";

export const fetchAllComments=async(videoId)=>{
    const res=await api.get(`/comments/${videoId}`)
    console.log(res)
    return res.data
}

export const addComment=(videoId)=>{
    return api.post(`/comments/${videoId}`)
}

export const deleteComment=(commentId)=>{
    return api.delete(`/comments/c/${commentId}`)
}

export const updateComment=(commentId)=>{
    return api.patch(`/comments/c/${commentId}`)
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
