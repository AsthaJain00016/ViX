import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import VideoGrid from "../components/video/VideoGrid";
import { fetchAllVideos } from "../api/video.api";

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadVideos = async () => {
            try {
                const result = await fetchAllVideos({ limit: 100 });
                setVideos(result)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        loadVideos();

    }, []);


    return (
        <Layout>
            {loading ? (<div className="text-gray-400"></div>) : (<VideoGrid videos={videos} />)}
        </Layout>
    )
}

export default Home