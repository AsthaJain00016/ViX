import { useEffect, useState } from "react";
import { fetchSavedVideos, toggleSaveVideo } from "../../api/user.api";
import SearchVideoList from "./SearchVideoList";

const SavedVideo = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  const load = async (p = 1) => {
    try {
      setLoading(true);
      const res = await fetchSavedVideos({ page: p, limit });
      // res shape: { data: [...], pagination: { totalSavedVideos, page, limit, totalPages } }
      setVideos(res.data || []);
      setTotalPages(res.pagination?.totalPages || 1);
      setPage(res.pagination?.page || p);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemove = async (videoId) => {
    try {
      await toggleSaveVideo(videoId);
      // reload current page after removal
      load(page);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePrev = () => {
    if (page <= 1) return;
    load(page - 1);
  };

  const handleNext = () => {
    if (page >= totalPages) return;
    load(page + 1);
  };

  return (
    <div className="">
      {loading ? (
        <div className="text-gray-300">Loading saved videos...</div>
      ) : videos.length === 0 ? (
        <div className="text-gray-300">No saved videos yet.</div>
      ) : (
        <>
          <div className="mb-4">
            <SearchVideoList videos={videos} />
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePrev}
              disabled={page <= 1}
              className={`px-3 py-1 rounded ${page <= 1 ? 'bg-neutral-700 text-gray-400' : 'bg-white text-black'}`}>
              Previous
            </button>

            <div className="text-gray-300">Page {page} of {totalPages}</div>

            <button
              onClick={handleNext}
              disabled={page >= totalPages}
              className={`px-3 py-1 rounded ${page >= totalPages ? 'bg-neutral-700 text-gray-400' : 'bg-white text-black'}`}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SavedVideo;
