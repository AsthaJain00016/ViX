import Layout from "../components/Layout/Layout";
import SavedVideo from "../components/video/SavedVideo";

const SavedVideos = () => {
  return (
    <Layout>
      <div className="relative min-h-screen overflow-hidden bg-black">

        {/* Animated Gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-linear-to-r from-purple-800 via-indigo-800 to-purple-800 opacity-20 blur-3xl animate-pulse"></div>
        </div>

        <div className="px-8 py-10">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Saved Videos
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Manage and revisit your saved content anytime.
          </p>

          <div className="mt-8">
            <SavedVideo />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SavedVideos;
