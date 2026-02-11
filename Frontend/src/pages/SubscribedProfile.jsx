import { useEffect, useState } from "react";
import ChannelHeader from "../components/profile/channelHeader";
import ChannelTabs from "../components/profile/channelTabs";
import ChannelVideoGrid from "../components/profile/ChannelVideoGrid";
import ChannelBanner from "../components/profile/channelBanner";
import Layout from "../components/Layout/Layout";
import ChannelTweets from "../components/profile/ChannelTweets";
import FollowingGrid from "../components/profile/FollwingGrid";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { fetchUserById } from "../api/user.api";

const SubscribedProfile = () => {
    const { loading: authLoading } = useAuth();
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [subscribers, setSubscribers] = useState(0);
    const [channels, setChannels] = useState(0);
    console.log("ID ",id)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const userData = await fetchUserById(id);
                setUser(userData);
                setSubscribers(userData.subscribersCount || 0);
                setChannels(userData.channelSubscribedToCount || 0);
            } catch (err) {
                console.error("Error fetching user:", err);
                setError("Failed to load user profile");
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchUser();
            console.log("User",user)

        }
    }, [id]);

    const handleSubscriptionChange = (isSubscribed) => {
        setSubscribers(prev => isSubscribed ? prev + 1 : prev - 1);
    };

    const [activeTab, setActiveTab] = useState("Following");

    if (authLoading || loading) return <Layout><div className="text-white">Loading...</div></Layout>;
    if (error) return <Layout><div className="text-white">{error}</div></Layout>;
    if (!user) return <Layout><div className="text-white">User not found.</div></Layout>;

    return (
        <Layout>
            <div className="text-white">
                <ChannelBanner coverImage={user.coverImage} />
                <ChannelHeader user={user} subscribers={subscribers} channels={channels} isSubscribed={user.isSubscribed} onChange={handleSubscriptionChange} />
                <ChannelTabs active={activeTab} setActive={setActiveTab} />
                {activeTab === "Videos" && <ChannelVideoGrid />}
                {activeTab === "Playlists" && <div>Playlists content here</div>}
                {activeTab === "Tweets" && <ChannelTweets userId={id} />}
                {activeTab === "Following" && <FollowingGrid />}
            </div>
        </Layout>
    );
};

export default SubscribedProfile;
