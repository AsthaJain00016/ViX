const tabs = ["Videos", "Playlists", "Tweets", "Following"];

const ChannelTabs = ({ active, setActive }) => {
  return (
    <div className="border-b border-gray-800 mt-6">
      <div className="flex gap-6 text-gray-400">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`pb-3 transition ${
          active === tab
            ? "text-white border-b-2 border-purple-500"
            : "hover:text-white"
        }`}
        >
          {tab}
        </button>
      ))}
    </div>
    </div>
  );
};

export default ChannelTabs;
