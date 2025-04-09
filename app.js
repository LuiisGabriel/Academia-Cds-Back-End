import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.options('*', (req, res) => {
  res.sendStatus(200); 
});

const corsOrigin = {
  origin: 'https://academia-cds.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true,  
  optionSuccessStatus:200
};

app.use(cors(corsOrigin));
app.use(express.json());
app.use(authRoutes);

export default app;
