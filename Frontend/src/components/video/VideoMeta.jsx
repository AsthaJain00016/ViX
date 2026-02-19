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

 const ActionButton = ({
  onClick,
  disabled,
  children,
  isActive,
  activeClass,
  icon
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
   className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm
backdrop-blur-md transition-all duration-300
${isActive 
  ? "bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30"
  : "bg-white/5 hover:bg-white/10 border border-white/5"}
${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
`}


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
  <div className="relative">

    {/* Soft AI Glow */}
    <div className="absolute -inset-1 bg-linear-to-r 
        from-purple-500/10 via-blue-500/10 to-purple-500/10 
        blur-2xl opacity-60">
    </div>
    

    <div className="relative bg-[#111827]/60 backdrop-blur-xl 
        border border-white/5 rounded-2xl p-6 space-y-6 
        shadow-[0_0_30px_rgba(124,58,237,0.08)] 
        hover:shadow-[0_0_40px_rgba(124,58,237,0.15)] 
        transition-all duration-500">

      {/* Title */}
      <div>
        <h1 className="text-2xl font-semibold tracking-wide">
          {video.title}
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          {formatCount(video.views)} views · {FormatDuration(video.duration)}
        </p>
      </div>

      {/* AI Action Buttons */}
      <div className="flex flex-wrap gap-3">

        <ActionButton
          onClick={handleLike}
          disabled={loadingLike}
          isActive={liked}
          icon={<img src={LikedIcon} alt="Like" className="w-5 h-5" />}
        >
          {formatCount(likeCount)}
        </ActionButton>

        <ActionButton
          onClick={handleDislike}
          disabled={loadingDislike}
          isActive={disliked}
          icon={<img src={dislikeIcon} alt="Dislike" className="w-5 h-5" />}
        >
          {formatCount(dislikeCount)}
        </ActionButton>

        <ActionButton
          onClick={handleSave}
          disabled={loadingSave}
          isActive={saved}
          icon={<img src={savedIcon} alt="Save" className="w-5 h-5" />}
        >
          {saved ? "Saved" : "Save"}
        </ActionButton>

        <AddToPlaylist videoId={video._id} />
      </div>

      {/* Channel Row */}
      <div className="flex justify-between items-center border-t border-white/5 pt-6">

        <div
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => navigate(`/subscribed-profile/${video.owner._id}`)}
        >
          <img
            src={video.owner.avatar}
            className="w-12 h-12 rounded-full 
                       ring-2 ring-purple-500/30 
                       group-hover:ring-purple-500 
                       transition"
            alt={video.owner.username}
          />

          <div>
            <p className="font-medium group-hover:text-purple-400 transition">
              {video.owner.username}
            </p>
            <p className="text-xs text-gray-400">
              {formatCount(subscribers)} subscribers
            </p>
          </div>
        </div>

        <FollowButton
          channelId={video.owner._id}
          isSubscribedInitially={isSubscribed}
        />
      </div>

      {/* Description */}
      <div className="bg-black/40 border border-white/5 rounded-xl p-4 text-sm text-gray-300 leading-relaxed">
        {video.description}
      </div>

    </div>
  </div>
);



};

export default VideoMeta;
