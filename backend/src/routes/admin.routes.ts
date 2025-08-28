
import express from 'express';
import { protect, restrictTo } from '../middleware/auth.middleware';
import {
  getPendingOrganizers,
  approveOrganizer,
  getDashboardStats,
  registerAdmin,
} from '../controllers/admin.controller';

const router = express.Router();

// All routes protected and restricted to ADMIN only
router.use(protect, restrictTo('ADMIN'));

router.get('/dashboard/stats', getDashboardStats);
router.get('/organizers/pending', getPendingOrganizers);
router.patch('/organizers/approve/:id', approveOrganizer);
router.post("/register-admin", registerAdmin);

export default router;

