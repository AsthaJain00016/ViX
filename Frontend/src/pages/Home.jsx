import React from "react";
import Layout from "../components/Layout/Layout";
import VideoGrid from "../components/video/VideoGrid";
import { videos } from "../data/video";
export default function Home(){
    return(
        <Layout>
            <VideoGrid videos={videos}/>
        </Layout>
    )
}

