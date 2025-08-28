import express from 'express';
import authRouter from './auth.routes';
import eventRouter from './event.routes';
import userRouter from './user.routes';
import organizerRouter from './organizer.routes'; // Add this import
import adminRouter from './admin.routes'; // Add this import

const router = express.Router();

router.use('/auth', authRouter);
router.use('/events', eventRouter);
router.use('/users', userRouter);
router.use('/organizer', organizerRouter); // Add this line
router.use('/organizer', adminRouter); // Add this line

export default router;