import api from "./axios"

export const fetchAllVideos=async(params = {})=>{
    const response= await api.get("/videos", { params })
    return response.data.data.data

}

export const fetchVideoById=async(videoId)=>{
    const response= await api.get(`/videos/${videoId}`)
    return response
}

export const fetchVideoDetails=fetchVideoById

export const fetchUserVideos=async()=>{
    const response= await api.get("/videos/user/videos")
    return response.data.data.data
}

export const publishVideo=async(formData)=>{
    // Let the browser/axios set the Content-Type (includes boundary)
    const response = await api.post(`/videos`, formData, {
        withCredentials: true
    })
    return response.data
}

export const deleteVideoById=async(videoId)=>{
    const response = await api.delete(`/videos/${videoId}`, { withCredentials: true })
    return response.data
}
