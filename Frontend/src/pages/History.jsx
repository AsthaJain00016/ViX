import Layout from "../components/Layout/Layout";
import { useEffect, useState, useMemo } from "react";
import { fetchWatchHistory } from "../api/user.api";
import { getVideoRecommendations } from "../api/ai.api";
import { formatDistanceToNow, isToday, isYesterday } from "date-fns";
import { Search, Trash2, Sparkles } from "lucide-react";
import { clearHistory } from "../api/user.api";

const History = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState(null);

  // ==============================
  // Fetch History
  // ==============================
  useEffect(() => {
    const loadWatchHistory = async () => {
      try {
        setLoading(true);
        const response = await fetchWatchHistory();
        const data = response.data.data || [];
        setVideos(data);
        setFilteredVideos(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load watch history");
      } finally {
        setLoading(false);
      }
    };
    loadWatchHistory();
  }, []);

  // ==============================
  // Search Filter
  // ==============================
  useEffect(() => {
    const filtered = videos.filter(video =>
      video.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredVideos(filtered);
  }, [search, videos]);

  const handleClearHistory = async () => {
    try {
        await clearHistory();
        setVideos([]); // update UI
    } catch (error) {
        console.error("Failed to clear history", error);
    }
};


  // ==============================
  // AI Insights
  // ==============================



const generateInsights = async () => {
  try {
    setAiLoading(true);

    const interests =
      videos.length > 0
        ? videos.slice(0, 5).map(v => v.title)
        : ["general trending videos"];

    const res = await getVideoRecommendations({ interests });

    console.log("AI FULL RESPONSE:", res);

    // ✅ CORRECT ACCESS
    const suggestions =
      res?.data.suggestions || "No AI insights available.";

    setAiSuggestions(suggestions);

  } catch (err) {
    console.error("AI Error:", err);
    setAiSuggestions("AI service is temporarily unavailable.");
  } finally {
    setAiLoading(false);
  }
};

  // ==============================
  // Grouping Logic
  // ==============================
  const groupedVideos = useMemo(() => {
    const groups = { Today: [], Yesterday: [], Earlier: [] };

    filteredVideos.forEach(video => {
      const date = new Date(video.updatedAt || video.createdAt);

      if (isToday(date)) groups.Today.push(video);
      else if (isYesterday(date)) groups.Yesterday.push(video);
      else groups.Earlier.push(video);
    });

    return groups;
  }, [filteredVideos]);

  // ==============================
  // Stats
  // ==============================
  const totalVideos = videos.length;

  return (
    <Layout>
      <div className="p-8 text-white min-h-screen bg-black">

        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Watch History</h1>
            <p className="text-gray-400 text-sm mt-1">
              You watched {totalVideos} videos
            </p>
          </div>

          <button
            onClick={handleClearHistory}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
          >
            <Trash2 size={18} />
            Clear History
          </button>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search in watch history..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-900 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* ================= AI INSIGHTS ================= */}
        <div className="bg-linear-to-r from-purple-900/40 to-blue-900/40 p-6 rounded-2xl mb-10 border border-purple-700/30">
          <div className="flex justify-between items-center mb-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Sparkles size={18} />
              AI Insights
            </h2>

            <button
              onClick={generateInsights}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm"
            >
              {aiLoading ? "Analyzing..." : "Generate"}
            </button>
          </div>

          {aiSuggestions ? (
            <div className="text-gray-300 whitespace-pre-wrap">
              {aiSuggestions}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              Let AI analyze your watch history and suggest what to watch next.
            </p>
          )}
        </div>

        {/* ================= VIDEO GROUPS ================= */}
        {!loading && videos.length === 0 && (
  <div className="flex flex-col items-center justify-center mt-20 text-center">
    
    {/* Icon */}
    <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center mb-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 text-zinc-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m-6 4h6a2 2 0 002-2V8a2 2 0 00-2-2H9a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    </div>

    {/* Heading */}
    <h2 className="text-2xl font-semibold text-white mb-2">
      Your watch history is empty
    </h2>

    {/* Subtext */}
    <p className="text-zinc-400 max-w-md mb-6">
      Start watching videos and they’ll appear here. Your activity helps us personalize recommendations for you.
    </p>

    {/* Buttons */}
    <div className="flex gap-4">
      <button
        onClick={() => navigate("/")}
        className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg text-white font-medium transition"
      >
        Explore Videos
      </button>

      <button
        onClick={generateInsights}
        className="bg-zinc-800 hover:bg-zinc-700 px-6 py-2 rounded-lg text-white font-medium transition"
      >
        Get AI Suggestions
      </button>
    </div>
  </div>
)}

        {loading ? (
          <p className="text-gray-400">Loading history...</p>
        ) : (
          Object.entries(groupedVideos).map(([group, vids]) =>
            vids.length > 0 && (
              <div key={group} className="mb-10">
                <h2 className="text-xl font-semibold mb-4">{group}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {vids.map(video => (
                    <div
                      key={video._id}
                      className="bg-neutral-900 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
                    >
                      <div className="relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-44 object-cover"
                        />

                        {/* Watch Progress Bar */}
                        <div className="absolute bottom-0 left-0 h-1 bg-red-600"
                          style={{ width: `${video.watchProgress || 70}%` }}
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="text-sm font-medium line-clamp-2">
                          {video.title}
                        </h3>
                        <p className="text-gray-400 text-xs mt-1">
                          {formatDistanceToNow(
                            new Date(video.updatedAt || video.createdAt),
                            { addSuffix: true }
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )
        )}
      </div>
    </Layout>
  );
};

export default History;
