import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchChannelSubscribers } from "../../api/subscription.api";
import FollowButton from "../common/FollowButton";

const FollowingCard = ({ user }) => {
  const navigate = useNavigate();
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const count = await fetchChannelSubscribers(user.channel._id);
        setFollowers(count);
      } catch (error) {
        console.error("Error fetching followers:", error);
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
      className="bg-[#111] border border-gray-800 rounded-xl p-4 hover:bg-[#161616] transition cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center gap-4">
        <img
          src={user.channel.avatar}
          alt={user.name}
          className="w-14 h-14 rounded-full object-cover"
        />

        <div className="flex-1">
          <h3 className="font-semibold text-white">@{user.channel.username}</h3>
          <p className="text-xs text-gray-500 mt-1">
            {followers} followers
          </p>
        </div>

        <button className="px-4 py-1.5 text-sm rounded-full bg-purple-600 hover:bg-purple-700 transition">
          Following
        </button>
        {/* <FollowButton/> */}
      </div>
    </div>
  );
};

export default FollowingCard;
