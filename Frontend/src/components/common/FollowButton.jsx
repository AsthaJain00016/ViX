import { useState, useEffect } from "react";
import { toggleSubscription } from "../../api/subscription.api";
import { useAuth } from "../../context/AuthContext";

const FollowButton = ({
    channelId,
    isSubscribedInitially,
    onChange
}) => {
    const { user, setSubscriptionRefreshKey } = useAuth();

    const [isSubscribed, setIsSubscribed] = useState(isSubscribedInitially);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsSubscribed(isSubscribedInitially);
    }, [isSubscribedInitially]);

    if (channelId === user?._id) {
        return null; // Hide button for self-subscription
    }

    const handleClick = async () => {
        if (!user) {
            alert("Please login to follow channels");
            return;
        }

        try {
            setLoading(true);
            const newSubscribed = !isSubscribed;
            setIsSubscribed(newSubscribed);

            if (onChange) {
                onChange(newSubscribed)
            }

            await toggleSubscription(channelId)
            setSubscriptionRefreshKey(prev => prev + 1);
        } catch (err) {
            // Revert on error
            const reverted = !isSubscribed;
            setIsSubscribed(reverted);
            if (onChange) {
                onChange(reverted)
            }
            console.error("Subscription error", err)
            if (err.response?.status === 401) {
                alert("Session expired, please login again")
            } else {
                alert("Something went wrong")
            }
        } finally {
            setLoading(false)
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className={`px-5 py-2 rounded-lg font-medium transition
            ${isSubscribed ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
        >
            {loading ? "Loading..." : isSubscribed ? "Following" : "Follow"}
        </button>
    )
}

export default FollowButton;