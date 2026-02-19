import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchChannelSubscribers } from "../../api/subscription.api";
import { FaUserFriends } from "react-icons/fa";

const FollowingCard = ({ user }) => {
  const navigate = useNavigate();
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const count = await fetchChannelSubscribers(user.channel._id);
        setFollowers(count || 0);
      } catch (error) {
        setFollowers(0);
      }
    };
    getFollowers();
  }, [user.channel._id]);

  const handleClick = () => {
    navigate(`/subscribed-profile/${user.channel._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group bg-linear-to-br from-[#0f172a] to-[#111827] border border-gray-800 rounded-2xl p-6 cursor-pointer 
      hover:border-purple-600 hover:shadow-xl hover:shadow-purple-900/30 transition-all duration-300"
    >
      <div className="flex items-center gap-4">

        <img
          src={user.channel.avatar}
          alt={user.channel.username}
          className="w-16 h-16 rounded-full object-cover border border-gray-700 group-hover:border-purple-500 transition"
        />

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">
            @{user.channel.username}
          </h3>

          <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
            <FaUserFriends className="text-purple-400" />
            {followers} subscribers
          </div>
        </div>

        <button
          onClick={(e) => e.stopPropagation()}
          className="px-5 py-2 rounded-full text-sm font-medium 
          bg-linear-to-r from-purple-700 to-pink-700 
          hover:opacity-90 transition"
        >
          Following
        </button>
      </div>
    </div>
  );
};

export default FollowingCard;
