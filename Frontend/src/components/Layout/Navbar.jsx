export default function Navbar(){
    return (
        <nav className="h-16 flex items-center justify-between px-6 border-b border-white">
            <div></div>

            <input
            type="text"
            placeholder="Search"
            className="w-125 bg-black border  border-white px-4 py-2 outline none "
            />

            <div className="flex gap-4">
                <button className="border border-white px-4 py-2 cursor-pointer">Log in</button>
                <button className="border border-white px-4 py-2 cursor-pointer">Register</button>
            </div>
        </nav>
    )
}