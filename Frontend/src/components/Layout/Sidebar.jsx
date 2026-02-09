import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import SettingsPanel from "../settings/SettingPanel"
import Tweet from "../../pages/Tweet"
import { useNavigate } from "react-router-dom"
const menuItems=[
    "Home",
    "Liked Videos",
    "History",
    "Tweets",
    "Follwing",
    "Followers"
]



export default function Sidebar(){
    const [openSettings,setOpenSettings]=useState(false)
    const navigate=useNavigate()
    const {user}=useAuth()
    const [active,setActive]=useState("Home")
    const [openTweet,setOpenTweet]=useState(false);
    return (
        <aside className="w-64 border-r border-white p-4 flex flex-col justify-between">
            <div className="space-y-3">
                {
                    menuItems.map(item=>(
                        <button key={item}  className={`w-full text-left border border-white px-3 py-2  hover:text-black transition cursor-pointer 
              ${
                active === item
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-white hover:text-black"
              }`} onClick={()=>(
                navigate(`/${item}`)
              )}>
                            {item}
                        </button>
                    ))
                }
                {openTweet && (<Tweet onClose={()=>setOpenTweet(false)} />)}
            </div>
            <div className="space-y-3">
                <button className="w-full text-left border border-white px-3 py-2 hover:bg-white hover:text-black transition cursor-pointer">Support</button>
                {user &&(<button className="w-full text-left border border-white px-3 py-2 hover:bg-white hover:text-black transition cursor-pointer" onClick={() => setOpenSettings(true)}
>Settings</button>)}

                {openSettings &&(
                    <SettingsPanel onClose={()=>setOpenSettings(false)} />
                )}
            </div>
        </aside>
    )
}