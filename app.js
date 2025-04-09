import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const app = express();


app.options('*', cors());

app.use(cors({
  origin: 'https://academia-cds.vercel.app', 
  methods: ['GET', 'POST', 'OPTIONS'],  
  allowedHeaders: ['Content-Type', 'Authorization'],  
}));
app.use(express.json());
app.use(authRoutes);

export default app;
