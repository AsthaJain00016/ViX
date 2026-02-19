import { useEffect, useState } from "react";
import FollowingCard from "./FollowingCard";
import { fetchSubscribedChannels } from "../../api/subscription.api";
import { FaSearch, FaUsers } from "react-icons/fa";

const FollowingGrid = ({ userId }) => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (userId) {
      const loadData = async () => {
        try {
          const data = await fetchSubscribedChannels(userId);
          setFollowers(data?.channels || []);
        } catch (error) {
          console.error("Error fetching following:", error);
          setFollowers([]);
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }
  }, [userId]);

  const filteredFollowers = followers.filter((user) =>
    user.channel.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* STATS CARD */}
      <div className="bg-linear-to-r from-[#0f172a] to-[#111827] border border-gray-800 rounded-2xl p-6 flex justify-between items-center shadow-lg">
        <div>
          <p className="text-gray-400 text-sm">Total Following</p>
          <h2 className="text-4xl font-bold text-white">
            {followers.length}
          </h2>
        </div>
        <FaUsers className="text-purple-500 text-4xl" />
      </div>

      {/* SEARCH */}
      <div className="relative">
        <FaSearch className="absolute top-3 left-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search creators..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#111] border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-purple-500 transition"
        />
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="text-gray-400 text-center py-10">
          Loading creators...
        </div>
      ) : filteredFollowers.length === 0 ? (
        <div className="bg-[#111] border border-gray-800 rounded-2xl p-10 text-center">
          <h3 className="text-gray-300 text-lg">
            You're not following anyone yet 👀
          </h3>
          <p className="text-gray-500 mt-2">
            Discover creators and start following them.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFollowers.map((user) => (
            <FollowingCard key={user.channel._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FollowingGrid;
