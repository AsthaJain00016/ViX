import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import SettingsPanel from "../settings/SettingPanel"

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
    const {user}=useAuth()
    return (
        <aside className="w-64 border-r border-white p-4 flex flex-col justify-between">
            <div className="space-y-3">
                {
                    menuItems.map(item=>(
                        <button key={item} className="w-full text-left border border-white px-3 py-2 hover:bg-white hover:text-black transition cursor-pointer" >
                            {item}
                        </button>
                    ))
                }
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