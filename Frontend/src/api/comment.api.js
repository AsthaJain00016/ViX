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