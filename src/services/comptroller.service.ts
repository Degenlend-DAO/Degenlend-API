import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

export class ComptrollerService {
  private contract: ethers.Contract;

  constructor(abi: any, address: string) {
    this.contract = new ethers.Contract(address, abi, signer);
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
    const result = await this.contract.getAccountLiquidity(address);
    const error = Number(result[0]);

    if (error !== 0)
    {
      throw new Error(`Contract error code: ${error}`);
    }

    return {
      liquidity: ethers.formatUnits(result[1], 18),
      shortfall: ethers.formatUnits(result[2], 18),
    };
  }

  async getAssetsIn(address: string) {
    return await this.contract.getAssetsIn(address);
  }
}
