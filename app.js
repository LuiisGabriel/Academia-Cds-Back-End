import express from 'express';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true,
  preflightContinue: false
};

app.use(cors({
  origin: 'https://academia-cds.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(authRoutes);

export default app;
