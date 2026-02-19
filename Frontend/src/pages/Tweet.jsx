import { useState, useEffect } from "react";
import TweetCard from "../components/profile/TweetCard";
import TweetImprover from "../components/ai/TweetImprover";
import { allTweets, createTweet, deleteTweet } from "../api/tweet.api";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout/Layout";
import { toast } from "react-toastify";
import {
  FaTrash,
  FaSyncAlt,
  FaFeatherAlt,
  FaSignInAlt,
  FaRegSmile,
  FaExclamationCircle
} from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";


const Tweets = () => {
  const { user } = useAuth();
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTweet, setNewTweet] = useState("");
  const [posting, setPosting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // ================= LOAD TWEETS =================
  const loadTweets = async () => {
    try {
      const response = await allTweets();
      setTweets(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching tweets:", error);
      setTweets([]);
       toast.error("Failed to load tweets", {
        icon: <FaExclamationCircle />,
        className: "custom-toast",
      });
    }
  };

  useEffect(() => {
    loadTweets().finally(() => setLoading(false));
  }, []);

  // ================= CREATE =================
  const handleCreateTweet = async () => {
    if (!newTweet.trim()) return;

    setPosting(true);
    try {
      await createTweet({ content: newTweet });

      // Optimistic UI update
      setTweets((prev) => [
        {
          _id: Date.now(),
          content: newTweet,
          owner: user,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);

      setNewTweet("");
toast.success("Tweet posted successfully", {
        icon: <FaFeatherAlt />,
        className: "custom-toast",
      });
    } catch (error) {
      console.error("Error creating tweet:", error);
      toast.error("Failed to post tweet", {
        icon: <FaExclamationCircle />,
        className: "custom-toast",
      });

    } finally {
      setPosting(false);
    }
  };

  // ================= DELETE =================
  const handleDeleteTweet = async (tweetId) => {
    if (!window.confirm("Delete this tweet?")) return;

    try {
      await deleteTweet(tweetId);
      setTweets((prev) => prev.filter((t) => t._id !== tweetId));
      toast.success("Tweet deleted", {
  icon: <FaTrash />,
    className: "custom-toast",

});

    } catch (error) {
      console.error("Error deleting tweet:", error);
      toast.error("Failed to delete tweet", {
        icon: <FaExclamationCircle />,
        className: "custom-toast",
      });

    }
  };

  // ================= REFRESH =================
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadTweets();
    setRefreshing(false);
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto mt-10 text-center text-gray-400">
          Loading tweets...
        </div>
      </Layout>
    );
  }

  // ================= NOT LOGGED IN =================
  if (!user) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto mt-10">
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-10 text-center">
            <h2 className="text-white text-2xl font-semibold mb-4 flex items-center justify-center gap-2">
              <FaSignInAlt className="text-blue-400" />
              Please Log In
            </h2>
            <p className="text-gray-400 mb-6">
              You need to log in to see and create tweets.
            </p>
            <button
              onClick={() => (window.location.href = "/login")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold"
            >
              Log In
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto mt-6 space-y-6">

        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2"> <FaFeatherAlt className="text-blue-400" />Tweets</h1>

          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition"
          >
            <FaSyncAlt className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* ================= CREATE TWEET ================= */}
        <div className="bg-[#111827]/70 backdrop-blur-md border border-gray-800 rounded-2xl p-5 shadow-lg">
          <div className="flex gap-4">
            <img
              src={user?.avatar || "https://i.pravatar.cc/150?img=32"}
              alt="avatar"
              className="w-12 h-12 rounded-full border border-gray-700"
            />

            <div className="flex-1">
              <textarea
                value={newTweet}
                onChange={(e) => setNewTweet(e.target.value)}
                placeholder="What's happening?"
                className="w-full bg-transparent text-white placeholder-gray-500 resize-none outline-none text-lg"
                rows={3}
                maxLength={280}
              />

              {/* Character Counter */}
              <div className="text-right text-xs text-gray-500 mt-1">
                {newTweet.length}/280
              </div>

              <div className="flex justify-between items-center mt-4">
                <TweetImprover
                  tweetContent={newTweet}
                  onUseImproved={(improvedTweet) =>
                    setNewTweet(improvedTweet)
                  }
                />

                <button
                  onClick={handleCreateTweet}
                  disabled={posting || !newTweet.trim()}
                  className="flex items-center gap-2 bg-linear-to-r from-blue-500 to-purple-600 
                  hover:opacity-90 disabled:bg-gray-600 
                  text-white px-6 py-2 rounded-full font-semibold transition"
                >
                   <MdOutlinePostAdd />
                  {posting ? "Posting..." : "Tweet"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= TWEETS LIST ================= */}
        {tweets.length === 0 ? (
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-10 text-center">
            <FaRegSmile className="text-4xl text-gray-500 mx-auto mb-4" />  
            <h3 className="text-gray-400 text-lg">
              No tweets yet 🚀
            </h3>
            <p className="text-gray-500 mt-2">
              Be the first to share something amazing.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {tweets.map((tweet) => (
              <TweetCard
                key={tweet._id}
                tweet={tweet}
                onDeleteTweet={handleDeleteTweet}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Tweets;
