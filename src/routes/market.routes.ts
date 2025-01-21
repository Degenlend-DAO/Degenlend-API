import express from 'express';
import { mint, redeem, borrow, repayBorrow } from '../controllers/market.controller';

const router = express.Router();

router.post('/mint', mint);
router.post('/redeem', redeem);
router.post('/borrow', borrow);
router.post('/repay', repayBorrow);

export default router;
