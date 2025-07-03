import pool from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

export const createPayment = async (req, res) => {
  const { userId, amount } = req.body;

  const orderId = 'order_' + uuidv4();
  const paymentId = 'pay_' + uuidv4();

  try {
    await pool.query(
      'INSERT INTO payments (user_id, order_id, payment_id, amount, status) VALUES ($1, $2, $3, $4, $5)',
      [userId, orderId, paymentId, amount, 'pending']
    );
    res.status(201).json({ message: 'Payment created', orderId, paymentId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPayments = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM payments');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
