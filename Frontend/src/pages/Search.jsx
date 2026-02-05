import Layout from "../components/Layout/Layout";
import SearchVideoList from "../components/video/SearchVideoList";
import { searchVideos } from "../data/searchVideo";
const Home = () => {
  return (
    <Layout>
        <SearchVideoList videos={searchVideos}/>
    </Layout>
  );
};

export default Home;
