import { useEffect, useState } from "react";
import FollowingCard from "./FollowingCard";
import { useAuth } from "../../context/AuthContext";
import { fetchUserById } from "../../api/user.api";
import { fetchSubscribedChannels } from "../../api/subscription.api";


const FollowingGrid = ({ userId }) => {
  console.log("render")
  const [followers, setFollowers] = useState([])

  useEffect(() => {
    if (userId) {
      const response = async () => {
        const data = await fetchSubscribedChannels(userId);
        setFollowers(data.channels)
      }
      response()
    }
  }, [userId])

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {followers.length === 0 ? (
        <div className="text-white text-xl border p-2 absolute right-150 bottom-18 bg-purple-800 rounded-xl">Not following anyone!</div>
      ) : (
        followers.map((user) => (
          <FollowingCard key={user._id || userId} user={user} />
        ))
      )}
    </div>
  );
};

export default FollowingGrid;
