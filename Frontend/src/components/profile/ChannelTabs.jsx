const tabs = ["Videos", "Playlists", "Tweets", "Following"];

const ChannelTabs = ({ active, setActive }) => {
  return (
    <div className="flex gap-6 mt-8 border-b border-gray-700">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`pb-3 text-sm ${
            active === tab
              ? "text-white border-b-2 border-purple-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ChannelTabs;
