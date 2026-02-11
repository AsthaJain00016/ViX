import {BrowserRouter , Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Watch from "./pages/Watch"
import Profile from "./pages/Profile"
import SubscribedProfile from "./pages/SubscribedProfile"
import Tweet from "./pages/Tweet"
import LikedVideos from "./pages/LikedVideos"
import History from "./pages/History"
import Following from "./pages/Following"
import Followers from "./pages/Followers"
import Support from "./pages/Support"

function App(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path='/Home' element={<Home/>} />
            <Route path="/watch/:videoId" element={<Watch/>} />
            <Route path="/profile/u/:user" element={<Profile/>}/>
            <Route path="/subscribed-profile/:id" element={<SubscribedProfile/>}/>
            <Route path="/Tweets" element={<Tweet/>}/>
            <Route path="/Liked Videos" element={<LikedVideos/>} />
            <Route path="/History" element={<History/>} />
            <Route path="/Following" element={<Following/>} />
            <Route path="/Followers" element={<Followers/>} />
            <Route path="/Support" element={<Support/>} />
        </Routes>
        </BrowserRouter>
    )
}

export default App