import { useState } from "react";
import { updateUserCoverImage } from "../../api/user.api";
import { useAuth } from "../../context/AuthContext";

const ChangeCoverModal = ({ onClose }) => {
  const { setUser } = useAuth();
  const [cover, setCover] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!cover) return;

    const formData = new FormData();
    formData.append("coverImage", cover);

    try {
      setLoading(true);
      const updatedUser = await updateUserCoverImage(formData);
      setUser(updatedUser);
      onClose();
    } catch {
      alert("Cover image update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <h3>Change Cover Image</h3>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setCover(e.target.files[0])}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Uploading..." : "Update Cover"}
      </button>
    </div>
  );
};

export default ChangeCoverModal;
