
import { Request, Response } from 'express';
import { RelayerService } from '../services/relayer.service';
import RelayerABI from '../abis/DegenLendRelayer.json';
import { testnet_addresses, mainnet_addresses } from '../utils/constants';

const relayerAddress = process.env.RELAYER_ADDRESS || testnet_addresses.degenlendRelayer;
const relayer = new RelayerService(RelayerABI.abi, relayerAddress);

export const mintIntent = async (req: Request, res: Response) => {
  try {
    const { user, cToken, amount, deadline, signature } = req.body;
    const txHash = await relayer.mintWithIntent(user, cToken, amount, deadline, signature);
    res.json({ success: true, txHash });
  } catch (err) {
    res.status(500).json({ error: 'Mint intent failed', details: err });
  }
};

export const redeemIntent = async (req: Request, res: Response) => {
  try {
    const { user, cToken, amount, deadline, signature } = req.body;
    const txHash = await relayer.redeemWithIntent(user, cToken, amount, deadline, signature);
    res.json({ success: true, txHash });
  } catch (err) {
    res.status(500).json({ error: 'Redeem intent failed', details: err });
  }
};

export const borrowIntent = async (req: Request, res: Response) => {
  try {
    const { user, cToken, amount, deadline, signature } = req.body;
    const txHash = await relayer.borrowWithIntent(user, cToken, amount, deadline, signature);
    res.json({ success: true, txHash });
  } catch (err) {
    res.status(500).json({ error: 'Borrow intent failed', details: err });
  }
};

export const repayIntent = async (req: Request, res: Response) => {
  try {
    const { user, cToken, amount, deadline, signature } = req.body;
    const txHash = await relayer.repayWithIntent(user, cToken, amount, deadline, signature);
    res.json({ success: true, txHash });
  } catch (err) {
    res.status(500).json({ error: 'Repay intent failed', details: err });
  }
};
