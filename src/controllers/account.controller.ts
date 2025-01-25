import { Request, Response } from 'express';
import { ComptrollerService } from '../services/comptroller.service';
import { CTokenService } from '../services/ctoken.service';
import comptrollerAbi from '../abis/Comptroller.json';
import cTokenAbi from '../abis/CErc20Immutable.json';
import { formatUnits } from 'ethers';
import { testnet_addresses } from '../utils/constants';

// Initialize ComptrollerService and CTokenService
const comptrollerAddress = process.env.COMPTROLLER_ADDRESS! || testnet_addresses.comptroller;
const cTokenAddress = process.env.CTOKEN_ADDRESS! || testnet_addresses.degenWSX;

const comptrollerService = new ComptrollerService(comptrollerAbi.abi, comptrollerAddress);
const cTokenService = new CTokenService(cTokenAbi.abi, cTokenAddress);


// Metadata

/**
 * Get RPC URL
 */
export const getRPCUrl = async (req: Request, res: Response) => {

  try {
    res.json({
      success: true,
      data: {
        rpcUrl: 'https://rpc.toronto.sx.technology/'
      }
    })
  } catch (error) {

  }

}


/**
 * Get Network ID
 */
export const getNetworkId = async (req: Request, res: Response) => {
  try {

    res.json({
      success: true,
      data: {
        networkId: 1
      }
    })
  } catch (error) {

  }
}

/**
 * Get Chain ID
 */
export const getChainId = async (req: Request, res: Response) => {
  try {

    res.json({
      success: true,
      data: {
        chainId: 1,
      }
    })

  } catch (error) {
    console.error(`[ERROR] Failed to fetch chain ID: ${error}`);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch chain ID',
      details: (error as Error).message
    })
  }
}

/**
 * Get account liquidity (borrow capacity)
 */
export const getAccountLiquidity = async (req: Request, res: Response) => {
  try {
    const { userAddress } = req.params;

    // Query account liquidity from Comptroller
    const liquidityDetails = await comptrollerService.getAccountLiquidity(userAddress);

    const formattedLiquidity = parseFloat(formatUnits(liquidityDetails.liquidity, 18));

    res.json({
      success: true,
      data: formattedLiquidity,
    });
  } catch (err) {
    console.error(`[ERROR] Failed to fetch account liquidity: ${err}`);
    res.status(500).json({
      success: false,
      data: 0,
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
    const cTokenBalance: BigInt = await cTokenService.getBalance(userAddress);
    const accountBalance = Number(cTokenBalance);
    res.json({
      success: true,
      data: {
        userAddress,
        accountBalance,
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


/**
 * Get Supply Balance
 */

export const getSupplyBalance = async (req: Request, res: Response) => {
  try {
    const { userAddress } = req.params;


    res.json({
      success: true,
      data: {
        userAddress,
        supplyBalance: 1
      }
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
    res.json({
      success: true,
      data: {
        userAddress,
        borrowBalance: 1
      }
    });
  } catch (error) {

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
      data: {
        userAddress,
        borrowLimit: 1
      }
    });
  } catch (error) {

  }
};

/**
 * Get Net APY
 */

export const getNetApy = async (req: Request, res: Response) => {
  try {
    const { userAddress } = req.params;
    res.json({
      success: true,
      data: {
        userAddress,
        netApy: 1
      }
    });
  } catch (error) {

  }
};