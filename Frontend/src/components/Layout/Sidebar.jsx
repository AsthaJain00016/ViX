import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import SettingsPanel from "../settings/SettingPanel"
import Tweet from "../../pages/Tweet"
import { useNavigate, useLocation } from "react-router-dom"
const menuItems=[
    "Home",
    "Liked Videos",
    "History",
    "Tweets",
    "Following",
]



export default function Sidebar(){
    const [openSettings,setOpenSettings]=useState(false)
    const navigate=useNavigate()
    const location = useLocation()
    const {user}=useAuth()
    const active = location.pathname === "/" ? "Home" : decodeURIComponent(location.pathname.slice(1))
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
            </div>
            <div className="space-y-3">
                <button className="w-full text-left border border-white px-3 py-2 hover:bg-white hover:text-black transition cursor-pointer" onClick={()=>navigate("/Support")}>Support</button>
                {user &&(<button className="w-full text-left border border-white px-3 py-2 hover:bg-white hover:text-black transition cursor-pointer" onClick={() => setOpenSettings(true)}
>Settings</button>)}

                {openSettings &&(
                    <SettingsPanel onClose={()=>setOpenSettings(false)} />
                )}
            </div>
        </aside>
    )
}