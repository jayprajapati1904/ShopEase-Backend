import express from 'express';
import { createPayment, getPayments } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createPayment);
router.get('/all', protect, getPayments);

export default router;
