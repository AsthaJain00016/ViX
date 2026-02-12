import Layout from "../components/Layout/Layout";
import FollowingGrid from "../components/profile/FollwingGrid";
import { useAuth } from "../context/AuthContext";

const Following=()=>{
    const {user}=useAuth()
    console.log("USER",user)
    return(
        <Layout>
            <FollowingGrid userId={user?._id}/>
        </Layout>
    )
}
export default Following