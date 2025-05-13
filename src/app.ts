import express, { Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import marketRoutes from './routes/market.routes';
import accountRoutes from './routes/account.routes';
import intentRoutes from './routes/intent.routes';
// Load environment variables
dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/intent', intentRoutes);
app.use('/api/markets', marketRoutes);
app.use('/api/account', accountRoutes);

export default app;
