import express from 'express';
import { getAccountLiquidity, getAccountBalance, getSupplyBalance, getBorrowBalance, getNetApy, getBorrowLimit, getChainId, getNetworkId, getRPCUrl, enterMarket, exitMarket } from '../controllers/account.controller';

const router = express.Router();

// Routers for Metadata
router.get('/rpc_url', getRPCUrl);
router.get('/network_id', getNetworkId);
router.get('/chain_id', getChainId);

// Route to get account liquidity
router.get('/liquidity/:userAddress', getAccountLiquidity);

// Route to get cToken balance of a user
router.get('/balance/:userAddress', getAccountBalance);

// Route to get supply balance
router.get('/supplyBalance/:userAddress', getSupplyBalance);

// Route to get borrow balance
router.get('/borrowBalance/:userAddress', getBorrowBalance);

// Route to get the net APY
router.get('/apy/:userAddress', getNetApy);

// Route to get borrow limit
router.get('/borrowLimit/:userAddress', getBorrowLimit);

// Route to enter a market
router.post('/enterMarket', enterMarket);

// Route to exit a market
router.post('/exitMarket', exitMarket);

export default router;
