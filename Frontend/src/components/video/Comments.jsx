const Comments = () => {
  return (
    <div className="mt-6 text-white">
      <h2 className="text-lg font-semibold mb-3">5034 Comments</h2>

      {/* Add comment */}
      <input
        placeholder="Add a comment"
        className="w-full bg-black border border-neutral-700 rounded px-3 py-2 text-sm"
      />

      {/* Comment */}
      <div className="flex gap-3 mt-4">
        <img
          src="https://i.pravatar.cc/100?img=4"
          className="w-8 h-8 rounded-full"
        />
        <div>
          <p className="text-sm font-medium">
            Phoenix Baker <span className="text-gray-400 text-xs">just now</span>
          </p>
          <p className="text-gray-300 text-sm">Looks good!</p>
        </div>
      </div>
    </div>
  );
};

export default Comments;
