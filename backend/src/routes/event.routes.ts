// import express from 'express';
// import { protect, restrictTo } from '../middleware/auth.middleware';
// import {
//   getAllEvents,
//   getEvent,
//   createEvent,
//   updateEvent,
//   deleteEvent,
//   joinEvent,
//   getEventParticipants,
// } from '../controllers/event.controller';

// const router = express.Router();

// // Public routes
// router.get('/', getAllEvents);
// router.get('/:id', getEvent);

// // Protected routes
// router.use(protect);

// router.post('/:id/join', joinEvent);
// router.get('/:id/participants', restrictTo('ADMIN', 'ORGANIZER'), getEventParticipants);

// // Admin/Organizer routes
// router.use(restrictTo('ADMIN', 'ORGANIZER'));

// router.post('/', createEvent);
// router.patch('/:id', updateEvent);
// router.delete('/:id', deleteEvent);

// export default router;

import express from "express";
import { protect, restrictTo } from "../middleware/auth.middleware";
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

// Admin/Organizer routes
router.use(restrictTo("ADMIN", "ORGANIZER"));

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", createEvent);

/**
 * @swagger
 * /events/{id}:
 *   patch:
 *     summary: Update an event
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 */
router.patch("/:id", updateEvent);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event
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
 *       204:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 */
router.delete("/:id", deleteEvent);

export default router;
