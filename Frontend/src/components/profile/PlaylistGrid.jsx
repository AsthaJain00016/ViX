import { useState, useEffect } from "react";
import { fetchUsersPlaylist, createPlaylist, deletePlaylist, updatePlaylist } from "../../api/playlist.api";
import PlaylistCard from "./PlaylistCard";

const PlaylistGrid = ({ userId, isOwner = false, onRefresh }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const loadPlaylists = async () => {
    setLoading(true);
    try {
      const response = await fetchUsersPlaylist(userId);
      // Handle ApiResponse structure: { statusCode, data: [...], message }
      const playlistsData = Array.isArray(response.data) 
        ? response.data 
        : (Array.isArray(response.data?.data) ? response.data.data : []);
      setPlaylists(playlistsData);
    } catch (error) {
      console.error("Error fetching playlists:", error);
      setPlaylists([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      loadPlaylists();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description) return;

    try {
      setSubmitting(true);
      if (editingId) {
        // Update existing playlist
        const response = await updatePlaylist(editingId, { name, description });
        const updatedPlaylist = response.data?.data || response.data;
        setPlaylists(playlists.map(p => p._id === editingId ? updatedPlaylist : p));
        setEditingId(null);
      } else {
        // Create new playlist
        const response = await createPlaylist({ name, description });
        const newPlaylist = response.data?.data || response.data;
        setPlaylists([newPlaylist, ...playlists]);
      }
      setName("");
      setDescription("");
      setShowForm(false);
    } catch (err) {
      console.error("Error saving playlist:", err);
      alert("Failed to save playlist: " + (err?.response?.data?.message || err?.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (playlistId) => {
    if (!window.confirm("Are you sure you want to delete this playlist?")) return;

    try {
      await deletePlaylist(playlistId);
      setPlaylists(playlists.filter(p => p._id !== playlistId));
    } catch (err) {
      console.error("Error deleting playlist:", err);
      alert("Failed to delete playlist: " + (err?.response?.data?.message || err?.message));
    }
  };

  const handleEdit = (playlist) => {
    setEditingId(playlist._id);
    setName(playlist.name);
    setDescription(playlist.description);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setName("");
    setDescription("");
  };

  return (
    <div className="mt-6">
      {isOwner && (
        <div className="mb-6">
          <button
            onClick={() => {
              if (showForm) handleCancel();
              else setShowForm(true);
            }}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-semibold transition"
          >
            {showForm ? "Cancel" : "+ Create Playlist"}
          </button>

          {showForm && (
            <form onSubmit={handleSubmit} className="mt-4 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-white text-lg font-semibold mb-3">
                {editingId ? "Edit Playlist" : "Create New Playlist"}
              </h3>
              <input
                type="text"
                placeholder="Playlist name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 bg-gray-900 text-white rounded mb-3 border border-gray-700 focus:border-purple-500 outline-none"
                required
              />
              <textarea
                placeholder="Playlist description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 bg-gray-900 text-white rounded mb-3 border border-gray-700 focus:border-purple-500 outline-none resize-none"
                rows="3"
                required
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold transition"
                  disabled={submitting}
                >
                  {submitting ? "Saving..." : editingId ? "Update Playlist" : "Create Playlist"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {loading ? (
        <div className="text-white text-center py-12">Loading playlists...</div>
      ) : playlists.length === 0 ? (
        <div className="text-gray-400 text-center py-12">
          {isOwner ? "No playlists yet. Create your first playlist!" : "No playlists available."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist._id}
              playlist={playlist}
              isOwner={isOwner}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistGrid;
