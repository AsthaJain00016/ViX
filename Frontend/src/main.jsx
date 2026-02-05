import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Search from './pages/Search'
import Watch from './pages/Watch'
import Profile from './pages/Profile'
import Home from './pages/Home'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home/>
    {/* <Search/> */}
    {/* <Watch/> */}
    {/* <Profile/> */}
  </StrictMode>,
)
