import { Request, Response } from 'express';
import { CTokenService } from '../services/ctoken.service';
import cTokenAbi from '../abis/CErc20Immutable.json';

const cTokenAddress = process.env.CTOKEN_ADDRESS!;
const cTokenService = new CTokenService(cTokenAbi, cTokenAddress);

export const mint = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const txHash = await cTokenService.mint(amount);
    res.json({ success: true, txHash });
  } catch (err) {
    res.status(500).json({ error: 'Mint failed', details: err });
  }
};

export const redeem = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const txHash = await cTokenService.redeem(amount);
    res.json({ success: true, txHash });
  } catch (err) {
    res.status(500).json({ error: 'Redeem failed', details: err });
  }
};


export const borrow = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const txHash = await cTokenService.borrow(amount);
    res.json({ success: true, txHash});
  } catch (err) {
    res.status(500).json({ error: 'Borrow failed', details: err });
  }
};

export const repayBorrow = async (req: Request, res: Response) => {
  try {
    const {amount } = req.body;
    const txHash = await cTokenService.repayBorrow(amount);
    res.json({ success: true, txHash});
    } catch (err) {
      res.status(500).json({ error: 'Repay failed', details: err });
    }
  };