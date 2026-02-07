import api from "./axios"

export const fetchAllVideos=async()=>{
    const response= await api.get("/videos")
    return response.data.data.data
    
}

export const fetchVideoById=async(videoId)=>{
    const response= await api.get(`/videos/${videoId}`)
    return response
}

export const fetchVideoDetails=fetchVideoById