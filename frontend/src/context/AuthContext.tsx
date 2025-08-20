import {
  createContext,
  useContext,
  useState,
  useEffect,
  
} from "react";

import type { ReactNode } from "react";
import type { User } from "../types/types";
import {
  login as loginApi,
  register as registerApi,
  getCurrentUser,
  logout as logoutApi,
} from "../api/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const userData = await getCurrentUser();
          setUser(userData);
        } catch (err) {
          console.error("Failed to load user", err);
          logout();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { token: newToken, user: userData } = await loginApi({
      email,
      password,
    });
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(userData);
  };

  const register = async ({
    name,
    email,
    password,
    role,
  }: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }) => {
    const { token: newToken, user: userData } = await registerApi({
      name,
      email,
      password,
      role,
    });
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    logoutApi();
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
