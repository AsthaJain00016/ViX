import { useEffect, useState } from "react";
import { fetchChannelSubscribers } from "../../api/subscription.api";
import { likeVideo } from "../../api/like.api";
import { toggleSaveVideo, checkVideoSaved } from "../../api/user.api";
import { useAuth } from "../../context/AuthContext";
import FollowButton from "../common/FollowButton";
import AddToPlaylist from "./AddToPlaylist";
import { useNavigate } from "react-router-dom";
import { FormatDuration } from "../common/FormatDuration";
import LikedIcon from '../../assets/like.png'
import dislikeIcon from '../../assets/dislike.png'
import savedIcon from '../../assets/SavedVideos.png'
const VideoMeta = ({ video }) => {
  const { user, subscriptionRefreshKey } = useAuth();
  const [subscribers, setSubscribers] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likesCount || 0);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subs = await fetchChannelSubscribers(video.owner._id);
        setSubscribers(subs);
        if (user) {
          const { checkSubscriptionStatus } = await import("../../api/subscription.api");
          const isSub = await checkSubscriptionStatus(user._id, video.owner._id);
          setIsSubscribed(isSub);
        }
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      }
    };
    fetchData();
  }, [video.owner._id, user, subscriptionRefreshKey]);

  useEffect(() => {
    const checkSaved = async () => {
      if (!user) return;
      try {
        const res = await checkVideoSaved(video._id);
        // res may be { saved: true }
        setSaved(res?.saved || false);
      } catch (err) {
        console.error("Error checking saved status", err);
      }
    };
    checkSaved();
  }, [video._id, user]);

  const handleSubscriptionChange = (newSubscribed) => {
    setIsSubscribed(newSubscribed);
    setSubscribers(prev => newSubscribed ? prev + 1 : prev - 1);
  };

  const handleLike = async () => {
    if (!user) return alert('Please login to like videos');
    try {
      setLoadingLike(true);
      await likeVideo(video._id);
      if (liked) {
        setLiked(false);
        setLikeCount(prev => Math.max(0, prev - 1));
      } else {
        setLiked(true);
        setLikeCount(prev => prev + 1);
        if (disliked) setDisliked(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLike(false);
    }
  };

  const handleDislike = () => {
    if (!user) return alert('Please login to dislike videos');
    // Dislike is local toggle (backend not implemented)
    if (disliked) setDisliked(false);
    else {
      setDisliked(true);
      if (liked) {
        setLiked(false);
        setLikeCount(prev => Math.max(0, prev - 1));
      }
    }
  };

  const handleSave = async () => {
    if (!user) return alert('Please login to save videos');
    try {
      setLoadingSave(true);
      const res = await toggleSaveVideo(video._id);
      // res may contain { saved: true }
      setSaved(res?.saved === true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSave(false);
    }
  };

  return (
    <div className="mt-4 text-white">
      <h1 className="text-xl font-semibold">
        {video.title}
      </h1>

      <p className="text-gray-400 text-sm mt-1">
        {video.views} views . {FormatDuration(video.duration)}
      </p>

      {/* Channel + Actions */}
      <div className="flex justify-between items-center mt-4">
        {/* Channel */}
        <div className="flex items-center gap-3">
          <img
            src={video.owner.avatar}
            className="w-10 h-10 rounded-full"
            onClick={() => (navigate(`/subscribed-profile/${video.owner._id}`))}
          />
          <div>
            <p className="font-medium" onClick={() => (navigate(`/subscribed-profile/${video.owner._id}`))}>{video.owner.username}</p>
            <p className="text-xs text-gray-400" onClick={() => (navigate(`/subscribed-profile/${video.owner._id}`))}>{subscribers} Subscribers</p>
          </div>
          <FollowButton
            channelId={video.owner._id}
            isSubscribedInitially={isSubscribed}
            onChange={handleSubscriptionChange}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleLike}
            disabled={loadingLike}
            className={`px-3 py-1 rounded ml-1 ${liked ? 'bg-blue-600' : 'bg-neutral-800'}`}
          >
          <img src={LikedIcon} alt="Like" className="w-5 h-5 invert-100 " /> {likeCount}
          </button>

          <button
            onClick={handleDislike}
            className={`px-3 py-1 rounded ${disliked ? 'bg-blue-600' : 'bg-neutral-800'}`}
          >
            <img src={dislikeIcon} alt="dislike" className="w-5 h-5 invert-100" />
          </button>

          <button
            onClick={handleSave}
            disabled={loadingSave}
            className={`px-3 py-1 rounded bg-neutral-800`}
          >
            {saved ? <img src={savedIcon} alt=""  className="w-5 h-5"/>: "save" }
          </button>

          <AddToPlaylist videoId={video._id} className="text-sm" />
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
