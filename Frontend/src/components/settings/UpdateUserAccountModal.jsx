import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateUserAccount } from "../../api/user.api";

const UpdateUserAccountModal = ({ onClose }) => {
  const { user, setUser } = useAuth();

  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
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

      const updatedUser = await updateUserAccount(form);
      setUser(updatedUser);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative bg-[#111] p-6 rounded-xl w-96 border border-gray-800">
        <h2 className="text-lg font-semibold mb-4">Update Account Details</h2>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full mb-3 bg-black border border-gray-700 px-3 py-2 rounded"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-4 bg-black border border-gray-700 px-3 py-2 rounded"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-purple-600 py-2 rounded"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default UpdateUserAccountModal;
