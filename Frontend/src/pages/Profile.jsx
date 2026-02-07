import { useEffect, useState } from "react";
import ChannelHeader from "../components/profile/channelHeader";
import ChannelTabs from "../components/profile/channelTabs";
import ChannelVideoGrid from "../components/profile/ChannelVideoGrid";
import ChannelBanner from "../components/profile/channelBanner";
import Layout from "../components/Layout/Layout";
import PlaylistGrid from "../components/playlist/PlaylistGrid";
import { playlists } from "../data/playlist";
import ChannelTweets from "../components/profile/ChannelTweets";
import FollowingGrid from "../components/profile/FollwingGrid";
import { useAuth } from "../context/AuthContext";
import { fetchChannelSubscribers, fetchSubscribedChannels } from "../api/subscription.api";
const Profile=()=>{
    const {user, loading}=useAuth();
    const [subscribers,setSubscribers]=useState(0)
    const [channels,setChannels]=useState(0)

    useEffect(()=>{
        if (user && user._id) {
            const response=async()=>{
                const resSubscriber=await fetchChannelSubscribers(user._id)
                setSubscribers(resSubscriber)
                const resChannel=await fetchSubscribedChannels(user._id)
                setChannels(resChannel)
            }
            response()
        }
    },[user])
    const [activeTab,setActiveTab]=useState("Following")

    if (loading) return <Layout><div className="text-white">Loading...</div></Layout>;
    if (!user) return <Layout><div className="text-white">Please log in to view your profile.</div></Layout>;

    return(
        <Layout>
        <div className="text-white">
            <ChannelBanner coverImage={user.coverImage}  />
            <ChannelHeader user={user} subscribers={subscribers} channels={channels}/>
            <ChannelTabs active={activeTab} setActive={setActiveTab}/>
            {activeTab==="Videos" && <ChannelVideoGrid/>}
            {activeTab==="Playlists" && <PlaylistGrid playlists={playlists}/>}
            {activeTab==="Tweets" && <ChannelTweets/>}
            {activeTab === "Following" && <FollowingGrid />}


        </div>
        </Layout>
    )
}

export default Profile;