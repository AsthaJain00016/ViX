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
export const changeCurrentPassword=async()=>{
    return await api.post(`/users/change-password`)
}
export const getCurrentUser=async()=>{
    return await api.get(`/users/current-user`)
}
export const updateUserAccount=async()=>{
    return await api.patch(`/users/update-account`)
}
export const updateAvatar=async(file)=>{
    const formData=new FormData()
    formData.append("avatar",file)
    const res=await api.patch("/users/avatar",formData,{
        headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
    })
    return res.data.data
}
export const updateUserCoverImage=async(file)=>{
    const formData=new FormData()
    formData.append("coverImage",file)
    const res=await api.patch("/users/cover-image",formData,{
        headers: { "Content-Type": "multipart/form-data" },
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