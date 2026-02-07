import { useState } from "react";
import { useAuth } from "../../context/AuthContext"
import { registerUser } from "../../api/user.api";

const RegisterModal = ({ onClose }) => {
    const { setUser } = useAuth();
    const [form, setForm] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
    })

    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleRegister = async () => {
        if (!avatar) {
            setError("Avatar is required");
            return
        }

        try {
            setLoading(true)
            setError("")
            const formData = new FormData();
            formData.append("fullName", form.fullName);
            formData.append("username", form.username);
            formData.append("email", form.email);
            formData.append("password", form.password);
            formData.append("avatar", avatar)

            if (coverImage) {
                formData.append("coverImage", coverImage)
            }
            for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}
            const user = await registerUser(formData);
            console.log("REGISTER SUCCESS:", user);
            setUser(user);
            onClose();
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/70" onClick={onClose} />
            <div className="relative bg-[#111] w-100 rounded-xl p-6 z-10 border border-gray-800">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white"
                >
                    ✕
                </button>
                <h2 className="text-xl font-semibold mb-4">Register</h2>
                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                <input
                    name="fullName"
                    placeholder="Full Name"
                    onChange={handleChange}
                    className="w-full mb-3 bg-black border border-gray-700 rounded px-3 py-2"
                    required
                />

                <input
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    className="w-full mb-3 bg-black border border-gray-700 rounded px-3 py-2"
                    required
                />
                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full mb-3 bg-black border border-gray-700 rounded px-3 py-2"
                    required
                />
                <input
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full mb-3 bg-black border border-gray-700 rounded px-3 py-2"
                    required
                />

                <label className="text-sm text-gray-400">Avatar (required)</label>
                <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={(e) => setAvatar(e.target.files[0])}
                    className="w-full mb-3 bg-black border border-gray-700 px-3 py-2 text-sm"
                />

                <label className="text-sm  text-gray-400">Cover Image (optional)</label>
                <input
                    type="file"
                    accept="image/*"
                    name="coverImage"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                    className="w-full bg-black border border-gray-700 px-3 py-2 mb-4 text-sm"
                />
                <button
                    onClick={handleRegister}
                    disabled={loading}
                    className="w-full bg-purple-600 py-2 rounded font-medium"
                >
                    {loading ? "Creating account..." : "Register"}
                </button>
            </div>
        </div>
    )
}

export default RegisterModal