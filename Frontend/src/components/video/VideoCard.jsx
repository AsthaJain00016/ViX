import { useNavigate } from "react-router-dom"
import { deleteVideoById } from "../../api/video.api";
import { FormatDuration } from "../common/FormatDuration";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRef ,useState} from "react";
import { GetThumbnail } from "../common/GetThumbnail";
dayjs.extend(relativeTime);


export default function VideoCard({ video, isOwner = false, onRefresh }) {
    const navigate = useNavigate()  
    const videoRef=useRef(null)
    const hoverTimeoutRef = useRef(null);

    const [isHovered,setIsHovered]=useState(false)

    const handleMouseEnter=()=>{
        hoverTimeoutRef.current=setTimeout(()=>{
            setIsHovered(true);
           if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});;
            }

        },800)
    }

    const handleMouseLeave=()=>{
        if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
    }

    if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
    }
    }

    const handleDelete = async (e) => {
        e.stopPropagation();
        if (!confirm("Delete this video?")) return;
        try {
            await deleteVideoById(video._id);
            if (onRefresh) await onRefresh();
        } catch (err) {
            console.error("Failed to delete video", err);
        }
    }

    return (
        <div
            onClick={() => navigate(`/watch/${video._id}`)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="cursor-pointer group relative">
            <div className="relative rounded-xl overflow-hidden">
                
                <img
                    src={GetThumbnail(video.videoFile)}
                    alt={video.title}
                    className={`w-full h-44 object-cover hover:shadow-xl hover:scale-[1.03]  transition-all duration-300 ${isHovered? "opacity-0 scale-105":"opacity-100"}`}
                />
                <video
                ref={videoRef}
                src={video.videoFile}
                muted
                loop
                playsInline
                preload="metadata"
                className={`absolute inset-0 w-full h-44 object-cover transition-opacity duration-300 ${isHovered?"opacity-100":"opacity-0"}`}
                />
                <span className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-xl">
                    {FormatDuration(video.duration)}</span>

            </div>

            <div className="flex gap-3 mt-3">
                <img
                    src={video.owner.avatar}
                    alt="avatar"
                    className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                    <h3 className="text-sm text-white font-semibold  line-clamp-2">{video.title}</h3>

                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                    <span className="text-xs text-gray-400 mt-1"> {video.owner.username}</span>
                    <span>•</span>
                    <span className="text-xs text-gray-400 mt-1"> {video.views} Views </span>
                    <span>•</span>
                    <span className="text-xs text-gray-400 mt-1"> {dayjs(video.createdAt).fromNow()}</span>
                    </div>

                </div>
            </div>

            {isOwner && (
                <button onClick={handleDelete} className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
                    Delete
                </button>
            )}

        </div>
    )
}