import express from 'express';
import { getAccountLiquidity, getAccountBalance, getSupplyBalance, getBorrowBalance, getNetApy, getBorrowLimit } from '../controllers/account.controller';

const router = express.Router();

// Route to get account liquidity
router.get('/liquidity/:userAddress', getAccountLiquidity);

// Route to get cToken balance of a user
router.get('/balance/:userAddress', getAccountBalance);
``
// Route to get supply balance
router.get('/supplyBalance/:userAddress', getSupplyBalance);

// Route to get borrow balance
router.get('/borrowBalance/:userAddress', getBorrowBalance);

// Route to get the net APY
router.get('/apy/:userAddress', getNetApy);

// Route to get borrow limit
router.get('/borrowLimit/:userAddress', getBorrowLimit);

export default router;
