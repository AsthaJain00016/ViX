import { useState, useEffect } from "react";
import { fetchUsersPlaylist, addVideoToPlaylist } from "../../api/playlist.api";
import { useAuth } from "../../context/AuthContext";

const AddToPlaylist = ({ videoId, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [successMessage, setSuccessMessage] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen && user?._id) {
      loadPlaylists();
    }
  }, [isOpen, user]);

  const loadPlaylists = async () => {
    setLoading(true);
    try {
      const response = await fetchUsersPlaylist(user._id);
      // Handle ApiResponse structure: { statusCode, data: [...], message }
      const playlistsData = Array.isArray(response.data)
        ? response.data
        : (Array.isArray(response.data?.data) ? response.data.data : []);
      setPlaylists(playlistsData);
      // Initialize selected IDs based on which playlists already contain this video
      const selected = new Set();
      playlistsData?.forEach((playlist) => {
        if (playlist.videos?.some((v) => v._id === videoId || v === videoId)) {
          selected.add(playlist._id);
        }
      });
      setSelectedIds(selected);
    } catch (error) {
      console.error("Error loading playlists:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePlaylist = async (playlistId, newCheckedState) => {
    try {
      if (newCheckedState) {
        // Add video to playlist
        console.log("Adding video:", videoId, "to playlist:", playlistId);
        const response = await addVideoToPlaylist(playlistId, videoId);
        console.log("Playlist response:", response);

        const newSelected = new Set(selectedIds);
        newSelected.add(playlistId);
        setSelectedIds(newSelected);

        // Show success message and close after 1.5 seconds
        const playlistName = playlists.find(p => p._id === playlistId)?.name || "Playlist";
        setSuccessMessage(`✓ Added to "${playlistName}"`);
        setTimeout(() => {
          setIsOpen(false);
          setSuccessMessage("");
        }, 1500);
      } else {
        // Remove video from playlist (just update UI for now)
        const newSelected = new Set(selectedIds);
        newSelected.delete(playlistId);
        setSelectedIds(newSelected);
      }
    } catch (error) {
      console.error("Error updating playlist:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "Failed to update playlist";
      console.error("Full error response:", error?.response?.data);
      alert("Error: " + errorMessage);
    }
  };

  if (!user) {
    return (
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white transition ${className}`}
        disabled
      >
        📋 Sign in to add to playlist
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white transition ${className}`}
      >
        📋 Add to Playlist
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-900 rounded-lg shadow-lg z-20 border border-gray-700">
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-white font-semibold">Add to Playlist</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>

            {successMessage && (
              <div className="mb-3 p-2 bg-green-900 bg-opacity-50 border border-green-700 rounded text-green-300 text-sm text-center">
                {successMessage}
              </div>
            )}

            {loading ? (
              <div className="text-gray-400 text-sm">Loading playlists...</div>
            ) : playlists.length === 0 ? (
              <div className="text-gray-400 text-sm">No playlists yet. Create one to add videos!</div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {playlists.map((playlist) => {
                  const isSelected = selectedIds.has(playlist._id);
                  return (
                    <label
                      key={playlist._id}
                      className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) =>
                          handleTogglePlaylist(playlist._id, e.target.checked)
                        }
                        className="w-4 h-4 rounded accent-purple-600"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm truncate">
                          {playlist.name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {playlist.videos?.length || 0} videos
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToPlaylist;
