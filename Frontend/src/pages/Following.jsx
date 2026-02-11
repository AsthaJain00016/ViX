import Layout from "../components/Layout/Layout";
import FollowingGrid from "../components/profile/FollwingGrid";

const Following=({userId})=>{
    return(
        <Layout>
            <FollowingGrid userId={userId}/>
        </Layout>
    )
}
export default Following