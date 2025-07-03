import express from 'express';
import { signup, signin } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

// ✅ New route to check user auth status
router.get('/check', protect, (req, res) => {
  res.status(200).json({
    message: 'User authenticated',
    user: req.user
  });
});

export default router;
