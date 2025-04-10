import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes'

const app = express();


 app.options('https://academia-cds.vercel.app', (req, res) => {
     res.header('Access-Control-Allow-Origin', 'https://academia-cds.vercel.app');  
     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
     res.header('Access-Control-Allow-Credentials', 'true');
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
