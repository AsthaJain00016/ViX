import { FaRegHeart, FaRegComment, FaShare } from "react-icons/fa";

const TweetCard = ({ tweet }) => {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-xl p-4 hover:bg-[#161616] transition">
      <div className="flex gap-4">
        {/* Avatar */}
        <img
          src={tweet.avatar}
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />

        {/* Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-white">
              {tweet.name}
            </span>
            <span className="text-gray-500">
              {tweet.username} · {tweet.time}
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
            <button className="flex items-center gap-2 hover:text-pink-500">
              <FaRegHeart /> {tweet.likes}
            </button>
            <button className="flex items-center gap-2 hover:text-blue-400">
              <FaRegComment /> {tweet.comments}
            </button>
            <button className="hover:text-green-400">
              <FaShare />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
