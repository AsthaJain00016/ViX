import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import SettingsPanel from "../settings/SettingPanel"
import Tweet from "../../pages/Tweet"
import FollowingIcon from "../../assets/Following.png"
import HomeIcon from "../../assets/Home.png"
import LikedVideoIcon from "../../assets/LikedVideos.png"
import HistoryIcon from "../../assets/History.png"
import TweetIcon from "../../assets/Tweets.png"
import SavedVideoIcon from "../../assets/SavedVideos.png"
import SettingsIcon from "../../assets/Settings.png"
import SupportIcon from "../../assets/Support.png"
import { useNavigate, useLocation } from "react-router-dom"

const menuItems = [
    { name: "Home", icon: HomeIcon },
    { name: "Liked Videos", icon: LikedVideoIcon },
    { name: "History", icon: HistoryIcon },
    { name: "Tweets", icon: TweetIcon },
    { name: "Following", icon: FollowingIcon },
    { name: "Saved Videos", icon: SavedVideoIcon }
]



export default function Sidebar({ onAIChatClick }) {
    const [openSettings, setOpenSettings] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useAuth()
    const active = location.pathname === "/" ? "Home" : decodeURIComponent(location.pathname.slice(1))
    return (
        <aside className="w-64 border-r border-white p-4 flex flex-col justify-between">
            <div className="space-y-3">
                {
                    menuItems.map(item => {
                        // Special-case saved videos path to avoid encoded spaces issues
                        const path = item.name === 'Saved Videos' ? '/saved-videos' : `/${item.name}`;
                        return (

                            <button key={item.name} className={`w-full text-left border border-white px-3 py-2 rounded-lg hover:text-black transition cursor-pointer flex items-center gap-3
              ${active === item.name
                                    ? "bg-purple-600 text-white"
                                    : "text-gray-300 hover:bg-white hover:text-black"
                                }`} onClick={() => navigate(path)}>
                                <img src={item.icon} alt={item.name} className="w-5 h-5 invert-100 hover:invert-0" />
                                {item.name}
                            </button>
                        )
                    })
                }
            </div>
            <div className="space-y-3">
                <button className="w-full text-left border border-white px-3 py-2 hover:bg-white hover:text-black transition cursor-pointer flex items-center gap-3 rounded-lg" onClick={() => onAIChatClick()}>💬 Chat with AI</button>
                <button className="w-full text-left border border-white px-3 py-2 hover:bg-white hover:text-black transition cursor-pointer flex items-center gap-3 rounded-lg" onClick={() => navigate("/Support")}>
                    <img src={SupportIcon} alt="Support" className="w-5 h-5 invert-100 hover:invert-0" />
                    Support
                </button>
                {user && (<button className="w-full text-left border border-white px-3 py-2 hover:bg-white hover:text-black transition cursor-pointer flex items-center gap-3 rounded-lg" onClick={() => setOpenSettings(true)}>
                    <img src={SettingsIcon} alt="Settings" className="w-5 h-5 invert-100 hover:invert-0" />
                    Settings
                </button>)}

                {openSettings && (
                    <SettingsPanel onClose={() => setOpenSettings(false)} />
                )}
            </div>
        </aside>
    )
}