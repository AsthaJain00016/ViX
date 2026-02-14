import api from "./axios.js"

export const createPlaylist=(data)=>{
    return api.post("/playlists", data)
}

export const fetchPlaylistById=(playlistId)=>{
    return api.get(`/playlists/${playlistId}`)
}

export const updatePlaylist=(playlistId, data)=>{
    return api.patch(`/playlists/${playlistId}`, data)
}

export const deletePlaylist=(playlistId)=>{
    return api.delete(`/playlists/${playlistId}`)
}

export const addVideoToPlaylist=(playlistId, videoId)=>{
    return api.patch(`/playlists/add/${videoId}/${playlistId}`)
}

export const removeVideoFromPlaylist=(playlistId, videoId)=>{
    return api.patch(`/playlists/remove/${videoId}/${playlistId}`)
}

export const fetchUsersPlaylist=(userId)=>{
    return api.get(`/playlists/users/${userId}`)
}