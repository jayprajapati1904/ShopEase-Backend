import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/userAuthRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);

app.get('/', (req, res) => {
  res.send('PostgreSQL Neon User + Payment Backend running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
