import { useEffect, useState } from "react";
import ChannelHeader from "../components/profile/ChannelHeader";
import ChannelTabs from "../components/profile/ChannelTabs";
import ChannelVideoGrid from "../components/profile/ChannelVideoGrid";
import PlaylistGrid from "../components/profile/PlaylistGrid";
import ChannelBanner from "../components/profile/ChannelBanner";
import Layout from "../components/Layout/Layout";

import ChannelTweets from "../components/profile/ChannelTweets";
import FollowingGrid from "../components/profile/FollwingGrid";
import { useAuth } from "../context/AuthContext";
import { fetchChannelSubscribers, fetchSubscribedChannels } from "../api/subscription.api";
import { fetchUserVideos } from "../api/video.api";
const Profile = () => {
    const { user, loading } = useAuth();
    const [subscribers, setSubscribers] = useState(0)
    const [channels, setChannels] = useState(0)
    const [videos, setVideos] = useState(null)
    const [loadingVideos, setLoadingVideos] = useState(true)
    const loadVideos = async () => {
        setLoadingVideos(true)
        try {
            const resVideos = await fetchUserVideos()
            setVideos(resVideos || [])
        } catch (error) {
            console.error("Error fetching videos:", error)
            setVideos([])
        } finally {
            setLoadingVideos(false)
        }
    }

    useEffect(() => {
        if (user && user._id) {
            const response = async () => {
                const resSubscriber = await fetchChannelSubscribers(user._id)
                setSubscribers(resSubscriber)
                const resChannel = await fetchSubscribedChannels(user._id)
                setChannels(resChannel)
                await loadVideos()
            }
            response()
        }
    }, [user])

    const handleSubscriptionChange = (isSubscribed) => {
        setSubscribers(prev => isSubscribed ? prev + 1 : prev - 1);
    };

    const [activeTab, setActiveTab] = useState("Videos")

    if (loading) return <Layout><div className="text-white">Loading...</div></Layout>;
    if (!user) return <Layout><div className="text-white">Please log in to view your profile.</div></Layout>;

    return (
        <Layout>
            <div className="text-white">
                <ChannelBanner coverImage={user.coverImage} />
                <ChannelHeader user={user} subscribers={subscribers} channels={channels} isSubscribed={false} onChange={handleSubscriptionChange} />
                <ChannelTabs active={activeTab} setActive={setActiveTab} />
                {activeTab === "Videos" && <ChannelVideoGrid videos={videos} loading={loadingVideos} isOwner={true} onRefresh={loadVideos} />}
                {activeTab === "Playlists" && <PlaylistGrid userId={user._id} isOwner={true} onRefresh={loadVideos} />}
                {activeTab === "Tweets" && <ChannelTweets />}
                {activeTab === "Following" && <FollowingGrid userId={user._id} />}


            </div>
        </Layout>
    )
}

export default Profile;