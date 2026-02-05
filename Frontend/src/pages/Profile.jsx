import { useState } from "react";
import ChannelHeader from "../components/profile/channelHeader";
import ChannelTabs from "../components/profile/channelTabs";
import ChannelVideoGrid from "../components/profile/ChannelVideoGrid";
import ChannelBanner from "../components/profile/channelBanner";
import Layout from "../components/Layout/Layout";
import PlaylistGrid from "../components/playlist/PlaylistGrid";
import { playlists } from "../data/playlist";
import ChannelTweets from "../components/profile/ChannelTweets";
import FollowingGrid from "../components/profile/FollwingGrid";
const Profile=()=>{
    const [activeTab,setActiveTab]=useState("Following")

    return(
        <Layout>
        <div className="text-white">
            <ChannelBanner/>
            <ChannelHeader/>
            <ChannelTabs active={activeTab} setActiveTab={setActiveTab}/>
            {activeTab==="Videos" && <ChannelVideoGrid/>}
            {activeTab==="Playlists" && <PlaylistGrid playlists={playlists}/>}
            {activeTab==="Tweets" && <ChannelTweets/>}
            {activeTab === "Following" && <FollowingGrid />}
            

        </div>
        </Layout>
    )
}

export default Profile;