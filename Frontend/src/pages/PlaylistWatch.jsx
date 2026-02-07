import Layout from "../components/Layout/Layout";
import PlaylistInfo from "../components/playlist/PlaylistInfo";
import PlaylistVideoList from "../components/playlist/PlaylistVideoList";

const PlaylistWatch = () => {
  return (
    <Layout>
      <div className="flex gap-6 px-6 py-4 text-white">
        {/* Left section */}
        <div className="w-[35%]">
          <PlaylistInfo />
        </div>

        {/* Right section */}
        <div className="w-[65%]">
          <PlaylistVideoList />
        </div>
      </div>
    </Layout>
  );
};

export default PlaylistWatch;
