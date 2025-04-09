import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const app = express();
 
 app.use(cors({
   origin: 'https://academia-cds.vercel.app', 
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
   allowedHeaders: ['Content-Type', 'Authorization'], 
   credentials: true 
 }));
app.use(express.json());
app.use(authRoutes);

export default app;
