import { useEffect, useState } from "react";
import { login as loginApi, getMe } from "../api/auth";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    getMe(token)
      .then((res) => setUser(res.data))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await loginApi(email, password);
    const token = res.data.access_token;
    localStorage.setItem("token", token);
    const meRes = await getMe(token);
    setUser(meRes.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const updateUser = (updates) =>
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));

  const adm = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, adm, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
