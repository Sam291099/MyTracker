
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

const AuthContext = createContext();

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("mytracker_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("mytracker_token") || ""
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }

    setLoading(false);
  }, [token]);

  const register = async (name, email, password) => {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
    });

    saveAuthentication(response.data);
    return response.data;
  };

  const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    saveAuthentication(response.data);
    return response.data;
  };

  const saveAuthentication = (data) => {
    localStorage.setItem("mytracker_token", data.token);
    localStorage.setItem("mytracker_user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("mytracker_token");
    localStorage.removeItem("mytracker_user");

    setToken("");
    setUser(null);

    delete axios.defaults.headers.common.Authorization;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: Boolean(token && user),
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}
