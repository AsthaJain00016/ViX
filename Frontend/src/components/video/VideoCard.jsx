import { useNavigate } from "react-router-dom"
import { deleteVideoById } from "../../api/video.api";
import { FormatDuration } from "../common/FormatDuration";

export default function VideoCard({ video, isOwner = false, onRefresh }) {
    const navigate = useNavigate()

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
            className="cursor-pointer group relative">
            <div className="relative rounded-xl overflow-hidden">
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
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
                    <p className="text-xs text-gray-400 mt-1"> {video.owner.username} </p>
                    <p className="text-xs text-gray-400 mt-1"> {video.views} Views    </p>
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