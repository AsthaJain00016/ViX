import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllVideos } from "../../api/video.api";
import { GetThumbnail } from "../common/GetThumbnail";

const SuggestedVideos = ({ currentVideoId }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchAllVideos({ limit: 20 });

        const filtered =
          (data || []).filter(
            (video) => video._id !== currentVideoId
          );

        setVideos(filtered.slice(0, 10));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [currentVideoId]);

  if (loading) {
    return <div className="text-gray-400">Loading...</div>;
  }

  if (videos.length === 0) {
    return (
      <div className="text-gray-400">
        No suggested videos found.
      </div>
    );
  }

  return (
    <div className="space-y-4 ">
      {videos.map((video) => (
        <div
          key={video._id}
          className="group flex gap-4 p-3 rounded-xl 
bg-white/5 border border-white/5 
hover:bg-white/10 hover:border-purple-500/20
transition-all duration-300 cursor-pointer"

          onClick={() => navigate(`/watch/${video._id}`)}
        >
          <img
            src={GetThumbnail(video.videoFile)}
            alt={video.title}
            className="w-40 h-24 rounded-xl object-cover 
group-hover:scale-105 transition duration-300"


          />

          <div className="flex-1">
            <p className="text-sm font-medium line-clamp-2 group-hover:text-purple-400 transition">

              {video.title}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {video.views} views
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuggestedVideos;
