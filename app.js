import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const app = express();

const corsOptions = {
  credentials: true,
  origin: "*"
}

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());
app.use(authRoutes);

export default app;
