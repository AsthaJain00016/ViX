import { useEffect, useState } from "react";
import FollowingCard from "./FollowingCard";
import { useAuth } from "../../context/AuthContext";
import { fetchSubscribedChannels } from "../../api/subscription.api";
import { fetchUserById } from "../../api/user.api";



const FollowingGrid = ({userId}) => {
  console.log("User Id",userId)
  const [followers,setFollowers]=useState([])
  const [user,setUser]=useState("");
  // const {user}=useAuth()

  useEffect(()=>{
    //  if (user && user._id) {
    //      const response=async()=>{
    //       const data=await fetchSubscribedChannels(user._id);
    //       setFollowers(data.channels)
    //      }
    //      response()
    //  }
     if (userId) {
         const response=async()=>{
          const data=await fetchSubscribedChannels(userId);
          const user=await fetchUserById(userId)
          setUser(user)
          setFollowers(data.channels)
         }
         response()
     }
  },[user])

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {followers.length === 0 ? (
        <div className="text-white text-xl border p-2 absolute right-150 bottom-18 bg-purple-800 rounded-xl">You are not following anyone!</div>
      ) : (
        followers.map((user) => (
          <FollowingCard key={user._id || userId} user={user} />
        ))
      )}
    </div>
  );
};

export default FollowingGrid;
