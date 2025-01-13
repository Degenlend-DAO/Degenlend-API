import express from 'express';
import { mint, redeem } from '../controllers/market.controller';

const router = express.Router();

router.post('/mint', mint);
router.post('/redeem', redeem);

export default router;
