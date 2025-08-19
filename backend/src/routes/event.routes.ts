import express from 'express';
import { protect, restrictTo } from '../middleware/auth.middleware';
import {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  joinEvent,
  getEventParticipants,
} from '../controllers/event.controller';

const router = express.Router();

// Public routes
router.get('/', getAllEvents);
router.get('/:id', getEvent);

// Protected routes
router.use(protect);

router.post('/:id/join', joinEvent);
router.get('/:id/participants', restrictTo('ADMIN', 'ORGANIZER'), getEventParticipants);

// Admin/Organizer routes
router.use(restrictTo('ADMIN', 'ORGANIZER'));

router.post('/', createEvent);
router.patch('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;