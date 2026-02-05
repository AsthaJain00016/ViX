const FollowingCard = ({ user }) => {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-xl p-4 hover:bg-[#161616] transition">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-14 h-14 rounded-full object-cover"
        />

        <div className="flex-1">
          <h3 className="font-semibold text-white">{user.name}</h3>
          <p className="text-sm text-gray-400">@{user.username}</p>
          <p className="text-xs text-gray-500 mt-1">
            {user.followers} followers
          </p>
        </div>

        <button className="px-4 py-1.5 text-sm rounded-full bg-purple-600 hover:bg-purple-700 transition">
          Following
        </button>
      </div>
    </div>
  );
};

export default FollowingCard;
