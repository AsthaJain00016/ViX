import { useState } from "react";
import { useAuth } from "../../context/AuthContext"
import { loginUser } from "../../api/user.api";

const LoginModal = ({ onClose }) => {
    const { setUser } = useAuth();
    const [form, setForm] = useState(
        {
            email: "",
            password: ""
        }
    )
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError("")
            const res = await loginUser(form);
            setUser(res)
            onClose();

        } catch (error) {
            setError(error.response?.data?.message || "Login Failed")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/70"
                onClick={onClose}
            />
            <div className="relative bg-[#111] w-100 rounded-xl p-6 z-10 border border-gray-800">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white"
                >✕
                </button>
                <h2 className="text-xl font-semibold mb-4">Log in</h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full mb-3 bg-black border border-gray-700 rounded px-3 py-2"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full mb-4 bg-black border border-gray-700 rounded px-3 py-2"
                />

                <button className="w-full bg-purple-600 py-2 rounded font-medium" onClick={handleLogin} disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
                <p className="text-sm text-gray-400 mt-4 text-center">
                    Don't have an account?{" "}
                    <span className="text-purple-500 cursor-pointer">Register</span>

                </p>
            </div>
        </div>
    )
}

export default LoginModal