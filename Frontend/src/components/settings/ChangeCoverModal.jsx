import { useState } from "react";
import { updateUserCoverImage } from "../../api/user.api";
import { useAuth } from "../../context/AuthContext";

const ChangeCoverModal = ({ onClose }) => {
  const { user,setUser } = useAuth();
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
    } catch(err) {
      console.log(err)
      alert("Cover image update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    

    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-[#111] p-6 rounded-xl w-96 border border-gray-800">
        <h2 className="text-lg font-semibold mb-4">Change Cover Image</h2>


        <input
         type="file"
         name="coverImage"
       accept="image/*"
        onChange={(e) => setCover(e.target.files[0])}
        className="w-full mb-4 bg-black border border-gray-700 px-3 py-2 rounded"
      />
          <button onClick={handleSubmit} disabled={loading} className="w-full bg-purple-600 py-2 rounded">
        {loading ? "Uploading..." : "Update CoverImage"}
      </button>
    
      </div>
    </div>
  );
};

export default ChangeCoverModal;
