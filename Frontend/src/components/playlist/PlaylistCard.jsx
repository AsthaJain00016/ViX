const PlaylistCard = ({ playlist }) => {
  return (
    <div className="group cursor-pointer">
      {/* Thumbnail */}
      <div className="relative rounded-xl overflow-hidden">
        <img
          src={playlist.thumbnail}
          alt={playlist.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Video count badge */}
        <span className="absolute bottom-2 right-2 bg-black/80 text-xs px-2 py-1 rounded">
          {playlist.videoCount} videos
        </span>
      </div>

      {/* Content */}
      <div className="mt-3">
        <h3 className="font-semibold text-white line-clamp-2">
          {playlist.title}
        </h3>

        <p className="text-sm text-gray-400 mt-1">
          {playlist.views} Views • {playlist.time}
        </p>

        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {playlist.description}
        </p>
      </div>
    </div>
  );
};

export default PlaylistCard;
