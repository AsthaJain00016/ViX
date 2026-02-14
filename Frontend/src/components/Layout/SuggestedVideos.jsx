import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllVideos } from "../../api/video.api";

const SuggestedVideos = ({ currentVideoId }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchAllVideos({ limit: 20 });
        // Filter out the currently playing video
        const filtered = data?.filter(video => video._id !== currentVideoId) || [];
        // Take only 8 videos after filtering
        setVideos(filtered.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [currentVideoId]);

  const formatTimeAgo = (date) => {
    const now = new Date();
    const published = new Date(date);
    const diffInSeconds = Math.floor((now - published) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return `${Math.floor(diffInSeconds / 604800)}w ago`;
  };

  const formatViewCount = (views) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M views`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K views`;
    return `${views} views`;
  };

  if (loading) {
    return <div className="text-gray-400">Loading videos...</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      {videos.map((video) => (
        <div
          key={video._id}
          className="flex gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate(`/watch/${video._id}`)}
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-40 h-24 rounded object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/200x120?text=No+Thumbnail";
            }}
          />
          <div className="flex-1">
            <p className="text-sm font-medium line-clamp-2">
              {video.title}
            </p>
            <p className="text-xs text-gray-400">
              {formatViewCount(video.views)} • {formatTimeAgo(video.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuggestedVideos;
