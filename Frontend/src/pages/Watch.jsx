import VideoPlayer from "../components/video/VideoPlayer";
import VideoMeta from "../components/video/VideoMeta";
import Comments from "../components/video/Comments";
import SuggestedVideos from "../components/Layout/SuggestedVideos";
import Layout from "../components/Layout/Layout";

const Watch=()=>{
    return(
        <Layout>
        <div className="grid grid-cols-12 gap-6 p-6 text-white">
            <div className="col-span-8">
                <VideoPlayer src={"/sample.mp4"}/>
                <VideoMeta/>
                <Comments/>
            </div>
            <div className="col-span-4">
                <SuggestedVideos/>
            </div>
        </div>
        </Layout>
    )
}

export default Watch