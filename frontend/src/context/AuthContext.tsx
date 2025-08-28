import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/types";
import {
  login as loginApi,
  register as registerApi,
  getCurrentUser,
  logout as logoutApi,
} from "../api/auth";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    role?: "ADMIN" | "ORGANIZER" | "PARTICIPANT";
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
          // const response = await getCurrentUser();
          const response = (await getCurrentUser()) as unknown;

          console.log("res => ", response);

          // Handle different response formats
          let userData: User;

          // If response has a data property (like {status: 'success', data: {...}})
          if (
            typeof response === "object" &&
            response !== null &&
            "data" in response
          ) {
            const responseData = response.data as any;
            userData = {
              id: responseData.id || "",
              name: responseData.name || "",
              email: responseData.email || "",
              role:
                (responseData.role as "ADMIN" | "ORGANIZER" | "PARTICIPANT") ||
                "PARTICIPANT",
              createdAt: responseData.createdAt || new Date().toISOString(),
            };
          }
          // If response is the user object directly (like {id: ..., name: ..., etc.})
          else {
            userData = response as User;
          }

          // If we still don't have a role, try to get it from the token
          if (!userData.role && token) {
            try {
              const decodedToken: any = jwtDecode(token);
              userData.role = decodedToken.role;
            } catch (decodeError) {
              console.error("Failed to decode token", decodeError);
            }
          }

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
    setUser(userData as User);
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
    role?: "ADMIN" | "ORGANIZER" | "PARTICIPANT";
  }) => {
    const { token: newToken, user: userData } = await registerApi({
      name,
      email,
      password,
      role,
    });

    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(userData as User);
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
