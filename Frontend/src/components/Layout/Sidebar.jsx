const menuItems=[
    "Home",
    "Liked Videos",
    "History",
    "My Content",
    "Collections",
    "Subscribers"
]

export default function Sidebar(){
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
                <button className="w-full text-left border border-white px-3 py-2 hover:bg-white hover:text-black transition cursor-pointer">Settings</button>

            </div>
        </aside>
    )
}