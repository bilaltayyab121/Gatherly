import { Request, Response } from "express";
import prisma from "../config/db";
import { signToken } from "../config/jwt";
import { comparePassword, hashPassword } from "../utils/helpers";
import { sendEmail } from "../services/mail.service";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "PARTICIPANT",
      },
    });

    const token = signToken(user.id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          isApproved: user.isApproved, // Add this line
        },
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err instanceof Error ? err.message : "An error occurred",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide email and password");
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await comparePassword(password, user.password))) {
      throw new Error("Incorrect email or password");
    }

    const token = signToken(user.id);

    res.status(200).json({
      status: "success",
      token,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          isApproved: user.isApproved, // Add this line
        },
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err instanceof Error ? err.message : "An error occurred",
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // For security reasons, don't reveal if the email exists or not
      return res.status(200).json({
        status: "success",
        message:
          "If the email is registered, you will receive a password reset link",
      });
    }

    const resetToken = signToken(user.id);
    const resetTokenExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpires,
      },
    });

    // Use your frontend URL instead of backend API URL
    const resetUrl = `${process.env.VERCEL_URL}/reset-password/${resetToken}`;

    // Create HTML email template
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #4F46E5;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 0 0 5px 5px;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4F46E5;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            margin: 15px 0;
          }
          .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Password Reset Request</h1>
        </div>
        <div class="content">
          <p>Hello ${user.name},</p>
          <p>You recently requested to reset your password for your EventHub account. Click the button below to reset it.</p>
          
          <a href="${resetUrl}" class="button">Reset Your Password</a>
          
          <p>This password reset link will expire in 10 minutes.</p>
          <p>If you didn't request a password reset, please ignore this email or contact support if you have questions.</p>
          
          <div class="footer">
            <p>Thank you,<br>The EventHub Team</p>
            <p>If you're having trouble with the button above, copy and paste the URL below into your web browser:</p>
            <p>${resetUrl}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const message = `You requested a password reset for your EventHub account. Please use the following link to reset your password: ${resetUrl}. This link will expire in 10 minutes. If you didn't request this, please ignore this email.`;

    await sendEmail({
      email: user.email,
      subject: "EventHub - Password Reset Request",
      text: message,
      html: html,
    });

    res.status(200).json({
      status: "success",
      message: "Password reset link sent to your email!",
    });
  } catch (err) {
    console.error("Error in forgotPassword:", err);
    res.status(500).json({
      status: "error",
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as unknown as {
      id: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      },
    });

    const newToken = signToken(user.id);

    res.status(200).json({
      status: "success",
      token: newToken,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err instanceof Error ? err.message : "An error occurred",
    });
  }
};
