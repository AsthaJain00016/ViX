import api from "./api/axios.js"

export const createPlaylist=()=>{
    return api.post("/playlists")
}

export const fetchPlaylistById=(playlistId)=>{
    return api.get(`/playlists/${playlistId}`)
}

export const updatePlaylist=(playlistId)=>{
    return api.patch(`/playlists/${playlistId}`)
}
export const deletePlaylist=(playlistId)=>{
    return api.delete(`/playlists/${playlistId}`)
}

export const addVideoToPlaylist=(playlistId,videoId)=>{
    return api.patch(`/playlists/add/${videoId}/${playlistId}`)
}
export const removeVideoFromPlaylist=(playlistId,videoId)=>{
    return api.patch(`/playlists/remove/${videoId}/${playlistId}`)
}

export const fetchUsersPlaylist=(userId)=>{
    return api.get(`/playlists/users/${userId}`)
}