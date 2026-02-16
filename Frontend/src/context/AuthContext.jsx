import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { getCurrentUser, logoutUser } from "../api/user.api";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [subscriptionRefreshKey, setSubscriptionRefreshKey] = useState(0);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const res = await getCurrentUser();
                setUser(res.data.data)
            } catch (error) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        loadUser()
    }, [])

    const logout = async () => {
        try {
            await logoutUser();
        } finally {
            setUser(null); // 🔥 THIS WAS MISSING
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading, subscriptionRefreshKey, setSubscriptionRefreshKey }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)