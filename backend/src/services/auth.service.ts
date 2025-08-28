import { User } from '@prisma/client';
import prisma from "../controllers/config/db";
import { comparePassword, hashPassword } from "../utils/helpers";
import AppError from "../utils/appError";
import { signToken } from "../controllers/config/jwt";

export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
  role?: User['role'];
}): Promise<User> => {
  const hashedPassword = await hashPassword(userData.password);

  return prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role: userData.role || 'PARTICIPANT',
    },
  });
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await comparePassword(password, user.password))) {
    throw new AppError('Incorrect email or password', 401);
  }

  return user;
};

export const updatePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || !(await comparePassword(currentPassword, user.password))) {
    throw new AppError('Your current password is wrong.', 401);
  }

  const hashedPassword = await hashPassword(newPassword);

  return prisma.user.update({
    where: { id: userId },
    data: {
      password: hashedPassword,
    },
  });
};