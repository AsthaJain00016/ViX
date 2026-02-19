import { useEffect, useState } from "react";
import { fetchChannelSubscribers } from "../../api/subscription.api";
import { likeVideo, dislikeVideo, checkVideoLikeStatus } from "../../api/like.api";
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
  const navigate = useNavigate();

  const [subscribers, setSubscribers] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // ✅ FIX: Do NOT initialize from video props directly
  // We will sync from backend API instead
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const [likeCount, setLikeCount] = useState(video.likesCount || 0);
  const [dislikeCount, setDislikeCount] = useState(video.dislikesCount || 0);

  const [saved, setSaved] = useState(false);

  const [loadingLike, setLoadingLike] = useState(false);
  const [loadingDislike, setLoadingDislike] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  /* ===============================
     🔥 CHECK INITIAL LIKE STATUS
     =============================== */

  useEffect(() => {
    const checkLikeStatus = async () => {
      if (!user) return;

      try {
        const res = await checkVideoLikeStatus(video._id);

        // ✅ FIX: Correctly set both liked & disliked
        setLiked(res?.liked || false);
        setDisliked(res?.disliked || false);

      } catch (error) {
        console.error("Error checking like status", error);
      }
    };

    checkLikeStatus();
  }, [video._id, user]);

  /* ===============================
     🔥 FETCH SUBSCRIBERS
     =============================== */

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!video.owner?._id) return;

        const subs = await fetchChannelSubscribers(video.owner._id);
        setSubscribers(subs);

        if (user?._id) {
          const { checkSubscriptionStatus } = await import("../../api/subscription.api");
          const isSub = await checkSubscriptionStatus(user._id, video.owner._id);
          setIsSubscribed(isSub);
        }

      } catch (error) {
        console.error("Error fetching subscribers:", error);
      }
    };

    fetchData();
  }, [video.owner?._id, user, subscriptionRefreshKey]);

  /* ===============================
     🔥 CHECK SAVE STATUS
     =============================== */

  useEffect(() => {
    const checkSaved = async () => {
      if (!user) return;

      try {
        const res = await checkVideoSaved(video._id);
        setSaved(res?.saved || false);
      } catch (err) {
        console.error("Error checking saved status", err);
      }
    };

    checkSaved();
  }, [video._id, user]);

  /* ===============================
     🔥 HANDLE LIKE
     =============================== */

  const handleLike = async () => {
    if (!user) return alert('Please login to like videos');

    try {
      setLoadingLike(true);

      const res = await likeVideo(video._id);
      const isLikedNow = res?.data?.data?.liked;

      if (isLikedNow) {
        setLiked(true);
        setLikeCount(prev => prev + 1);

        if (disliked) {
          setDisliked(false);
          setDislikeCount(prev => Math.max(0, prev - 1));
        }

      } else {
        setLiked(false);
        setLikeCount(prev => Math.max(0, prev - 1));
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLike(false);
    }
  };

  /* ===============================
     🔥 HANDLE DISLIKE
     =============================== */

  const handleDislike = async () => {
    if (!user) return alert('Please login to dislike videos');

    try {
      setLoadingDislike(true);

      const res = await dislikeVideo(video._id);
      const isDislikedNow = res?.data?.data?.disliked;

      if (isDislikedNow) {
        setDisliked(true);
        setDislikeCount(prev => prev + 1);

        if (liked) {
          setLiked(false);
          setLikeCount(prev => Math.max(0, prev - 1));
        }

      } else {
        setDisliked(false);
        setDislikeCount(prev => Math.max(0, prev - 1));
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDislike(false);
    }
  };

  /* ===============================
     🔥 HANDLE SAVE
     =============================== */

  const handleSave = async () => {
    if (!user) return alert('Please login to save videos');

    try {
      setLoadingSave(true);
      const res = await toggleSaveVideo(video._id);
      setSaved(res?.saved === true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSave(false);
    }
  };

  /* ===============================
     🔥 ACTION BUTTON COMPONENT
     =============================== */

  const ActionButton = ({ onClick, disabled, children, isActive, activeClass = "bg-blue-600", icon }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-200
        ${isActive ? activeClass : 'bg-neutral-800 hover:bg-neutral-700'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {icon}
      <span>{children}</span>
    </button>
  );

  const formatCount = (count) => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
    return count;
  };

  return (
    <div className="mt-4 text-white">

      <h1 className="text-xl font-semibold">
        {video.title}
      </h1>

      <p className="text-gray-400 text-sm mt-1">
        {formatCount(video.views)} views · {FormatDuration(video.duration)}
      </p>

      <div className="flex flex-wrap gap-2 mt-4 border-b border-neutral-800 pb-4">

        <ActionButton
          onClick={handleLike}
          disabled={loadingLike}
          isActive={liked}
          icon={<img src={LikedIcon} alt="Like" className={`w-5 h-5 ${liked ? 'invert-0' : 'invert-100'}`} />}
        >
          {formatCount(likeCount)}
        </ActionButton>

        <ActionButton
          onClick={handleDislike}
          disabled={loadingDislike}
          isActive={disliked}
          icon={<img src={dislikeIcon} alt="Dislike" className={`w-5 h-5 ${disliked ? 'invert-0' : 'invert-100'}`} />}
        >
          {formatCount(dislikeCount)}
        </ActionButton>

        <ActionButton
          onClick={handleSave}
          disabled={loadingSave}
          isActive={saved}
          icon={
            saved
              ? <img src={savedIcon} alt="Saved" className="w-5 h-5" />
              : <svg className="w-5 h-5 invert-100" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                </svg>
          }
        >
          {saved ? 'Saved' : 'Save'}
        </ActionButton>

        <AddToPlaylist videoId={video._id} />
      </div>

      <div className="flex justify-between items-center mt-4 py-3">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate(`/subscribed-profile/${video.owner._id}`)}
        >
          <img
            src={video.owner.avatar}
            className="w-12 h-12 rounded-full"
            alt={video.owner.username}
          />
          <div>
            <p className="font-semibold">{video.owner.username}</p>
            <p className="text-xs text-gray-400">
              {formatCount(subscribers)} Subscribers
            </p>
          </div>
        </div>

        <FollowButton
          channelId={video.owner._id}
          isSubscribedInitially={isSubscribed}
        />
      </div>

      <div className="mt-2 bg-neutral-900 p-3 rounded-xl text-sm text-gray-300">
        {video.description}
      </div>

    </div>
  );
};

export default VideoMeta;
