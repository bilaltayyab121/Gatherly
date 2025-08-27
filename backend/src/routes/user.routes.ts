// import express from 'express';
// import {
//   getAllUsers,
//   getUser,
//   updateUserRole,
//   deleteUser,
//   getMyEvents,
// } from '../controllers/user.controller';
// import { protect, restrictTo } from '../middleware/auth.middleware';

// const router = express.Router();

// // Protect all routes after this middleware
// router.use(protect);

// router.get('/me/events', getMyEvents);

// // Only admin can access the following routes
// router.use(restrictTo('ADMIN'));

// router.get('/', getAllUsers);
// router
//   .route('/:id')
//   .get(getUser)
//   .patch(updateUserRole)
//   .delete(deleteUser);

// export default router;

// src/routes/user.routes.ts
import express from "express";
import {
  getAllUsers,
  getUser,
  updateUserRole,
  deleteUser,
  getMyEvents,
} from "../controllers/user.controller";
import { protect, restrictTo } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management & administration
 */

/**
 * @swagger
 * /users/me/events:
 *   get:
 *     summary: Get events of the logged-in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of events created or registered by the user
 *       401:
 *         description: Unauthorized
 */
router.get("/me/events", protect, getMyEvents);

// Only admin can access below routes
router.use(protect, restrictTo("ADMIN"));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a single user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 *
 *   patch:
 *     summary: Update user role (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [ADMIN, PARTICIPANT]
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       400:
 *         description: Invalid role
 *       404:
 *         description: User not found
 *
 *   delete:
 *     summary: Delete a user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.route("/:id").get(getUser).patch(updateUserRole).delete(deleteUser);

export default router;
