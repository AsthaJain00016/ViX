import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import VideoPlayer from "../components/video/VideoPlayer";
import VideoMeta from "../components/video/VideoMeta";
import Comments from "../components/video/Comments";
import SuggestedVideos from "../components/Layout/SuggestedVideos";
import FloatingAISummary from "../components/ai/FloatingAiSummary"
import { fetchVideoById } from "../api/video.api";
import { addToWatchHistory } from "../api/user.api";

const Watch = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        setLoading(true);

        const res = await fetchVideoById(videoId);

        const videoData = res?.data?.data || res?.data || null;
        setVideo(videoData);

        if (videoData?._id) {
          await addToWatchHistory(videoData._id);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (videoId) loadVideo();
  }, [videoId]);

  if (loading) {
    return (
      <Layout>
        <div className="p-6 text-gray-400">Loading video...</div>
      </Layout>
    );
  }

  if (!video) {
    return (
      <Layout>
        <div className="p-6 text-red-400">
          Video not found or failed to load.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
  <div className="min-h-screen bg-[#0b0f19] text-white px-8 py-10">

    <div className="max-w-375 mx-auto grid grid-cols-12 gap-12">

      {/* LEFT SECTION */}
      <div className="col-span-12 xl:col-span-8 space-y-10">

        {/* AI Video Container */}
        <div className="relative group">
          
          {/* Ambient Glow */}
          <div className="absolute -inset-2 bg-linear-to-r 
              from-purple-600/20 via-blue-600/20 to-purple-600/20 
              blur-2xl opacity-40 group-hover:opacity-70 transition duration-700">
          </div>
          <FloatingAISummary videoId={video._id} />

          {/* Video Wrapper */}
          <div className="relative rounded-2xl overflow-hidden 
              bg-black border border-white/5 shadow-2xl">
            
            <video
              src={video?.videoFile}
              controls
              className="w-full rounded-2xl"
            />
           
          </div>

        </div>
        
        

        <VideoMeta video={video} />

        <Comments video={video} />

      </div>

      {/* RIGHT SECTION */}
      <div className="col-span-12 xl:col-span-4">
        <SuggestedVideos currentVideoId={videoId} />
      </div>

    </div>

  </div>
</Layout>

  );
};

export default Watch;
