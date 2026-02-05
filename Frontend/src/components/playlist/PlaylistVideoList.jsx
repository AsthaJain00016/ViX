const videos = [
  {
    id: 1,
    title: "Google and Pieces dropped some interesting updates",
    thumbnail: "https://via.placeholder.com/160x90",
    channel: "Yash Mittal",
    views: "100K",
    time: "18 hours ago",
  },
  {
    id: 2,
    title: "Terraform, fig & FreeAPI | Updates in Open Source",
    thumbnail: "https://via.placeholder.com/160x90",
    channel: "Yash Mittal",
    views: "100K",
    time: "18 hours ago",
  },
  {
    id: 3,
    title: "How to learn react | A React Roadmap",
    thumbnail: "https://via.placeholder.com/160x90",
    channel: "Yash Mittal",
    views: "100K",
    time: "18 hours ago",
  },
];

const PlaylistVideoList = () => {
  return (
    <div className="space-y-4">
      {videos.map((video, index) => (
        <div
          key={video.id}
          className="flex gap-4 p-2 rounded-lg hover:bg-white/5 cursor-pointer"
        >
          {/* Index */}
          <span className="w-6 text-gray-400">{index + 1}</span>

          {/* Thumbnail */}
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-40 h-24 rounded-lg object-cover"
          />

          {/* Info */}
          <div>
            <h3 className="font-medium line-clamp-2">
              {video.title}
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              {video.channel}
            </p>
            <p className="text-sm text-gray-500">
              {video.views} views • {video.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistVideoList;
