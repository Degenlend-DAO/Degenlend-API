import express from 'express';
import usdcRoutes from './markets/usdc.routes';
import wsxRoutes from './markets/wsx.routes';

const router = express.Router();

router.use('/usdc', usdcRoutes);
router.use('/wsx', wsxRoutes);

export default router;
