import {BrowserRouter , Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Watch from "./pages/Watch"
import Profile from "./pages/Profile"
import SubscribedProfile from "./pages/SubscribedProfile"
import Tweet from "./pages/Tweet"
import LikedVideos from "./pages/LikedVideos"
import History from "./pages/History"
import Following from "./pages/Following"
import Support from "./pages/Support"
import Search from "./pages/Search"
import SavedVideos from "./pages/SavedVideos"
import Playlist from "./pages/Playlist"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";


function App(){
    return(
        <>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path='/Home' element={<Home/>} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/watch/:videoId" element={<Watch/>} />
            <Route path="/profile/u/:user" element={<Profile/>}/>
            <Route path="/subscribed-profile/:id" element={<SubscribedProfile/>}/>
            <Route path="/Tweets" element={<Tweet/>}/>
            <Route path="/Liked Videos" element={<LikedVideos/>} />
            <Route path="/History" element={<History/>} />
            <Route path="/Following" element={<Following/>} />
            <Route path="/saved-videos" element={<SavedVideos/>} />
            <Route path="/playlist/:playlistId" element={<Playlist/>} />
            <Route path="/Support" element={<Support/>} />
            <Route path="/search" element={<Search/>} />
        </Routes>
        </BrowserRouter>

        <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        newestOnTop
        pauseOnHover
        closeOnClick
      />
      </>

    )
}

export default App