import { Request, Response } from 'express';
import { ethers } from 'ethers';
import { ComptrollerService } from '../services/comptroller.service';
import { CTokenService } from '../services/ctoken.service';
import comptrollerAbi from '../abis/Comptroller.json';
import cTokenAbi from '../abis/CErc20Immutable.json';

import { testnet_addresses, mainnet_addresses } from '../utils/constants';

import { RelayerService } from '../services/relayer.service';
import RelayerABI from '../abis/DegenLendRelayer.json';

// Initialize ComptrollerService and CTokenService
const comptrollerAddress = process.env.COMPTROLLER_ADDRESS! || testnet_addresses.comptroller;
const cTokenAddress = process.env.CTOKEN_ADDRESS! || testnet_addresses['degenWSX#CErc20Immutable'];

const comptrollerService = new ComptrollerService(comptrollerAbi.abi, comptrollerAddress);
const cTokenService = new CTokenService(cTokenAbi.abi, cTokenAddress);

// Initialize Relayer
const relayerAddress = process.env.RELAYER_ADDRESS || testnet_addresses.degenlendRelayer;
const relayer = new RelayerService(RelayerABI.abi, relayerAddress);

const degenUSDCAddress = testnet_addresses['degenUSDC#CErc20Immutable'];
const degenUSDC = new CTokenService(cTokenAbi.abi, degenUSDCAddress);

const degenWSXAddress = testnet_addresses['degenWSX#CErc20Immutable'];
const degenWSX = new CTokenService(cTokenAbi.abi, degenWSXAddress);

// Account metadata
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// Metadata

/**
 * Get RPC URL
 */
export const getRPCUrl = async (req: Request, res: Response) => {

  try {
    res.json({
      success: true,
        rpcUrl: 'https://rpc.toronto.sx.technology/'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'failed to fetch RPC URL',
      details: (error as Error).message
    })
  }

}


/**
 * Get Network ID
 */
export const getNetworkId = async (req: Request, res: Response) => {
  try {
    const network = await provider.getNetwork();
    res.json({
      success: true,
      networkId: network.chainId.toString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'failed to fetch network ID',
      details: (error as Error).message
    });
  }
}

/**
 * Get Chain ID
 */
export const getChainId = async (req: Request, res: Response) => {
  try {
    const network = await provider.getNetwork();
    res.json({
      success: true,
      chainId: network.chainId.toString(),
    });
  } catch (error) {
    console.error(`[ERROR] Failed to fetch chain ID: ${error}`);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch chain ID',
      details: (error as Error).message
    });
  }
}

/**
 * Get account liquidity (borrow capacity)
 */
export const getAccountLiquidity = async (req: Request, res: Response) => {
  try {
    const { userAddress } = req.params;
    const liquidityDetails = await comptrollerService.getAccountLiquidity(userAddress);
    res.json({
      success: true,
      liquidity: liquidityDetails.liquidity.toString() // Convert to string
    });
  } catch (err) {
    console.error(`[ERROR] Failed to fetch account liquidity: ${err}`);
    res.status(500).json({
      success: false,
      liquidity: "0",
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
    const cTokenBalance: BigInt = await cTokenService.getBalance(userAddress);
    res.json({
      success: true,
      userAddress,
      balance: cTokenBalance.toString() // Changed property name and converted to string
    });
  } catch (err) {
    console.error(`[ERROR] Failed to fetch account balance: ${err}`);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch account balance',
      details: (err as Error).message
    });
  }
};

/**
 *  Get the user's nonce
 */
export const getCurrentIntentNonce = async (req: Request, res: Response) => {
  try {
    const { userAddress } = req.params;

    const currentNonce: string = await relayer.getNonce(userAddress);

    res.json({
      success: true,
      userAddress,
      currentNonce
    })
  } catch (error) {
    console.error(`[ERROR] Failed to fetch current account intent nonce`);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch account nonce',
      details: (error as Error).message
    })
  }
}

/**
 * Get Supply Balance
 */

export const getSupplyBalance = async (req: Request, res: Response) => {
  try {
    const { userAddress } = req.params;

        // Fetch supply balances in parallel
        const [wsxRaw, usdcRaw] = await Promise.all([
          degenWSX.getSupplyBalance(userAddress),
          degenUSDC.getSupplyBalance(userAddress)
        ]);
    
        const wsx = Number(wsxRaw)
        const usdc = Number(usdcRaw)
      
        let rawNetSupplyBalance = wsxRaw + usdcRaw;
        let netSupplyBalance = wsx + usdc;

    res.json({
      success: true,
      userAddress,
      rawSupplyBalance: rawNetSupplyBalance,
      supplyBalance: netSupplyBalance
    })
  } catch (error) {
    console.error(`[ERROR] Failed to fetch supply balance: ${error}`);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch supply balance',
      details: (error as Error).message
    });
  }
};

