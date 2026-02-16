import VideoCard from "./VideoCard";

export default function VideoGrid({ videos, loading, isOwner = false, onRefresh }) {
    if (loading) {
        return <div className="text-white">Loading videos...</div>;
    }

    if (!videos || !Array.isArray(videos) || videos.length === 0) {
        return <div className="text-white">No videos found.</div>;
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {
                videos.map((video) => (
                    <VideoCard key={video._id} video={video} isOwner={isOwner} onRefresh={onRefresh} />
                ))
            }
        </div>
    )
}
