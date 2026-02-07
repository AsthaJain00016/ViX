import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateAvatar } from "../../api/user.api";

const ChangeAvatarModal = ({ onClose }) => {
  const { user, setUser } = useAuth();
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!avatar) return;

    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      setLoading(true);
      const updatedUser = await updateAvatar(formData);
      setUser(updatedUser);
      onClose();
    } catch (err) {
      alert("Avatar update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
   

    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-[#111] p-6 rounded-xl w-96 border border-gray-800">
        <h2 className="text-lg font-semibold mb-4">Change Avatar Image</h2>


        <input
         type="file"
         name="avatar"
       accept="image/*"
        onChange={(e) => setAvatar(e.target.files[0])}
      />
          <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Uploading..." : "Update Avatar"}
      </button>
    
      </div>
    </div>
  );
};

export default ChangeAvatarModal;
