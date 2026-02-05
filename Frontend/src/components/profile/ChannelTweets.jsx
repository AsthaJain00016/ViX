import TweetCard from "./TweetCard";

const tweets = [
  {
    id: 1,
    name: "Olivia Rhye",
    username: "@oliviarhye",
    time: "2h",
    avatar: "https://i.pravatar.cc/150?img=32",
    content: "React + UI consistency is more important than people think.",
    image: null,
    likes: 124,
    comments: 18,
  },
  {
    id: 2,
    name: "Olivia Rhye",
    username: "@oliviarhye",
    time: "6h",
    avatar: "https://i.pravatar.cc/150?img=32",
    content: "Dark mode UI hits different at night 🌙",
    image:
      "https://images.unsplash.com/photo-1602524202842-0b6f41f4a7f8",
    likes: 312,
    comments: 42,
  },
];

const ChannelTweets = () => {
  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-6">
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default ChannelTweets;
