const PlaylistInfo = () => {
  return (
    <div className="sticky top-20">
      {/* Thumbnail */}
      <div className="relative rounded-xl overflow-hidden">
        <img
          src="https://via.placeholder.com/600x400"
          alt="playlist"
          className="w-full h-64 object-cover"
        />

        <span className="absolute bottom-2 right-2 bg-black/80 text-xs px-2 py-1 rounded">
          32 videos
        </span>
      </div>

      {/* Playlist details */}
      <h1 className="mt-4 text-xl font-semibold">
        How to choose the right customer for your photo business?
      </h1>

      <p className="text-sm text-gray-400 mt-1">
        Playlist • 100K views • 18 hours ago
      </p>

      {/* Channel info */}
      <div className="flex items-center gap-3 mt-4">
        <img
          src="https://via.placeholder.com/40"
          alt="channel"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-medium">Lex Fridman</p>
          <p className="text-sm text-gray-400">705K Followers</p>
        </div>
      </div>
    </div>
  );
};

export default PlaylistInfo;
