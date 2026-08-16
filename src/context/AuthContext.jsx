import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../config/api";
import { useToast } from "./ToastContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const { showToast } = useToast();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) {
      setToken(savedToken);
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Gagal membaca data user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login gagal");
    }

   setUser(data.user);
   setToken(data.token);

   localStorage.setItem("token", data.token);
   localStorage.setItem("user", JSON.stringify(data.user));

   showToast(`Selamat datang, ${data.user.name}!`, "success");

   closeLogin();

   return data;
  };

  const register = async (name, email, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registrasi gagal");
    }

    showToast("Akun berhasil dibuat! Silakan masuk.", "success");

    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    showToast("Berhasil keluar dari akun.", "success");

    setIsLoginOpen(false);
    setLoginMessage("");
  };

  const openLogin = (message = "Silakan login untuk melanjutkan.") => {
    setAuthMode("login");
    setLoginMessage(message);
    setIsLoginOpen(true);
  };

  const openRegister = () => {
    setAuthMode("register");
    setLoginMessage("");
    setIsLoginOpen(true);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
    setLoginMessage("");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isLoginOpen,
        authMode,
        loginMessage,
        openLogin,
        closeLogin,
        openRegister,
        setAuthMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
