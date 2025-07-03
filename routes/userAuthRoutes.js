  import express from 'express';
  import { signup, signin, logout, getProfile } from '../controllers/authController.js';
  import { protect } from '../middleware/authMiddleware.js';

  const router = express.Router();

  router.post('/signup', signup);
  router.post('/signin', signin);
  router.post('/logout', logout);
  router.get('/profile', protect, getProfile);  // ✅ new profile endpoint


  router.get('/check', protect, (req, res) => {
    // Additional validation
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Invalid user data' });
    }

    res.status(200).json({
      message: 'User authenticated',
      user: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        // Only return necessary fields
      }
    });
  });

  export default router;
