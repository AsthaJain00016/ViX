import { useNavigate } from "react-router-dom"

export default function VideoCard({video}){
    const navigate=useNavigate()
    return(
        <div
        onClick={()=>navigate(`/watch/${video._id}`)}
         className="cursor-pointer group">
            <div className="relative rounded-xl overflow-hidden">
                <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
                    {video.duration}</span>

            </div>

            <div className="flex gap-3 mt-3">
                <img
                src={video.owner.avatar}
                alt="avatar"
                className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                    <h3 className="text-sm text-white font-semibold  line-clamp-2">{video.title}</h3>
                    <p className="text-xs text-gray-400 mt-1"> {video.owner.username} </p>
                    <p className="text-xs text-gray-400 mt-1"> {video.views}  </p>
                </div>
            </div>

        </div>
    )
}