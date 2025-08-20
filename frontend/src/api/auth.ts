import { api } from ".";
import type { AuthResponse, LoginData, RegisterData, User } from "../types/types";

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data.data;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post("/auth/register", data);
  return response.data.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get("/users/me/events");
  return response.data.data.user;
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
