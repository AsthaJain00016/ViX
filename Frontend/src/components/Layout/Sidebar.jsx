import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import SettingsPanel from "../settings/SettingPanel"
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
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Liked Videos", path: "/Liked Videos", icon: LikedVideoIcon },
    { name: "History", path: "/History", icon: HistoryIcon },
    { name: "Tweets", path: "/Tweets", icon: TweetIcon },
    { name: "Following", path: "/Following", icon: FollowingIcon },
    { name: "Saved Videos", path: "/saved-videos", icon: SavedVideoIcon }
]



export default function Sidebar({ onAIChatClick }) {
    const [openSettings, setOpenSettings] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useAuth()
    const activePath = location.pathname;
    return (
        <aside className="w-60  bg-[#0f0f0f]
        border-r border-white/5 px-4 py-6 flex flex-col">
            <div className="space-y-2">
                {
                    menuItems.map(item => {
                        const isActive =
                            item.path === "/"
                                ? location.pathname === "/"
                                : location.pathname.startsWith(item.path)


                        return (

                            <button key={item.name}
                                onClick={() => navigate(item.path)}
                                className={`w-full text-left px-4 py-2.5 rounded-xl 
                                transition-all duration-300 flex items-center gap-3
                                ${isActive
                                        ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                        : "text-gray-300 hover:bg-white/10 hover:text-white hover:translate-x-1"
                                    }`} >

                                <img src={item.icon}
                                    alt={item.name}
                                    className={`w-5 h-5 transition-all duration-300
                                  ${isActive ? "invert-0" : "invert opacity-70 group-hover:opacity-100:"}`} />
                                <span className="text-sm font-medium">
                                    {item.name}
                                </span>

                            </button>
                        )
                    })
                }
            </div>
            <div className="mt-auto pt-6 border-t border-wh space-y-2">
                <button className="w-full text-left px-4 py-2.5 rounded-xl flex items-center gap-3 
                text-gray-300 hover:bg-white/10 hover:text-white
                transition-all duration-300 hover:translate-x-1"
                    onClick={() => onAIChatClick()}>💬 <span className="text-sm font-medium">Chat with AI</span> </button>

                <button className="w-full text-left px-4 py-2.5 rounded-xl flex items-center gap-3 text-gray-300 hover:bg-white/10 hover:text-white
                transition-all duratio-300 hover:translate-x-1"
                    onClick={() => navigate("/Support")}>
                    <img src={SupportIcon} alt="Support" className="w-5 h-5 invert opacity-70" />
                    <span className="text-sm font-medium">Support</span>
                </button>
                {user && (<button className="w-full text-left px-4 py-2.5 rounded-xl 
                        flex items-center gap-3
                        text-gray-300 hover:bg-white/10 hover:text-white 
                        transition-all duration-300 hover:translate-x-1"
                    onClick={() => setOpenSettings(true)}>
                    <img src={SettingsIcon} alt="Settings" className="w-5 h-5 invert opacity-70" />
                    <span className="text-sm font-medium">Settings</span>
                </button>)}

                {openSettings && (
                    <SettingsPanel onClose={() => setOpenSettings(false)} />
                )}
            </div>
        </aside>
    )
}