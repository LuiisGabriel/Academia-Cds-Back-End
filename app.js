import express from 'express';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

const app = express();
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));
app.use(express.json());
app.use(authRoutes);

export default app;
