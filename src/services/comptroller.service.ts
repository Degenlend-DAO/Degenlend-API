import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

export class ComptrollerService {
  private contract: ethers.Contract;

  constructor(abi: any, address: string) {
    this.contract = new ethers.Contract(address, abi, provider);
  }

  async enterMarkets(markets: string[]): Promise<string> {
    const tx = await this.contract.enterMarkets(markets);
    await tx.wait();
    return tx.hash;
  }

  async exitMarket(market: string): Promise<string> {
    const tx = await this.contract.exitMarket(market);
    await tx.wait();
    return tx.hash;
  }

  async getAccountLiquidity(address: string) {
    const [error, liquidity, shortfall] = await this.contract.getAccountLiquidity(address);
    if (error.toNumber() !== 0) {
      throw new Error(`Error fetching account liquidity: ${error}`);
    }

    return {
      liquidity: ethers.formatUnits(liquidity, 18),
      shortfall: ethers.formatUnits(shortfall, 18),
    };
  }

  async getAssetsIn(address: string) {
    return await this.contract.getAssetsIn(address);
  }
}
