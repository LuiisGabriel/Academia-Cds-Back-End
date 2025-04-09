import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const app = express();


app.options('*', cors());

app.use(express.json());
app.use(authRoutes);

export default app;
