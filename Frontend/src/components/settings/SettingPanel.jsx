import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "./ChangePasswordModal";
import ChangeAvatarModal from "./ChangeAvatarModal";
import ChangeCoverModal from "./ChangeCoverModal";
import UpdateUserAccountModal from "./UpdateUserAccountModal";
const SettingsPanel = ({ onClose }) => {
    const { user, setUser, logout } = useAuth();
    const navigate = useNavigate()

    const [showAvatar, setShowAvatar] = useState(false)
    const [showCover, setShowCover] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showUpdateAccount, setShowUpdateAccount] = useState(false)

    const handleLogout = async () => {
        await logout();
        onClose();
        navigate("/Home");
    }

    return (
        <div className="fixed inset-0 z-50 flex justify-start">
            <div
                className="absolute inset-0 bg-black/70"
                onClick={onClose}
            />
            <div className="relative w-80 h-full bg-[#0f0f0f] border border-gray-800 p-5">
                <h2 className="text-lg font-semibold mb-6">Settings</h2>

                <div
                    onClick={() => {
                        navigate(`/profile/u/${user}`);
                        onClose()
                    }}
                    className="items-center gap-3 p-2 rounded hover:bg-gray-800 cursor-pointer">
                    <img src={user?.avatar} className="w-20 h-20 rounded-full" />
                    <div>
                        <p className="font-medium"> {user?.fullName} </p>
                        <p className="text-sm text-gray-400">@{user?.username}</p>
                    </div>
                </div>
                <hr className="border-gray-800 my-4" />
                <button className="settings-item" onClick={() => setShowPassword(true)}>Change Password</button>
                <button className="settings-item" onClick={() => setShowAvatar(true)}>Change Avatar</button>
                <button className="settings-item" onClick={() => setShowCover(true)}>Change Cover Image</button>
                <button className="settings-item" onClick={() => setShowUpdateAccount(true)}>Edit Profile</button>
                <hr className="border-gray-800 my-4" />
                <button
                    onClick={handleLogout}
                    className="settings-item text-red-500"
                >
                    Logout
                </button>
            </div>
            {showPassword && <ChangePasswordModal onClose={() => setShowPassword(false)} />}
            {showAvatar && <ChangeAvatarModal onClose={() => setShowAvatar(false)} />}
            {showCover && <ChangeCoverModal onClose={() => setShowCover(false)} />}
            {showUpdateAccount && <UpdateUserAccountModal onClose={() => setShowUpdateAccount(false)} />}
        </div>
    )
}

export default SettingsPanel