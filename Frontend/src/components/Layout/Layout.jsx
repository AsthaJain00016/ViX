import { useState } from "react"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import SidebarAIChat from "../ai/SidebarAIChat"
export default function Layout({children}){
    const [showAIChat, setShowAIChat] = useState(false)
    return(
        <div className="h-screen bg-black text-white">
            <Navbar/>

            <div className="flex h-[calc(100vh-64px)]">
                <Sidebar onAIChatClick={() => setShowAIChat(!showAIChat)}/>
                <main className="flex-1 border border-white p-6 overflow-y-auto">
                    {children}
                </main>
                {showAIChat && (
                    <aside className="w-80 border-l border-white">
                        <SidebarAIChat/>
                    </aside>
                )}
            </div>
        </div>
    )
}
