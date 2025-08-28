import prisma from "../config/db";
import { Request, Response } from "express";
import { User } from "@prisma/client";
import { signToken } from "@/config/jwt";
import { hashPassword } from "@/utils/helpers";

export const getPendingOrganizers = async (req: Request, res: Response) => {
  try {
    const pendingOrganizers = await prisma.user.findMany({
      where: {
        role: "ORGANIZER",
        isApproved: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        organizers: pendingOrganizers,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err instanceof Error ? err.message : "An error occurred",
    });
  }
};

export const approveOrganizer = async (req: Request, res: Response) => {
  try {
    const admin = req.user as User;
    const organizerId = req.params.id;

    const organizer = await prisma.user.findUnique({
      where: { id: organizerId },
    });

    if (!organizer || organizer.role !== "ORGANIZER") {
      return res.status(404).json({
        status: "fail",
        message: "Organizer not found",
      });
    }

    const updatedOrganizer = await prisma.user.update({
      where: { id: organizerId },
      data: {
        isApproved: true,
        approvedAt: new Date(),
        approvedBy: {
          connect: { id: admin.id },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isApproved: true,
        approvedAt: true,
      },
    });

    // Send approval email (you'll need to implement this)
    // await sendApprovalEmail(organizer.email, organizer.name);

    res.status(200).json({
      status: "success",
      data: {
        organizer: updatedOrganizer,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err instanceof Error ? err.message : "An error occurred",
    });
  }
};

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalOrganizers = await prisma.user.count({
      where: { role: "ORGANIZER" },
    });
    const pendingOrganizers = await prisma.user.count({
      where: { role: "ORGANIZER", isApproved: false },
    });
    const totalEvents = await prisma.event.count();
    const totalParticipations = await prisma.participation.count();

    res.status(200).json({
      status: "success",
      data: {
        totalUsers,
        totalOrganizers,
        pendingOrganizers,
        totalEvents,
        totalParticipations,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err instanceof Error ? err.message : "An error occurred",
    });
  }
};

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    // Check if any admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });

    if (existingAdmin) {
      return res.status(403).json({
        status: "fail",
        message: "An admin already exists",
      });
    }

    const { name, email, password } = req.body;

    const hashedPassword = await hashPassword(password);

    const admin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "ADMIN",
        isApproved: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isApproved: true,
      },
    });

    const token = signToken(admin.id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: admin,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err instanceof Error ? err.message : "An error occurred",
    });
  }
};
