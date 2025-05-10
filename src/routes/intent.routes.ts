
import { Router } from 'express';
import {
  mintIntent,
  redeemIntent,
  borrowIntent,
  repayIntent
} from '../controllers/intent.controller';

const router = Router();

router.post('/intent/mint', mintIntent);
router.post('/intent/redeem', redeemIntent);
router.post('/intent/borrow', borrowIntent);
router.post('/intent/repay', repayIntent);

export default router;
