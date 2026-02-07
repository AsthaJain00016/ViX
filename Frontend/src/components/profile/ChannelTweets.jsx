import { useState, useEffect } from "react";
import TweetCard from "./TweetCard";
import { fetchUserTweets, createTweet, deleteTweet } from "../../api/tweet.api";
import { useAuth } from "../../context/AuthContext";

const ChannelTweets = ({ userId }) => {
  const { user } = useAuth();
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTweet, setNewTweet] = useState("");
  const [posting, setPosting] = useState(false);

  const loadTweets = async () => {
    try {
      const response = await fetchUserTweets(userId || user._id);
      setTweets(response.data.data || []);
    } catch (error) {
      console.error("Error fetching tweets:", error);
      setTweets([]);
    }
  };

  useEffect(() => {
    if (userId || user._id) {
      loadTweets().finally(() => setLoading(false));
    }
  }, [userId, user._id]);

  const handleCreateTweet = async () => {
    if (!newTweet.trim()) return;
    setPosting(true);
    try {
      await createTweet({ content: newTweet });
      setNewTweet("");
      // Refresh tweets
      await loadTweets();
    } catch (error) {
      console.error("Error creating tweet:", error);
    } finally {
      setPosting(false);
    }
  };

  const handleDeleteTweet = async (tweetId) => {
    if (window.confirm("Are you sure you want to delete this tweet?")) {
      try {
        await deleteTweet(tweetId);
        await loadTweets();
      } catch (error) {
        console.error("Error deleting tweet:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto mt-6">
        <div className="text-white text-center">Loading tweets...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-6">
      {/* Create Tweet Form */}
      <div className="bg-[#111] border border-gray-800 rounded-xl p-4">
        <div className="flex gap-4">
          <img
            src={user.avatar || "https://i.pravatar.cc/150?img=32"}
            alt="avatar"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={newTweet}
              onChange={(e) => setNewTweet(e.target.value)}
              placeholder="What's happening?"
              className="w-full bg-transparent text-white placeholder-gray-500 resize-none outline-none"
              rows={3}
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCreateTweet}
                disabled={posting || !newTweet.trim()}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white px-6 py-2 rounded-full font-semibold"
              >
                {posting ? "Posting..." : "Tweet"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tweets List */}
      {tweets.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          No tweets yet. Be the first to tweet!
        </div>
      ) : (
        tweets.map((tweet) => (
          <TweetCard key={tweet._id} tweet={tweet} onDeleteTweet={handleDeleteTweet} />
        ))
      )}
    </div>
  );
};

export default ChannelTweets;
