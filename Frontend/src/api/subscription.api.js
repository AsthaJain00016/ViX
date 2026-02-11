import api from './axios.js'

export const fetchSubscribedChannels=async(subscriberId)=>{
    const res=await api.get(`/subscriptions/u/${subscriberId}`)
    return res.data.data
}

export const fetchChannelSubscribers=async(channelId)=>{
    const res=await api.get(`/subscriptions/c/${channelId}`)
    return res.data.data
}

export const toggleSubscription=(channelId)=>{
    return api.post(`/subscriptions/c/${channelId}`)
}

export const checkSubscriptionStatus=async(subscriberId, channelId)=>{
    const res=await api.get(`/subscriptions/s/${subscriberId}/${channelId}`)
    return res.data.data
}
