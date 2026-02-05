import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
export default function Layout({children}){
    return(
        <div className="h-screen bg-black text-white">
            <Navbar/>

            <div className="flex h-[calc(100vh-64px)]">
                <Sidebar/>
                <main className="flex-1 border border-white p-6 overflow-y-auto">
                    {children}
                </main>
            </div>

        </div>
    )
}