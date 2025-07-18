import { Request, Response } from 'express';
import tokenAbi from '../../abis/ERC20.json';
import OracleAbi from '../../abis/PriceOracle.json';
import cTokenAbi from '../../abis/CErc20Immutable.json';
import ComptrollerAbi from '../../abis/Comptroller.json';
import { TokenService } from '../../services/token.service';
import { OracleService } from '../../services/oracle.service';
import { CTokenService } from '../../services/ctoken.service';
import { ComptrollerService } from '../../services/comptroller.service';
import { DEGEN_TOKEN_BIGINT, DEGEN_TOKEN_DECIMALS, testnet_addresses, mainnet_addresses } from '../../utils/constants';


const usdcAddress = process.env.USDC_CTOKEN_ADDRESS || testnet_addresses.USDC;
const degenUSDCAddress = testnet_addresses['degenUSDC#CErc20Immutable'];;
const degenUSDC = new CTokenService(cTokenAbi.abi, degenUSDCAddress);
const usdc = new TokenService(tokenAbi.abi, usdcAddress);
const priceOracle = new OracleService(OracleAbi.abi, testnet_addresses.priceOracle);
const comptroller = new ComptrollerService(ComptrollerAbi.abi, testnet_addresses.comptroller);

// Views

export const getIsUSDCListedAsCollateral = async (req: Request, res: Response) => {
  try {
    const { userAddress } = req.params;
    const collateralMarkets = await comptroller.getAssetsIn(userAddress);
    let isCollateral = false;
    console.log(`\n\n Collateral Markets: ${collateralMarkets} \n\n`);
    if (collateralMarkets.includes(testnet_addresses['degenUSDC#CErc20Immutable'])) {
        isCollateral = true;
    } else {
        isCollateral = false;
    }
    res.json({
      success: true,
      isCollateral: isCollateral
    })
  } catch (err) {
    res.status(500).json({ error: 'failed to check if USDC is listed as collateral', details: (err as Error).message })
  }
}

export const getIsUSDCEnabled = async (req: Request, res: Response) => {
  try {
    let isEnabled = false;
    const { owner, spender } = req.body;
    const allowance = await usdc.allowance(owner, spender);
    if (BigInt(allowance) > 0n) isEnabled = true;
    res.json({
      success: true,
      isEnabled: isEnabled
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to check if USDC is enabled', details: (err as Error).message })
  }
}

export const getSupplyAPY = async (req: Request, res: Response) => {
  try {
    const apy = await degenUSDC.getSupplyAPY();
    res.status(200).json({
      success: true, 
      apy: apy
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
          apy: apy
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to get borrow APY', details: err });
    }
}

export const getLiquidityInUSD = async (req: Request, res: Response) => {
  try {
    const cash = await degenUSDC.getCash();
    const liquidityInCash = Number(cash) / DEGEN_TOKEN_DECIMALS; // USDC has 6 decimals
    const usdcPrice = await priceOracle.getUnderlyingPrice(testnet_addresses.degenUSDC);
    const usdcLiquidityInUSD = Number(usdcPrice) * Number(liquidityInCash);

    res.json({
      success: true,
      usdcLiquidityInUSD: usdcLiquidityInUSD
    })
  } catch (err) {
    res.status(500).json({ error: 'Failed to get liquidity in USD', details: err})
  }
}

export const getBalance = async (req: Request, res: Response) => {
  try {
    const { userAddress } = req.params;
    const rawBalance = await usdc.balanceOf(userAddress);
    const rawBigInt = Number(rawBalance)
    const formattedBalance = rawBigInt / 1e6 // WSX token has 6 decimals
    res.json({
      success: true,
      rawBalance: rawBalance,
      balance: formattedBalance
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get balance', details: err })
  }
}

export const getSupplyBalance = async (req: Request, res: Response) => {
    try {
    const { userAddress } = req.params;
    const rawBalance = await degenUSDC.getSupplyBalance(userAddress); // should return BigInt or string
    const rawBigInt = Number(rawBalance)
    const formattedBalance = rawBigInt / DEGEN_TOKEN_BIGINT; // 1e8 as BigInt
    res.json({
      success: true,
      rawSupplyBalance: rawBigInt,
      supplyBalance: formattedBalance
    });
    } catch (err) {
        res.status(500).json({ error: 'Failed to get supply balance', details: err });
    }
}

export const getBorrowBalance = async (req: Request, res: Response) => {
    try {
    const { userAddress } = req.params;
    const rawBalance = await degenUSDC.getBorrowBalance(userAddress);
    const rawBigInt = Number(rawBalance);
    const formattedBalance = rawBigInt / DEGEN_TOKEN_BIGINT
    res.json({ 
      success: true,
      rawBorrowBalance: rawBigInt,
      borrowBalance: formattedBalance
     });
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
