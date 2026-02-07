import {BrowserRouter , Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Watch from "./pages/Watch"
import Profile from "./pages/Profile"

function App(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path="/watch/:videoId" element={<Watch/>} />
            <Route path="/profile/u/:user" element={<Profile/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default App