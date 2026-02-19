import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import VideoPlayer from "../components/video/VideoPlayer";
import VideoMeta from "../components/video/VideoMeta";
import Comments from "../components/video/Comments";
import SuggestedVideos from "../components/Layout/SuggestedVideos";
import VideoOverviewButton from "../components/ai/VideoOverviewButton";
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
      <div className="max-w-400 mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          
          {/* LEFT SECTION */}
          <div className="col-span-12 lg:col-span-8">
            <VideoPlayer src={video?.videoFile} />

            <div className="flex justify-between items-center mt-4">
              <VideoMeta video={video} />
              <VideoOverviewButton
                videoId={video._id}
                videoTitle={video.title}
              />
            </div>

            <Comments video={video} />
          </div>

          {/* RIGHT SECTION */}
          <div className="col-span-12 lg:col-span-4">
            <SuggestedVideos currentVideoId={videoId} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Watch;
