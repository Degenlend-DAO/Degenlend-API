import { getSupplyAPY, getSupplyBalance, getBorrowBalance, getBorrowAPY, mint, borrow, redeem, repayBorrow, approve } from '../../controllers/markets/usdc.controller';
// TODO: Implement the following routes: isCollateral, liquidity, borrowLimit, borrowLimitUsed

import express from 'express';
const router = express.Router();

router.get('/supplyAPY', getSupplyAPY);
router.get('/borrowAPY', getBorrowAPY);
router.get('/supplyBalance/:userAddress', getSupplyBalance);
router.get('/borrowBalance/:userAddress', getBorrowBalance);
router.get('/approve', approve);
router.post('/mint', mint);
router.post('/borrow', borrow);
router.post('/redeem', redeem);
router.post('/repayBorrow', repayBorrow);

export default router;