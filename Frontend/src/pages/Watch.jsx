import VideoPlayer from "../components/video/VideoPlayer";
import VideoMeta from "../components/video/VideoMeta";
import Comments from "../components/video/Comments";
import SuggestedVideos from "../components/Layout/SuggestedVideos";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { fetchVideoById } from "../api/video.api";

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

    return(
        <Layout>
        <div className="grid grid-cols-12 gap-6 p-6 text-white">
            <div className="col-span-8">
                <VideoPlayer src={video.videoFile}/>
                <VideoMeta video={video}/>
                <Comments videoId={videoId}/>
            </div>
            <div className="col-span-4">
                <SuggestedVideos/>
            </div>
        </div>
        </Layout>
    )
}

export default Watch