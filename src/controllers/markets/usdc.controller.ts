import { Request, Response } from 'express';
import cTokenAbi from '../../abis/CErc20Immutable.json';
import tokenAbi from '../../abis/ERC20.json';
import ComptrollerAbi from '../../abis/Comptroller.json';
import { CTokenService } from '../../services/ctoken.service';
import { testnet_addresses } from '../../utils/constants';
import { ComptrollerService } from '../../services/comptroller.service';
import { TokenService } from '../../services/token.service';

const usdcAddress = process.env.USDC_CTOKEN_ADDRESS || testnet_addresses.USDC;
const degenUSDCAddress = testnet_addresses.degenUSDC;
const degenUSDC = new CTokenService(cTokenAbi.abi, degenUSDCAddress);
const usdc = new TokenService(tokenAbi.abi, usdcAddress);
const comptroller = new ComptrollerService(ComptrollerAbi.abi, testnet_addresses.comptroller);

// Views

export const isUSDCListedAsCollateral = async (req: Request, res: Response) => {
  const { walletAddress } = req.params;
  let isCollateral = false;
  try {
    const collateralMarkets = await comptroller.getAssetsIn(walletAddress);

    if (collateralMarkets.includes(usdcAddress))
    {
      isCollateral = true;
    }

    return isCollateral;
  } catch (err) {
    res.status(500).json({
      error: 'Failed to check if USDC is collateral',
      details: (err as Error).message
    })
  }
}


export const getSupplyAPY = async (req: Request, res: Response) => {
  try {
    const apy = await degenUSDC.getSupplyAPY();
    res.status(200).json({
      success: true, 
      apy: apy.toString()
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get supply APY', details: (err as Error).message });
  }
}

export const getBorrowAPY = async (req: Request, res: Response) => {
    try {
        const apy = await degenUSDC.getBorrowAPY();
        res.json({
          success: true, 
          apy: apy.toString()
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to get borrow APY', details: err });
    }
}

export const getSupplyBalance = async (req: Request, res: Response) => {
    try {
        const { userAddress } = req.params;
        const balance = await degenUSDC.getSupplyBalance(userAddress);
        res.json({
          success: true, 
          supplyBalance: balance
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to get supply balance', details: err });
    }
}

export const getBorrowBalance = async (req: Request, res: Response) => {
    try {
        const { userAddress } = req.params;
        const balance = await degenUSDC.getBorrowBalance(userAddress);
        res.json({ success: true, borrowBalance: balance });
    } catch (err) {
        res.status(500).json({ error: 'Failed to get borrow balance', details: err });
    }
}


// Actions

export const approve = async (req: Request, res: Response) => {
  
  const { amount, spender } = req.body;
  try {
    const txHash = await usdc.approve(spender, amount);
    res.json({ success: true, txHash });
  } catch (err) {
    res.status(500).json({ error: 'Approval failed', details: err });
  }

}


export const mint = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const txHash = await degenUSDC.mint(amount);
    res.json({ success: true, txHash });
  } catch (err) {
    res.status(500).json({ error: 'Mint failed', details: err });
  }
};

export const redeem = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const txHash = await degenUSDC.redeem(amount);
    res.json({ success: true, txHash });
  } catch (err) {
    res.status(500).json({ error: 'Redeem failed', details: err });
  }
};

export const borrow = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const txHash = await degenUSDC.borrow(amount);
    res.json({ success: true, txHash});
  } catch (err) {
    res.status(500).json({ error: 'Borrow failed', details: err });
  }
};

export const repayBorrow = async (req: Request, res: Response) => {
  try {
    const {amount } = req.body;
    const txHash = await degenUSDC.repayBorrow(amount);
    res.json({ success: true, txHash});
    } catch (err) {
      res.status(500).json({ error: 'Repay failed', details: err });
    }
  };
