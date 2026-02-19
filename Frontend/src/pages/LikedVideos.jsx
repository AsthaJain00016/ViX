import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { fetchLikedVideos } from "../api/like.api";
import SearchVideoList from "../components/video/SearchVideoList";
import { useNavigate } from "react-router-dom"; 
const LikedVideos = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigate=useNavigate()
    useEffect(() => {
        const loadVideos = async () => {
            try {
                const result = await fetchLikedVideos()
                const items = result?.data?.data?.data || [];
                // likes endpoint returns Like documents with a `video` field
                const vids = items.map(i => i.video || i);
                setVideos(vids)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        loadVideos();
    }, [])
    return (
      <Layout>
      <div className="max-w-6xl mx-auto px-6 py-8 text-white">

        {/* 🔥 Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">
            ❤️ Liked Videos
          </h1>
          <p className="text-zinc-400 text-sm">
            Videos you’ve liked will appear here.
          </p>
        </div>

        {/* 🔥 Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-zinc-900 rounded-xl h-52 animate-pulse"
              />
            ))}
          </div>
        ) : videos.length === 0 ? (

          /* 🔥 Empty State */
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-xl font-semibold mb-2">
              No liked videos yet
            </h2>
            <p className="text-zinc-400 mb-6 max-w-md">
              Explore videos and tap the like button to save them here.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-full font-medium"
            >
              Explore Videos
            </button>
          </div>

        ) : (

          <>
            {/* 🔥 Stats Row */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-zinc-400 text-sm">
                {videos.length} video{videos.length > 1 && "s"}
              </p>

              <div className="flex gap-2">
                <button className="px-4 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-sm hover:bg-zinc-800 transition">
                  Latest
                </button>
                <button className="px-4 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-sm hover:bg-zinc-800 transition">
                  Oldest
                </button>
              </div>
            </div>

            {/* 🔥 Video List */}
            <SearchVideoList videos={videos} />
          </>
        )}

      </div>
    </Layout>
    )
}
export default LikedVideos