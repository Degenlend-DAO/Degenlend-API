import { Request, Response } from 'express';
import { ComptrollerService } from '../services/comptroller.service';
import { CTokenService } from '../services/ctoken.service';
import comptrollerAbi from '../abis/Comptroller.json';
import cTokenAbi from '../abis/CToken.json';

// Initialize ComptrollerService and CTokenService
const comptrollerAddress = process.env.COMPTROLLER_ADDRESS!;
const cTokenAddress = process.env.CTOKEN_ADDRESS!;

const comptrollerService = new ComptrollerService(comptrollerAbi, comptrollerAddress);
const cTokenService = new CTokenService(cTokenAbi, cTokenAddress);

/**
 * Get account liquidity (borrow capacity)
 */
export const getAccountLiquidity = async (req: Request, res: Response) => {
  try {
    const { userAddress } = req.params;

    // Query account liquidity from Comptroller
    const liquidity = await comptrollerService.getAccountLiquidity(userAddress);

    res.json({
      success: true,
      data: liquidity,
    });
  } catch (err) {
    console.error(`[ERROR] Failed to fetch account liquidity: ${err}`);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch account liquidity',
      details: (err as Error).message,
    });
  }
};

/**
 * Get user cToken balance
 */
export const getAccountBalance = async (req: Request, res: Response) => {
  try {
    const { userAddress } = req.params;

    // Query user's cToken balance
    const cTokenBalance = await cTokenService.getBalance(userAddress);

    res.json({
      success: true,
      data: {
        userAddress,
        cTokenBalance,
      },
    });
  } catch (err) {
    console.error(`[ERROR] Failed to fetch account balance: ${err}`);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch account balance',
      details: (err as Error).message,
    });
  }
};
