import {BrowserRouter , Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Watch from "./pages/Watch"
import Profile from "./pages/Profile"
import Tweet from "./pages/Tweet"

function App(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/Home' element={<Home/>} />
            <Route path="/watch/:videoId" element={<Watch/>} />
            <Route path="/profile/u/:user" element={<Profile/>}/>
            <Route path="/Tweets" element={<Tweet/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default App