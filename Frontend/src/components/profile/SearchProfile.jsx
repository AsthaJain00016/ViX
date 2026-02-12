import { Link } from "react-router-dom";

const SearchProfile = ({ user }) => {
    return (
        <Link to={`/subscribed-profile/${user?._id}`} className="block">
            <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                <img
                    src={user?.avatar || "/default-avatar.png"}
                    alt="avatar"
                    className="w-16 h-16 rounded-full border-2 border-gray-600"
                />
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{user.fullName}</h3>
                    <p className="text-gray-400">@{user.username}</p>
                    <p className="text-sm text-gray-500">
                        {user.subscribersCount || 0} subscribers
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default SearchProfile;
