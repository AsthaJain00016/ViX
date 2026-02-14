import { useState } from "react";
import { Link } from "react-router-dom";

const PlaylistCard = ({ playlist, isOwner = false, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  const videoCount = playlist.videos?.length || 0;
  const thumbnailUrl =
    playlist.videos?.[0]?.thumbnail || "https://via.placeholder.com/320x180?text=Playlist";

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition duration-200 group">
      <div className="relative">
        <Link 
          to={`/playlist/${playlist._id}`}
          className="block relative"
        >
          <img
            src={thumbnailUrl}
            alt={playlist.name}
            className="w-full h-40 object-cover group-hover:opacity-80 transition"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition flex items-center justify-center">
            <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition" 
                 fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </Link>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded text-xs text-white">
          {videoCount} {videoCount === 1 ? "video" : "videos"}
        </div>
        {isOwner && (
          <div
            className="absolute top-2 right-2"
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
          >
            <button className="bg-black bg-opacity-70 hover:bg-opacity-100 text-white rounded-full p-2 transition">
              ⋯
            </button>
            {showActions && (
              <div className="absolute right-0 mt-1 bg-gray-900 rounded shadow-lg z-10 min-w-max">
                <button
                  onClick={() => {
                    onEdit(playlist);
                    setShowActions(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800 transition border-b border-gray-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(playlist._id);
                    setShowActions(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 transition"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-3">
        <Link 
          to={`/playlist/${playlist._id}`}
          className="block"
        >
          <h3 className="text-white font-semibold truncate hover:text-purple-400 transition">
            {playlist.name}
          </h3>
        </Link>
        <p className="text-gray-400 text-sm truncate">{playlist.description}</p>
        <div className="mt-2 text-xs text-gray-500">
          Created by {playlist.owner?.username || "Unknown"}
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
