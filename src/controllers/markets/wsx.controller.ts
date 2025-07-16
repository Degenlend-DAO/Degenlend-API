import { Request, Response } from 'express';
import tokenAbi from '../../abis/ERC20.json';
import OracleAbi from '../../abis/PriceOracle.json';
import cTokenAbi from '../../abis/CErc20Immutable.json';
import ComptrollerAbi from '../../abis/Comptroller.json';

import { formatUnits } from 'ethers';
import { testnet_addresses } from '../../utils/constants';
import { TokenService } from '../../services/token.service';
import { OracleService } from '../../services/oracle.service';
import { CTokenService } from '../../services/ctoken.service';
import { ComptrollerService } from '../../services/comptroller.service';
import { DEGEN_TOKEN_BIGINT, DEGEN_TOKEN_DECIMALS } from '../../utils/constants';

const wsxAddress = process.env.WSX_CTOKEN_ADDRESS || testnet_addresses.WSX;
const degenWSXAddress = testnet_addresses['degenWSX#CErc20Immutable'];
const degenWSX = new CTokenService(cTokenAbi.abi, degenWSXAddress);
const wsx = new TokenService(tokenAbi.abi, wsxAddress);
const priceOracle = new OracleService(OracleAbi.abi, testnet_addresses.priceOracle);
const comptroller = new ComptrollerService(ComptrollerAbi.abi, testnet_addresses.comptroller);

// Views

export const getIsWSXListedAsCollateral = async (req: Request, res: Response) => {
  try {
    const { userAddress } = req.params;
    const collateralMarkets = await comptroller.getAssetsIn(userAddress);
    let isCollateral = false;
    if (collateralMarkets.includes(testnet_addresses['degenWSX#CErc20Immutable'])) {
      isCollateral = true;
    }
    res.json({
      success: true,
      isCollateral: isCollateral
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to check if WSX is listed as collateral', details: (err as Error).message });
  }
}

export const getIsWSXEnabled = async (req: Request, res: Response) => {
  try {
    let isEnabled = false;
    const { owner, spender } = req.body;
    const allowance = await wsx.allowance(owner, spender);
    if (BigInt(allowance) > 0n) isEnabled = true;
    res.json({
      success: true,
      isEnabled: isEnabled
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to check if WSX is enabled', details: (err as Error).message });
  }
}

export const getSupplyAPY = async (req: Request, res: Response) => {
  try {
    const apy = await degenWSX.getSupplyAPY();
    res.json({
      success: true,
      apy: apy
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get supply APY', details: (err as Error).message });
  }
}

export const getBorrowAPY = async (req: Request, res: Response) => {
  try {
    const apy = await degenWSX.getBorrowAPY();
    res.json({
      success: true,
      apy: apy
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get borrow APY', details: err });
  }
}

export const getLiquidityInUSD = async (req: Request, res: Response) => { // Incomplete

  try {
    const cash = await degenWSX.getCash();
    const wsxPriceMantissa = await priceOracle.getUnderlyingPrice(testnet_addresses.degenWSX);

    const liquidityInCash = formatUnits(cash, DEGEN_TOKEN_DECIMALS);
    const wsxPrice = formatUnits(wsxPriceMantissa, DEGEN_TOKEN_DECIMALS);

    const wsxLiquidityInUSD = Number(wsxPrice) * Number(liquidityInCash);

    res.json({
      success: true,
      wsxLiquidityInUSD: wsxLiquidityInUSD
    })

  } catch (err) {
    res.status(500).json({ error: 'Failed to get USD liquidity in WSX money market', details: (err as Error).message })
  }

}

export const getBalance = async (req: Request, res: Response) => {
  try {
    const { userAddress } = req.params;
    const rawBalance = await wsx.balanceOf(userAddress);
    const rawBigInt = Number(rawBalance)
    const formattedBalance = rawBigInt / 1e18 // WSX token has 18 decimals
    res.json({
      success: true,
      rawBalance: rawBalance,
      balance: formattedBalance
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get balance', details: (err as Error).message });
  }
}

export const getSupplyBalance = async (req: Request, res: Response) => {
  try {
    const { userAddress } = req.params;
    const rawBalance = await degenWSX.getSupplyBalance(userAddress); // should return BigInt or string
    const rawBigInt = Number(rawBalance)
    const formattedBalance = rawBigInt / DEGEN_TOKEN_BIGINT; // 1e8 as BigInt
    res.json({
      success: true,
      rawSupplyBalance: rawBigInt,
      supplyBalance: formattedBalance
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get supply balance', details: `${err}` });
  }
}

export const getBorrowBalance = async (req: Request, res: Response) => {
  try {
    const { userAddress } = req.params;
    const rawBalance = await degenWSX.getBorrowBalance(userAddress);
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
    const txHash = await wsx.approve(spender, amount);
    res.json({ success: true, txHash });
  } catch (err) {
    res.status(500).json({ error: 'Approval failed', details: err });
  }

}

export const mint = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const txHash = await degenWSX.mint(amount);
    res.json({ success: true, txHash });
  } catch (err) {
    res.status(500).json({ error: 'Mint failed', details: err });
  }
};

export const redeem = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const txHash = await degenWSX.redeem(amount);
    res.json({ success: true, txHash });
  } catch (err) {
    res.status(500).json({ error: 'Redeem failed', details: err });
  }
};

export const borrow = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const txHash = await degenWSX.borrow(amount);
    res.json({ success: true, txHash });
  } catch (err) {
    res.status(500).json({ error: 'Borrow failed', details: err });
  }
};

export const repayBorrow = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const txHash = await degenWSX.repayBorrow(amount);
    res.json({ success: true, txHash });
  } catch (err) {
    res.status(500).json({ error: 'Repay failed', details: err });
  }
};
