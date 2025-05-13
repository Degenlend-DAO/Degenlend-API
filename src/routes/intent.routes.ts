
import { Router } from 'express';
import {
  mintIntent,
  redeemIntent,
  borrowIntent,
  repayIntent
} from '../controllers/intent.controller';

const router = Router();

router.post('/mint', mintIntent);
router.post('/redeem', redeemIntent);
router.post('/borrow', borrowIntent);
router.post('/repay', repayIntent);

export default router;
