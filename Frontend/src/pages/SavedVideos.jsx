import Layout from "../components/Layout/Layout";
import SavedVideo from "../components/video/SavedVideo";

const SavedVideos = () => {
  return (
    <Layout>
      <h2 className="text-white text-xl mb-4">Saved Videos</h2>
      <SavedVideo />
    </Layout>
  );
};

export default SavedVideos;
