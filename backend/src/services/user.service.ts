import { User, UserRole } from '@prisma/client';
import prisma from "../controllers/config/db";
import AppError from '../utils/appError';

// export const getAllUsers = async (): Promise<User[]> => {
//   return prisma.user.findMany({
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       role: true,
//       createdAt: true,
//       updatedAt: true,
//     },
//   });
// };

// export const getUserById = async (id: string): Promise<User | null> => {
//   return prisma.user.findUnique({
//     where: { id },
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       role: true,
//       createdAt: true,
//       updatedAt: true,
//     },
//   });
// };

// export const updateUserRole = async (
//   id: string,
//   role: UserRole,
//   currentUserRole: UserRole
// ): Promise<User> => {
//   if (currentUserRole !== 'ADMIN') {
//     throw new AppError('Only admins can update user roles', 403);
//   }

//   return prisma.user.update({
//     where: { id },
//     data: { role },
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       role: true,
//       createdAt: true,
//       updatedAt: true,
//     },
//   });
// };

export const getAllUsers = async (): Promise<Pick<User, 'id' | 'name' | 'email' | 'role' | 'createdAt' | 'updatedAt'>[]> => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getUserById = async (
  id: string
): Promise<Pick<User, 'id' | 'name' | 'email' | 'role' | 'createdAt' | 'updatedAt'> | null> => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const updateUserRole = async (
  id: string,
  role: UserRole,
  currentUserRole: UserRole
): Promise<Pick<User, 'id' | 'name' | 'email' | 'role' | 'createdAt' | 'updatedAt'>> => {
  if (currentUserRole !== 'ADMIN') {
    throw new AppError('Only admins can update user roles', 403);
  }

  return prisma.user.update({
    where: { id },
    data: { role },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const deleteUser = async (
  id: string,
  currentUserRole: UserRole
): Promise<void> => {
  if (currentUserRole !== 'ADMIN') {
    throw new AppError('Only admins can delete users', 403);
  }

  await prisma.user.delete({
    where: { id },
  });
};