import express from 'express';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

const app = express();
const corsOptions = {
  origin: '*',
  methods: '*',
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true,
  'preflightContinue': false
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(authRoutes);

export default app;
