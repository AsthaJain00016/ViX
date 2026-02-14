import VideoPlayer from "../components/video/VideoPlayer";
import VideoMeta from "../components/video/VideoMeta";
import Comments from "../components/video/Comments";
import SuggestedVideos from "../components/Layout/SuggestedVideos";
import VideoOverviewButton from "../components/ai/VideoOverviewButton";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { fetchVideoById } from "../api/video.api";
import { addToWatchHistory } from "../api/user.api";

const Watch=()=>{
    const {videoId}=useParams();
    const [video,setVideo]=useState(null)
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const loadVideo=async()=>{
            try{
                const res=await fetchVideoById(videoId)
                console.log(res)
                setVideo(res.data.data)
                
                // Add video to watch history
                try {
                    await addToWatchHistory(videoId);
                } catch (error) {
                    console.error("Failed to add to watch history:", error);
                }
            }catch(error){
                console.error(error)
            }
            finally {setLoading(false)}
        }

        loadVideo()
    },[videoId])
        if (loading) {
        return (
            <Layout>
                <div className="text-gray-400">Loading video...</div>
            </Layout>
        );
    }

    if (!video) {
        return (
            <Layout>
                <div className="text-red-400">Unable to load video. Please check server and try again.</div>
            </Layout>
        );
    }

        return(
                <Layout>
                <div className="grid grid-cols-12 gap-6 p-6 text-white">
                        <div className="col-span-8">
                                <VideoPlayer src={video.videoFile || ""}/>
                                <div className="flex justify-between items-center my-4">
                                        <VideoMeta video={video}/>
                                        <VideoOverviewButton videoId={video._id} videoTitle={video.title}/>
                                </div>
                                <Comments video={video}/>
                        </div>
                        <div className="col-span-4">
                                <SuggestedVideos currentVideoId={videoId}/>
                        </div>
                </div>
                </Layout>
        )
}

export default Watch