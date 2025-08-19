import express from 'express';
import {
  getAllUsers,
  getUser,
  updateUserRole,
  deleteUser,
  getMyEvents,
} from '../controllers/user.controller';
import { protect, restrictTo } from '../middleware/auth.middleware';

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router.get('/me/events', getMyEvents);

// Only admin can access the following routes
router.use(restrictTo('ADMIN'));

router.get('/', getAllUsers);
router
  .route('/:id')
  .get(getUser)
  .patch(updateUserRole)
  .delete(deleteUser);

export default router;
