import express from 'express';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

const app = express();


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://academia-cds.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());
app.use(authRoutes);

export default app;
