const ChannelHeader = () => {
  return (
    <div className="flex items-center justify-between mt-6">
      <div className="flex items-center gap-6">
        <img
          src="https://via.placeholder.com/120"
          alt="avatar"
          className="w-28 h-28 rounded-full border-4 border-black"
        />

        <div>
          <h1 className="text-2xl font-semibold text-white">Yash Mittal</h1>
          <p className="text-gray-400">@YashMittal</p>
          <p className="text-sm text-gray-400 mt-1">
            600K Subscribers • 220 Subscribed
          </p>
        </div>
      </div>

      <button className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg text-white">
        Follow
      </button>
    </div>
  );
};

export default ChannelHeader;
