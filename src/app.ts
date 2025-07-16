import express, { application, Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import marketRoutes from './routes/market.routes';
import accountRoutes from './routes/account.routes';
import intentRoutes from './routes/intent.routes';
// Load environment variables
dotenv.config();

const app: Application = express();

const PROD = process.env.NODE_ENV;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


if (PROD === 'development') {
    // Testnet Routes
    app.use('/api/intent', intentRoutes);
    app.use('/api/markets', marketRoutes);
    app.use('/api/account', accountRoutes);
    
}

if (PROD === 'production') {
    // Mainnet routes
    app.use('/mainnet/intent', intentRoutes);
    app.use('/mainnet/markets', marketRoutes);
    app.use('/mainnet/account', accountRoutes);
}
export default app;
