import { useState } from "react";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  const updateUser = (updates) =>
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  const adm = user?.email === "admin@gmail.com" ? true : false;

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, adm }}>
      {children}
    </AuthContext.Provider>
  );
};
