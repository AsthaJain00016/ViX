import { useEffect, useState } from "react";
import { fetchChannelSubscribers } from "../../api/subscription.api";
import { useAuth } from "../../context/AuthContext";
import FollowButton from "../common/FollowButton";
import { useNavigate } from "react-router-dom";
const VideoMeta = ({video}) => {
  const { user, subscriptionRefreshKey } = useAuth();
  const [subscribers, setSubscribers] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subs = await fetchChannelSubscribers(video.owner._id);
        setSubscribers(subs);
        if (user) {
          const { fetchSubscribedChannels } = await import("../../api/subscription.api");
          const subscribedChannels = await fetchSubscribedChannels(user._id);
          if (Array.isArray(subscribedChannels)) {
            const isSub = subscribedChannels.some(subscription => subscription.channel._id === video.owner._id);
            setIsSubscribed(isSub);
          } else {
            console.warn("Subscribed channels data is not an array:", subscribedChannels);
            setIsSubscribed(false);
          }
        }
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      }
    };
    fetchData();
  }, [video.owner._id, user, subscriptionRefreshKey]);

  const handleSubscriptionChange = (newSubscribed) => {
    setIsSubscribed(newSubscribed);
    setSubscribers(prev => newSubscribed ? prev + 1 : prev - 1);
  };

  return (
    <div className="mt-4 text-white">
      <h1 className="text-xl font-semibold">
        {video.title}
      </h1>

      <p className="text-gray-400 text-sm mt-1">
        {video.views} views . {video.duration}
      </p>

      {/* Channel + Actions */}
      <div className="flex justify-between items-center mt-4">
        {/* Channel */}
        <div className="flex items-center gap-3">
          <img
            src={video.owner.avatar}
            className="w-10 h-10 rounded-full"
            onClick={()=>(navigate(`/subscribed-profile/${video.owner._id}`))}
          />
          <div>
            <p className="font-medium" onClick={()=>(navigate(`/subscribed-profile/${video.owner._id}`))}>{video.owner.username}</p>
            <p className="text-xs text-gray-400" onClick={()=>(navigate(`/subscribed-profile/${video.owner._id}`))}>{subscribers} Subscribers</p>
          </div>
          <FollowButton
            channelId={video.owner._id}
            isSubscribedInitially={isSubscribed}
            onChange={handleSubscriptionChange}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="px-3 py-1 bg-neutral-800 rounded">👍 2</button>
          <button className="px-3 py-1 bg-neutral-800 rounded">👎</button>
          <button className="px-3 py-1 bg-neutral-800 rounded">💾 Save</button>
        </div>
      </div>

      {/* Description */}
      <div className="mt-4 bg-neutral-900 p-3 rounded-lg text-sm text-gray-300">
        {video.description}
      </div>
    </div>
  );
};

export default VideoMeta;
