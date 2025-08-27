import prisma from '../config/db';
import { User } from '@prisma/client';
import { Request, Response } from 'express';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err instanceof Error ? err.message : 'An error occurred',
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new Error('No user found with that ID');
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err instanceof Error ? err.message : 'An error occurred',
    });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user as User;
    const { role } = req.body;

    if (currentUser.role !== 'ADMIN') {
      throw new Error('Only admins can update user roles');
    }

    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err instanceof Error ? err.message : 'An error occurred',
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user as User;

    if (currentUser.role !== 'ADMIN') {
      throw new Error('Only admins can delete users');
    }

    await prisma.user.delete({
      where: { id: req.params.id },
    });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err instanceof Error ? err.message : 'An error occurred',
    });
  }
};

// export const getMyEvents = async (req: Request, res: Response) => {
//   try {
//     const user = req.user as User;

//     const organizedEvents = await prisma.event.findMany({
//       where: {
//         organizers: {
//           some: {
//             id: user.id,
//           },
//         },
//       },
//     });

//     const participations = await prisma.participation.findMany({
//       where: {
//         userId: user.id,
//       },
//       include: {
//         event: true,
//       },
//     });

//     res.status(200).json({
//       status: 'success',
//       data: {
//         organizedEvents,
//         participations: participations.map((p) => p.event),
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err instanceof Error ? err.message : 'An error occurred',
//     });
//   }
// };

export const getMyEvents = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;

    // Fetch user details
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        // Add other user fields you want to include
      }
    });

    if (!userData) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    const organizedEvents = await prisma.event.findMany({
      where: {
        organizers: {
          some: {
            id: user.id,
          },
        },
      },
    });

    const participations = await prisma.participation.findMany({
      where: {
        userId: user.id,
      },
      include: {
        event: true,
      },
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: userData, // Include user data in the response
        organizedEvents,
        participations: participations.map((p) => p.event),
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err instanceof Error ? err.message : 'An error occurred',
    });
  }
};