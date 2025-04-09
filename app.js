import express from 'express';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

const app = express();


var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(authRoutes);

export default app;
