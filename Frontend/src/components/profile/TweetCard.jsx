import { useState } from "react";
import { FaRegHeart, FaRegComment, FaShare, FaHeart, FaTrash } from "react-icons/fa";
import { likeTweet } from "../../api/like.api";
import { addTweetComment, fetchTweetComments } from "../../api/comment.api";
import { deleteTweet } from "../../api/tweet.api";
import { useAuth } from "../../context/AuthContext";
import React from "react";
import { useCallback } from "react";

const TweetCard =React.memo(({ tweet, onDeleteTweet }) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(tweet.isLiked || false);
  const [likesCount, setLikesCount] = useState(tweet.likesCount || 0);
  const [commentsCount, setCommentsCount] = useState(tweet.commentsCount || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commenting, setCommenting] = useState(false);

  console.log('TweetCard render:', tweet._id, 'comments:', comments);

  const handleLike = async () => {
    const wasLiked = liked;
    const oldCount = likesCount;
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    try {
      await likeTweet(tweet._id);
    } catch (error) {
      console.error("Error liking tweet:", error);
      setLiked(wasLiked);
      setLikesCount(oldCount);
    }
  };

  const handleComment =useCallback( async () => {
    if (!newComment.trim()) return;

    setCommenting(true);
    try {
      const newAddedCommment=await addTweetComment(tweet._id, { content: newComment });
      setNewComment("");
      setCommentsCount((prev)=>prev+1);

      setComments((prev)=>{
        const updated=[newAddedCommment,...prev]
        setCommentsCount(updated.length)
        return updated
      });
      setShowComments(true); // Show comments section after posting
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setCommenting(false);
    }
  });

  const toggleComments = async () => {
    if (!showComments) {
      try {
        const response = await fetchTweetComments(tweet._id);
        setComments(comments || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      }
    }
    setShowComments(!showComments);
  };

  const handleShare = () => {
    // Simple share functionality - copy URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    alert("Tweet link copied to clipboard!");
  };

  return (
    <div className="bg-[#111] border border-gray-800 rounded-xl p-4 hover:bg-[#161616] transition">
      <div className="flex gap-4">
        {/* Avatar */}
        <img
          src={tweet.owner?.avatar || "https://i.pravatar.cc/150?img=32"}
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />

        {/* Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-white">
              {tweet.owner?.username || "User"}
            </span>
            <span className="text-gray-500">
              · {new Date(tweet.createdAt).toLocaleString()}
            </span>
          </div>

          {/* Text */}
          <p className="text-gray-200 mt-1">{tweet.content}</p>

          {/* Image */}
          {tweet.image && (
            <img
              src={tweet.image}
              alt="tweet"
              className="mt-3 rounded-xl border border-gray-700"
            />
          )}

          {/* Actions */}
          <div className="flex gap-8 text-gray-400 mt-4 text-sm">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 hover:text-pink-500 ${liked ? 'text-pink-500' : ''}`}
            >
              {liked ? <FaHeart /> : <FaRegHeart />} {likesCount}
            </button>
            <button
              onClick={toggleComments}
              className="flex items-center gap-2 hover:text-blue-400"
            >
              <FaRegComment /> {commentsCount}
            </button>
            <button onClick={handleShare} className="hover:text-green-400">
              <FaShare />
            </button>
            {user && user._id === tweet.owner._id && (
              <button
                onClick={() => onDeleteTweet(tweet._id)}
                className="hover:text-red-400"
              >
                <FaTrash />
              </button>
            )}
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="mt-4 border-t border-gray-700 pt-4">
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 outline-none"
                />
                <button
                  onClick={handleComment}
                  disabled={commenting || !newComment.trim()}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white px-4 py-2 rounded-full"
                >
                  {commenting ? "..." : "Comment"}
                </button>
              </div>
              <div className="space-y-2">
                {comments.map((comment) => (
                  <div key={comment._id} className="flex gap-2 text-sm">
                    <img
                      src={comment.owner?.avatar || "https://i.pravatar.cc/150?img=32"}
                      alt="commenter"
                      className="w-6 h-6 rounded-full"
                    />
                    <div>
                      <span className="font-semibold text-white">{comment.owner?.username}</span>
                      <p className="text-gray-300">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default TweetCard;
