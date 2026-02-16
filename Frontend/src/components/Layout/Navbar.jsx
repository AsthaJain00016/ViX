import { useAuth } from "../../context/AuthContext"
import { Link } from "react-router-dom"
import LoginModal from "../auth/LoginModal"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import RegisterModal from "../auth/RegisterModal"
import searchIcon from "../../assets/search.png"
export default function Navbar() {
    const { user, loading } = useAuth()
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [query, setQuery] = useState("");
    const navigate = useNavigate()

    const handleProfileClick = () => {
        navigate(`/profile/u/${user}`)
        console.log(user)
    }

    const handleSearch = (e) => {
        if (e.key === "Enter" && query.trim()) {
            navigate(`/search?q=${query}`);
        }
    }
    if (loading) return null
    return (
        <>
            <nav className="h-16 flex items-center justify-between px-6 border-b border-white">
                <div className="text-xl font-bold">ViX</div>
                <div className="flex items-center bg-black border border-white rounded-full overflow-hidden ml-50">
                    <img
                        src={searchIcon}
                        alt="Search"
                        className="w-5 h-5 ml-3 cursor-pointer invert-70"
                    />
                    <input
                        type="text"
                        placeholder="Search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleSearch}
                        className="w-125 bg-black px-4 py-2 outline-none text-white placeholder-gray-400"
                    />
                </div>

                <div className="flex gap-4">
                    {
                        !user ? (
                            <>
                                <button className="border px-4 py-1 rounded cursor-pointer" onClick={() => setShowLogin(true)} >Log in</button>
                                <button className="bg-purple-600 px-4 py-1 rounded cursor-pointer" onClick={() => setShowRegister(true)}>Register</button>
                            </>
                        ) :
                            (
                                <img
                                    src={user.avatar}
                                    alt='profile'
                                    className="w-9 h-9 rounded-full cursor-pointer"
                                    title={user.username}
                                    onClick={handleProfileClick}
                                />
                            )
                    }
                </div>
            </nav>

            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
            {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
        </>
    )
}