import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "./ChangePasswordModal";
import ChangeAvatarModal from "./ChangeAvatarModal";
import ChangeCoverModal from "./ChangeCoverModal";
import UpdateUserAccountModal from "./UpdateUserAccountModal";

const SettingsPanel = ({ onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showAvatar, setShowAvatar] = useState(false);
  const [showCover, setShowCover] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showUpdateAccount, setShowUpdateAccount] = useState(false);

  const handleLogout = async () => {
    await logout();
    onClose();
    navigate("/Home");
  };

  return (
    <div className="fixed inset-0 z-50 flex">

      {/* Dark overlay matching home */}
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div className="relative w-95 h-full bg-black border-l border-white/5 p-6 overflow-y-auto">

        {/* Purple glow (same as home theme) */}
        <div className="absolute right-0 top-0 h-full w-32 bg-purple-600/10 blur-3xl pointer-events-none" />

        {/* Header */}
        <h2 className="text-2xl font-semibold text-white mb-8">
          Settings
        </h2>

        {/* Profile Card (same style as video cards) */}
        <div
          onClick={() => {
            navigate(`/profile/u/${user?._id}`);
            onClose();
          }}
          className="flex items-center gap-4 p-4 rounded-xl 
                     bg-[#111] hover:bg-[#181818] 
                     border border-white/5 
                     transition-all duration-300 cursor-pointer"
        >
          <img
            src={user?.avatar || "https://via.placeholder.com/100"}
            alt="avatar"
            className="w-14 h-14 rounded-full object-cover border border-white/10"
          />

          <div>
            <p className="text-white font-medium">
              {user?.fullName}
            </p>
            <p className="text-sm text-gray-400">
              @{user?.username}
            </p>
          </div>
        </div>

        <div className="my-8 border-t border-white/5" />

        {/* Settings Options */}
        <div className="space-y-3">

          <button
            onClick={() => setShowPassword(true)}
            className="settings-home-btn"
          >
            Change Password
          </button>

          <button
            onClick={() => setShowAvatar(true)}
            className="settings-home-btn"
          >
            Change Avatar
          </button>

          <button
            onClick={() => setShowCover(true)}
            className="settings-home-btn"
          >
            Change Cover Image
          </button>

          <button
            onClick={() => setShowUpdateAccount(true)}
            className="settings-home-btn"
          >
            Edit Profile
          </button>

        </div>

        <div className="my-8 border-t border-white/5" />

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-xl 
                     bg-red-600/10 hover:bg-red-600/20 
                     text-red-400 border border-red-600/20 
                     transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* Modals */}
      {showPassword && (
        <ChangePasswordModal onClose={() => setShowPassword(false)} />
      )}
      {showAvatar && (
        <ChangeAvatarModal onClose={() => setShowAvatar(false)} />
      )}
      {showCover && (
        <ChangeCoverModal onClose={() => setShowCover(false)} />
      )}
      {showUpdateAccount && (
        <UpdateUserAccountModal
          onClose={() => setShowUpdateAccount(false)}
        />
      )}
    </div>
  );
};

export default SettingsPanel;
