import api from './axios'

export const registerUser=async(formData)=>{
    console.log("Register api call")
    const res= await api.post(`/users/register`,formData,{
        withCredentials:true
    })
    return res.data.data
}

export const loginUser=async(payload)=>{
    const res= await api.post(`/users/login`,payload)
    return res.data.data
}

export const logoutUser=async()=>{
    return await api.post(`/users/logout`)
}

export const refreshAccessToken=async()=>{
    return await api.post(`/users/refresh-token`)
}


export const changeCurrentPassword=async(data)=>{
    const res= await api.post(`/users/change-password`,data,{
        withCredentials:true
    })
    return res.data
}


export const getCurrentUser=async()=>{
    return await api.get(`/users/current-user`)
}
export const updateUserAccount=async(data)=>{
    return await api.patch(`/users/update-account`, data)
}



export const updateAvatar=async(formData)=>{
    console.log("Form data received ",formData)
    const res=await api.patch("/users/avatar",formData,{
    withCredentials: true,
    })
    return res.data.data
}


export const updateUserCoverImage=async(formData)=>{
    formData.append("coverImage",formData)
    const res=await api.patch("/users/cover-image",formData,{
    withCredentials: true,
    })
    return res.data.data
}


export const fetchUserChannelProfile=async(username)=>{
    return await api.get(`/users/c/${username}`)
}
export const fetchWatchHistory=async()=>{
    return await api.get(`/users/watch-history`)
}

export const addToWatchHistory=async(videoId)=>{
    return await api.post(`/users/watch-history/${videoId}`)
}

export const fetchUserById=async(id)=>{
    const res= await api.get(`/users/user/${id}`)
    return res.data.data
}

export const toggleSaveVideo=async(videoId)=>{
    const res= await api.post(`/users/save/${videoId}`)
    return res.data.data
}

export const checkVideoSaved=async(videoId)=>{
    const res= await api.get(`/users/saved/check/${videoId}`)
    return res.data.data
}

export const fetchSavedVideos=async(params = {})=>{
    const res = await api.get(`/users/saved-videos`, { params })
    return res.data.data
}