/**
 * Get Borrow Balance
 */
export const getBorrowBalance = async (req: Request, res: Response) => {
  try {
    const { userAddress } = req.params;

    // Fetch borrow balances in parallel
    const [wsxRaw, usdcRaw] = await Promise.all([
      degenWSX.getBorrowBalance(userAddress),
      degenUSDC.getBorrowBalance(userAddress)
    ]);

    const wsx = Number(wsxRaw)
    const usdc = Number(usdcRaw)
  
    let rawNetBorrowBalance = wsxRaw + usdcRaw;
    let netBorrowBalance = wsx + usdc;
    res.json({
      success: true,
      userAddress,
      rawBorrowBalance: rawNetBorrowBalance,
      borrowBalance: netBorrowBalance
    });
  } catch (error) {
    res.json({
      success: false,
      error: 'Failed to get borrow balance',
      details: (error as Error).message
    })
  }
};

/**
 * Get Borrow Limit
 */
export const getBorrowLimit = async (req: Request, res: Response) => {
  try {
    const { userAddress } = req.params;
    res.json({
      success: true,
      userAddress,
      borrowLimit: 1,
      borrowLimitUsed: 10
    });
  } catch (error) {
    res.json({
      success: false,
      error: 'Failed to get borrow limit',
      details: (error as Error).message
    });
  }
};

/**
 * Get Net APY
 */

export const getNetApy = async (req: Request, res: Response) => {
  try {
    const { userAddress } = req.params;
    
    // Fetch balances and APYs in parallel
    const [
      wsxSupplyRaw, usdcSupplyRaw,
      wsxBorrowRaw, usdcBorrowRaw,
      wsxSupplyApy, usdcSupplyApy,
      wsxBorrowApy, usdcBorrowApy
    ] = await Promise.all([
      degenWSX.getSupplyBalance(userAddress),
      degenUSDC.getSupplyBalance(userAddress),
      degenWSX.getBorrowBalance(userAddress),
      degenUSDC.getBorrowBalance(userAddress),
      degenWSX.getSupplyAPY(),
      degenUSDC.getSupplyAPY(),
      degenWSX.getBorrowAPY(),
      degenUSDC.getBorrowAPY()
    ]);

    // Convert balances to numbers (or BigInt if needed)
    const wsxSupply = Number(wsxSupplyRaw);
    const usdcSupply = Number(usdcSupplyRaw);
    const wsxBorrow = Number(wsxBorrowRaw);
    const usdcBorrow = Number(usdcBorrowRaw);

    // Weighted supply APY
    const totalSupply = wsxSupply + usdcSupply;
    const weightedSupplyApy = totalSupply > 0
      ? ((wsxSupply * Number(wsxSupplyApy)) + (usdcSupply * Number(usdcSupplyApy))) / totalSupply
      : 0;

    // Weighted borrow APY
    const totalBorrow = wsxBorrow + usdcBorrow;
    const weightedBorrowApy = totalBorrow > 0
      ? ((wsxBorrow * Number(wsxBorrowApy)) + (usdcBorrow * Number(usdcBorrowApy))) / totalBorrow
      : 0;

    // Net APY = supply APY - borrow APY
    const netApy = weightedSupplyApy - weightedBorrowApy;
    res.json({
      success: true,
      userAddress,
      netApy: netApy
    });
  } catch (error) {
    res.json({
      success: false,
      error: 'Failed to get net APY',
      details: (error as Error).message
    });
  }
};

export const enterMarket = async (req: Request, res: Response) => {
  try {
    const { markets } = req.body;
    const txHash = await comptrollerService.enterMarkets(markets);
    res.json({ success: true, data: { txHash } });
  } catch (err) {
    console.error(`[ERROR] Failed to enter market: ${err}`);
    res.status(500).json({
      success: false,
      error: 'Failed to enter market',
      details: (err as Error).message,
    });
  }
};

export const exitMarket = async (req: Request, res: Response) => {
  try {
    const { market } = req.body;
    let parsedMarket = market;
    if (!parsedMarket || !ethers.isAddress(parsedMarket)) {
       res.status(400).json({
        success: false,
        error: 'Invalid market address'
      });
    }
    const txHash = await comptrollerService.exitMarket(market);
    res.json({ success: true,  data: { txHash }  });
  } catch (err) {
    console.error(`[ERROR] Failed to exit market: ${err}`);
    res.status(500).json({
      success: false,
      error: 'Failed to exit market',
      details: (err as Error).message,
    });
  }
} 