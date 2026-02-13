import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { fetchLikedVideos } from "../api/like.api";
import SearchVideoList from "../components/video/SearchVideoList";

const LikedVideos=()=>{
    const [videos,setVideos]=useState([]);
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const loadVideos=async()=>{
            try{
                const result=await fetchLikedVideos()
                const items = result?.data?.data?.data || [];
                // likes endpoint returns Like documents with a `video` field
                const vids = items.map(i => i.video || i);
                setVideos(vids)
            }catch(error){
                console.error(error)
            }finally{
                setLoading(false)
            }
        }
        loadVideos();
    },[])
    return(
        <Layout>
            {loading ? (
                <p>Loading...</p>
            ) : videos.length === 0 ? (
                <p>No liked videos yet.</p>
            ) : (
                <SearchVideoList videos={videos} />
            )}
        </Layout>
    )
}
export default LikedVideos