import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { fetchPlaylistById, removeVideoFromPlaylist } from "../api/playlist.api";
import { useAuth } from "../context/AuthContext";

const PlaylistView = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        const response = await fetchPlaylistById(playlistId);
        // Handle ApiResponse structure: { statusCode, data: {...}, message }
        const playlistData = response.data?.data || response.data;
        setPlaylist(playlistData);
      } catch (error) {
        console.error("Error fetching playlist:", error);
        alert("Failed to load playlist");
        navigate("/profile");
      } finally {
        setLoading(false);
      }
    };

    loadPlaylist();
  }, [playlistId, navigate]);

  const handlePlayVideo = (videoId) => {
    navigate(`/watch/${videoId}`);
  };

  const handleRemoveVideo = async (videoId) => {
    if (!window.confirm("Remove this video from playlist?")) return;

    try {
      await removeVideoFromPlaylist(playlistId, videoId);
      setPlaylist({
        ...playlist,
        videos: playlist.videos.filter((v) => v._id !== videoId),
      });
    } catch (error) {
      console.error("Error removing video:", error);
      alert("Failed to remove video");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-white text-center py-12">Loading playlist...</div>
      </Layout>
    );
  }

  if (!playlist) {
    return (
      <Layout>
        <div className="text-white text-center py-12">Playlist not found</div>
      </Layout>
    );
  }

  const isOwner = user?._id === playlist.owner?._id;

  return (
    <Layout>
      <div className="text-white">
        {/* Playlist Header */}
        <div className="bg-linear-to-b from-gray-900 to-gray-800 p-6 rounded-lg mb-6">
          <h1 className="text-4xl font-bold mb-2">{playlist.name}</h1>
          <p className="text-gray-400 mb-4">{playlist.description}</p>
          <div className="flex items-center gap-4">
            <img
              src={playlist.owner?.avatar || "https://via.placeholder.com/40x40"}
              alt={playlist.owner?.username}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm text-gray-400">By {playlist.owner?.username}</p>
              <p className="text-sm text-gray-500">
                {playlist.videos?.length || 0} videos
              </p>
            </div>
          </div>
        </div>

        {/* Videos List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Videos in this Playlist</h2>
          {!playlist.videos || playlist.videos.length === 0 ? (
            <div className="text-gray-400 text-center py-12">
              No videos in this playlist yet
            </div>
          ) : (
            <div className="space-y-3">
              {playlist.videos.map((video, index) => (
                <div
                  key={video._id}
                  className="flex gap-4 bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition group cursor-pointer"
                  onClick={(e) => {
                    // Only navigate if clicking on the thumbnail or title, not on buttons
                    if (!e.target.closest("button")) {
                      handlePlayVideo(video._id);
                    }
                  }}
                >
                  <div 
                    className="shrink-0 w-32 h-20 bg-gray-900 rounded relative overflow-hidden"
                    onClick={() => handlePlayVideo(video._id)}
                  >
                    <img
                      src={video.thumbnail || "https://via.placeholder.com/320x180?text=Video"}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/320x180?text=Video";
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 px-1.5 py-0.5 text-xs rounded">
                      {Math.floor(video.duration / 60)}:
                      {String(Math.floor((video.duration % 60) % 60)).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 
                        className="font-semibold text-white hover:text-purple-400 cursor-pointer"
                        onClick={() => handlePlayVideo(video._id)}
                      >
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {video.views || 0} views
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {video.owner?.username}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">{index + 1}</span>
                    {isOwner && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveVideo(video._id);
                        }}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PlaylistView;
