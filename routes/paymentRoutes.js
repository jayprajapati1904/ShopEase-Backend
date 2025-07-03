import express from 'express';
import { createPaymentOrder, getPayments } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/orders', protect, createPaymentOrder);
router.get('/all', protect, getPayments);

export default router;
