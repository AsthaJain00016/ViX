import VideoCard from "./VideoCard";

export default function VideoGrid({videos}){
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {
                videos.map((video)=>(
                    <VideoCard key={video._id || video.id} video={video}/>
                ))
            }
        </div>
    )
}