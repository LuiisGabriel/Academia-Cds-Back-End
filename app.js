import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://academia-cds.vercel.app');  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204); 
});

app.use(cors({
  origin: 'https://academia-cds.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true,  
}));
app.use(express.json());
app.use(authRoutes);

export default app;
