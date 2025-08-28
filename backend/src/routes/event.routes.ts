import express from "express";
import {
  protect,
  restrictTo,
  checkOrganizerApproved,
} from "../middleware/auth.middleware";
import {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  joinEvent,
  getEventParticipants,
} from "../controllers/event.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management and participation APIs
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events retrieved successfully
 */
router.get("/", getAllEvents);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Event ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event details retrieved successfully
 *       404:
 *         description: Event not found
 */
router.get("/:id", getEvent);

// Protected routes
router.use(protect);

/**
 * @swagger
 * /events/{id}/join:
 *   post:
 *     summary: Join an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Event ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully joined the event
 *       400:
 *         description: Already joined or invalid request
 */
router.post("/:id/join", joinEvent);

/**
 * @swagger
 * /events/{id}/participants:
 *   get:
 *     summary: Get participants of an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Event ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of participants retrieved successfully
 *       403:
 *         description: Unauthorized, only ADMIN or ORGANIZER can view
 */
router.get(
  "/:id/participants",
  restrictTo("ADMIN", "ORGANIZER"),
  getEventParticipants
);

// Apply to routes that require organizer privileges
router.post(
  "/",
  protect,
  restrictTo("ORGANIZER", "ADMIN"),
  checkOrganizerApproved,
  createEvent
);
router.patch(
  "/:id",
  protect,
  restrictTo("ORGANIZER", "ADMIN"),
  checkOrganizerApproved,
  updateEvent
);
router.delete(
  "/:id",
  protect,
  restrictTo("ORGANIZER", "ADMIN"),
  checkOrganizerApproved,
  deleteEvent
);

export default router;
