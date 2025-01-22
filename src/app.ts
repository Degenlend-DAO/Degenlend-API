import express, { Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import marketRoutes from './routes/market.routes';
import accountRoutes from './routes/account.routes';

// Load environment variables
dotenv.config();

const app: Application = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Default
app.use('/', (req, res) => {
    res.send('Welcome to the Degenlend API');
    res.status(200);
    });

// Routes
app.use('/api/market', marketRoutes);
app.use('/api/account', accountRoutes);

export default app;
