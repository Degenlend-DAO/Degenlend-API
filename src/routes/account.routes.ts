import express from 'express';
import { getAccountLiquidity, getAccountBalance } from '../controllers/account.controller';

const router = express.Router();

// Route to get account liquidity
router.get('/liquidity/:userAddress', getAccountLiquidity);

// Route to get cToken balance of a user
router.get('/balance/:userAddress', getAccountBalance);

export default router;
