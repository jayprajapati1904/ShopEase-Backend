import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createPaymentOrder = async (req, res) => {
  const { userId, amount, currency = "INR" } = req.body;

  if (!userId || !amount ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const options = {
      amount: Number(amount), // in paise
      currency,
      receipt: `receipt_${uuidv4().replace(/-/g, "").slice(0, 32)}`,
    };

    const order = await razorpay.orders.create(options);

    await pool.query(
      "INSERT INTO payments (user_id, order_id, amount, status) VALUES ($1, $2, $3, $4)",
      [userId, order.id, amount, "created"]
    );

    res.status(201).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Payment creation error:", err);
    res.status(500).json({ message: "Payment creation failed" });
  }
};

export const getPayments = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM payments ORDER BY created_at DESC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Fetch payments error:", err);
    res.status(500).json({ message: err.message });
  }
};
