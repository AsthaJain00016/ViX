const VideoMeta = () => {
  return (
    <div className="mt-4 text-white">
      <h1 className="text-xl font-semibold">
        Lex Fridman plays Red Dead Redemption 2
      </h1>

      <p className="text-gray-400 text-sm mt-1">
        109,067 views • 18 hours ago
      </p>

      {/* Channel + Actions */}
      <div className="flex justify-between items-center mt-4">
        {/* Channel */}
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/100"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium">Lex Fridman</p>
            <p className="text-xs text-gray-400">705K followers</p>
          </div>
          <button className="ml-4 bg-purple-600 px-4 py-1.5 rounded-md text-sm">
            Follow
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="px-3 py-1 bg-neutral-800 rounded">👍 2</button>
          <button className="px-3 py-1 bg-neutral-800 rounded">👎</button>
          <button className="px-3 py-1 bg-neutral-800 rounded">💾 Save</button>
        </div>
      </div>

      {/* Description */}
      <div className="mt-4 bg-neutral-900 p-3 rounded-lg text-sm text-gray-300">
        TimUrban is the author of the blog Wait But Why and a new book
        "What's Our Problem?" A Self-Help Book...
      </div>
    </div>
  );
};

export default VideoMeta;
