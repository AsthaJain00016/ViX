import Layout from "../components/Layout/Layout";
import FollowingGrid from "../components/profile/FollwingGrid";
import { useAuth } from "../context/AuthContext";
import { FaUsers } from "react-icons/fa";

const Following = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Following Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Manage the creators you follow
          </p>
        </div>

        {/* GRID */}
        <FollowingGrid userId={user?._id} />

      </div>
    </Layout>
  );
};

export default Following;
