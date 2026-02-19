import { useEffect, useState } from "react";
import { fetchSavedVideos, toggleSaveVideo } from "../../api/user.api";
import SearchVideoList from "./SearchVideoList";
import { toast } from "react-toastify";

const SavedVideo = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSaved, setTotalSaved] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const load = async (p = 1) => {
    try {
      setLoading(true);
      const res = await fetchSavedVideos({ page: p, limit });

      setVideos(res.data || []);
      setTotalPages(res.pagination?.totalPages || 1);
      setPage(res.pagination?.page || p);
      setTotalSaved(res.pagination?.totalSavedVideos || 0);
    } catch (err) {
      toast.error("Failed to load saved videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(1);
  }, []);

  // 🔥 Remove single video (Optimistic UI)
  const handleRemove = async (videoId) => {
    const updated = videos.filter(v => v._id !== videoId);
    setVideos(updated);
    setTotalSaved(prev => prev - 1);

    try {
      await toggleSaveVideo(videoId);
      toast.success("Removed from saved");
    } catch (err) {
      toast.error("Something went wrong");
      load(page);
    }
  };

  // 🔥 Clear All
  const handleClearAll = async () => {
    try {
      await Promise.all(
        videos.map(v => toggleSaveVideo(v._id))
      );
      toast.success("All saved videos cleared");
      setShowModal(false);
      load(1);
    } catch {
      toast.error("Failed to clear videos");
    }
  };

  const handlePrev = () => {
    if (page > 1) load(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) load(page + 1);
  };

  return (
    <div>

      {/* Glass Stats Card */}
      <div className="mb-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-sm">Total Saved Videos</p>
          <h2 className="text-3xl font-bold text-white mt-1">
            {totalSaved}
          </h2>
        </div>

        {totalSaved > 0 && (
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition"
          >
            Clear All
          </button>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-44 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10"></div>
          ))}
        </div>
      ) : videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl">
          <div className="text-5xl mb-4">✨</div>
          <h3 className="text-xl font-semibold text-white">
            No saved videos yet
          </h3>
          <p className="text-gray-400 text-sm mt-2">
            Start saving videos to build your collection.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
            <SearchVideoList
              videos={videos}
              onRemove={handleRemove}
              showRemoveButton={true}
            />
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between backdrop-blur-xl bg-white/5 border border-white/10 p-4 rounded-2xl">
            <button
              onClick={handlePrev}
              disabled={page <= 1}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-white/10 disabled:text-gray-500 text-white rounded-lg text-sm transition"
            >
              ← Previous
            </button>

            <span className="text-gray-300 text-sm">
              Page <span className="text-white font-semibold">{page}</span> of{" "}
              <span className="text-white font-semibold">{totalPages}</span>
            </span>

            <button
              onClick={handleNext}
              disabled={page >= totalPages}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-white/10 disabled:text-gray-500 text-white rounded-lg text-sm transition"
            >
              Next →
            </button>
          </div>
        </>
      )}

      {/* 🔥 Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 w-96 shadow-2xl">
            <h3 className="text-white text-lg font-semibold mb-4">
              Clear all saved videos?
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedVideo;
