import express from "express";
import { protect, restrictTo } from "../middleware/auth.middleware";
import {
  getOrganizerEvents,
  getOrganizerStats,
} from "../controllers/event.controller";

const router = express.Router();

// All routes are protected and require organizer role
router.use(protect);
router.use(restrictTo("ADMIN", "ORGANIZER"));

/**
 * @swagger
 * tags:
 *   name: Organizer
 *   description: Organizer dashboard APIs
 */

/**
 * @swagger
 * /organizer/events:
 *   get:
 *     summary: Get all events for the current organizer
 *     tags: [Organizer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of organizer's events retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/events", getOrganizerEvents);

/**
 * @swagger
 * /organizer/stats:
 *   get:
 *     summary: Get statistics for the current organizer
 *     tags: [Organizer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Organizer statistics retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/stats", getOrganizerStats);

export default router;