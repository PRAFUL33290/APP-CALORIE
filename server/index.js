import express from 'express';
import cors from 'cors';
import analyzeRouter from './routes/analyze.js';
import mealsRouter from './routes/meals.js';
import { authMiddleware } from './middleware/auth.js';
import { rateLimiter } from './middleware/rateLimit.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Protected routes
app.use('/api/analyze', authMiddleware, rateLimiter, analyzeRouter);
app.use('/api/meals', authMiddleware, mealsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
