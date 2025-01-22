import express from 'express';
import { getAccountLiquidity, getAccountBalance, getSupplyBalance, getBorrowBalance, getNetApy, getBorrowLimit } from '../controllers/account.controller';

const router = express.Router();

// Route to get account liquidity
router.get('/liquidity/:userAddress', getAccountLiquidity);

// Route to get cToken balance of a user
router.get('/balance/:userAddress', getAccountBalance);

// Route to get supply balance
router.get('/supply/:userAddress', getSupplyBalance);

// Route to get borrow balance
router.get('/borrow/:userAddress', getBorrowBalance);

// Route to get the net APY
router.get('/netAPY/:userAddress', getNetApy);

// Route to get borrow limit
router.get('/borrowLimit/:userAddress', getBorrowLimit);

export default router;
