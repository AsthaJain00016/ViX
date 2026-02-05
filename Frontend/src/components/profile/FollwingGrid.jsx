import FollowingCard from "./FollowingCard";

const followingData = [
  {
    id: 1,
    name: "Lex Fridman",
    username: "lexfridman",
    followers: "705K",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    name: "Yash Mittal",
    username: "yashmittal",
    followers: "120K",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 3,
    name: "Google Devs",
    username: "googledevs",
    followers: "2.1M",
    avatar: "https://i.pravatar.cc/150?img=45",
  },
  {
    id: 4,
    name: "React India",
    username: "reactindia",
    followers: "340K",
    avatar: "https://i.pravatar.cc/150?img=56",
  },
];

const FollowingGrid = () => {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {followingData.map((user) => (
        <FollowingCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default FollowingGrid;
