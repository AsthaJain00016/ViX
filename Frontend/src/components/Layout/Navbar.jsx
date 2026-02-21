import { useAuth } from "../../context/AuthContext"
import LoginModal from "../auth/LoginModal"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import RegisterModal from "../auth/RegisterModal"
import { Search } from "lucide-react";

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
            <nav className="h-16 flex items-center justify-between px-6 border-b border-white/5">
                <div className="text-xl font-bold">ViX</div>
               <div className="relative w-full max-w-2xl group">

  {/* Search Icon */}
  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-purple-500 z-50" />



  {/* Input */}
  <input
    type="text"
    placeholder="Search videos..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    onKeyDown={handleSearch}
    className="
      w-full
      bg-white/5
      backdrop-blur-xl
      border border-white/10
      text-white
      placeholder-gray-400
      pl-12 pr-5 py-3
      rounded-full
      outline-none
      transition-all duration-300
      focus:border-purple-500
      focus:ring-2 focus:ring-purple-500/40
      shadow-xl
      relative
      z-10
    "
  />

  {/* Glow */}
  <div
    className="
      absolute inset-0
      rounded-full
      bg-linear-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20
      blur-xl
      opacity-0
      group-hover:opacity-100
      transition duration-500
      -z-10
    "
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