import { getIsWSXListedAsCollateral, getIsWSXEnabled, getSupplyAPY, getBalance, getSupplyBalance, getBorrowBalance, getBorrowAPY, getLiquidityInUSD, mint, borrow, redeem, repayBorrow, approve } from '../../controllers/markets/wsx.controller';
// TODO: Implement the following routes: isCollateral, liquidity, borrowLimit, borrowLimitUsed

import express from 'express';
const router = express.Router();

// Views
router.get('/isCollateral/:userAddress', getIsWSXListedAsCollateral)
router.get('/isEnabled/:userAddress', getIsWSXEnabled)
router.get('/supplyAPY', getSupplyAPY)
router.get('/borrowAPY', getBorrowAPY)
router.get('/marketLiquidity', getLiquidityInUSD)
router.get('/balance/:userAddress', getBalance);
router.get('/supplyBalance/:userAddress', getSupplyBalance);
router.get('/borrowBalance/:userAddress', getBorrowBalance);

// Actions
router.post('/approve', approve);
router.post('/mint', mint);
router.post('/borrow', borrow);
router.post('/redeem', redeem);
router.post('/repayBorrow', repayBorrow);

export default router;