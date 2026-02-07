import { useAuth } from "../../context/AuthContext"
import { Link } from "react-router-dom"
import LoginModal from "../auth/LoginModal"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import RegisterModal from "../auth/RegisterModal"
export default function Navbar(){
    const {user,loading}=useAuth()
    const [showLogin,setShowLogin]=useState(false)
    const [showRegister,setShowRegister]=useState(false)
    const navigate=useNavigate()

    const handleProfileClick=()=>{
        navigate(`/profile/u/${user}`)
        console.log(user)
    }
    if(loading) return null
    return (
        <>
        <nav className="h-16 flex items-center justify-between px-6 border-b border-white">
            <div className="text-xl font-bold">ViX</div>

            <input
            type="text"
            placeholder="Search"
            className="w-125 bg-black border  border-white px-4 py-2 outline none "
            />

            <div className="flex gap-4">
                {
                    !user?(
                        <>
                        <button className="border px-4 py-1 rounded cursor-pointer"onClick={()=>setShowLogin(true)} >Log in</button>
                        <button className="bg-purple-600 px-4 py-1 rounded cursor-pointer" onClick={()=>setShowRegister(true)}>Register</button>
                        </>
                    ):
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

        {showLogin && <LoginModal onClose={()=>setShowLogin(false)} />}
            {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
        </>
    )
}