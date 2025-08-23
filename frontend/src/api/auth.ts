import { api } from ".";
import type { AuthResponse, LoginData, RegisterData, User } from "../types/types";

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", data);
  const {
    token,
    data: { user },
  } = response.data;
  return { token, user };
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post("/auth/register", data);
  const {
    token,
    data: { user },
  } = response.data;
  return { token, user };
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get("/users/me/events");

  // Adjust this based on your actual API response structure
  // If the user data is nested in response.data.data.user
  if (response.data.data && response.data.data.user) {
    return response.data.data.user;
  }

  // If the user data is directly in response.data.user
  if (response.data.user) {
    return response.data.user;
  }

  // If the response data is the user object itself
  return response.data;
};

export const forgotPassword = async (email: string): Promise<void> => {
  await api.post("/auth/forgot-password", { email });
};

export const resetPassword = async (
  token: string,
  password: string
): Promise<void> => {
  await api.patch(`/auth/reset-password/${token}`, { password });
};

export const logout = (): void => {
  localStorage.removeItem("token");
};
