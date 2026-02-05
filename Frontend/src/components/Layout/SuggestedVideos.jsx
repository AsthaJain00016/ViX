const SuggestedVideos = () => {
  return (
    <div className="flex flex-col gap-3">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex gap-3 cursor-pointer">
          <img
            src={`https://picsum.photos/200/120?random=${i}`}
            className="w-40 h-24 rounded object-cover"
          />
          <div>
            <p className="text-sm font-medium line-clamp-2">
              How does a browser work?
            </p>
            <p className="text-xs text-gray-400">100K views • 18 hours ago</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuggestedVideos;
