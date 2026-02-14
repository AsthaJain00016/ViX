import Layout from "../components/Layout/Layout";
import { useEffect, useState } from "react";
import { fetchWatchHistory } from "../api/user.api";
import VideoGrid from "../components/video/VideoGrid";

const History = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadWatchHistory = async () => {
            try {
                setLoading(true);
                const response = await fetchWatchHistory();
                setVideos(response.data.data || []);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch watch history:", err);
                setError("Failed to load watch history");
                setVideos([]);
            } finally {
                setLoading(false);
            }
        };

        loadWatchHistory();
    }, []);

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-3xl font-bold text-white mb-6">Watch History</h1>
                {error && (
                    <div className="text-red-400 mb-4">{error}</div>
                )}
                <VideoGrid videos={videos} loading={loading} />
            </div>
        </Layout>
    );
};

export default History;