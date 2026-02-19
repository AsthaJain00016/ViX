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
    <div className="flex flex-col gap-4">
      {videos.map((video) => (
        <div
          key={video._id}
          className="flex gap-3 cursor-pointer hover:bg-neutral-900 p-2 rounded-lg transition"
          onClick={() => navigate(`/watch/${video._id}`)}
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-40 h-24 object-cover rounded-lg"
          />

          <div className="flex-1">
            <p className="text-sm font-medium line-clamp-2">
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
