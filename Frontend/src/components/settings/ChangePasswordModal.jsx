import { useState, } from "react";
import { changeCurrentPassword, logoutUser } from "../../api/user.api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"

const ChangePasswordModal = ({ onClose }) => {
  const { setUser } = useAuth();

  const navigate = useNavigate()
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      await changeCurrentPassword(form);

      // logout after password change
      await logoutUser();
      setUser(null);

      onClose();
      navigate("/")
      alert("Password changed. Please login again.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-[#111] p-6 rounded-xl w-96 border border-gray-800">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="password"
          name="oldPassword"
          placeholder="Current password"
          onChange={handleChange}
          className="w-full mb-3 bg-black border border-gray-700 px-3 py-2 rounded"
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New password"
          onChange={handleChange}
          className="w-full mb-4 bg-black border border-gray-700 px-3 py-2 rounded"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-purple-600 py-2 rounded"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
