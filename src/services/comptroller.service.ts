import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

export class ComptrollerService {
  private contract: ethers.Contract;

  constructor(abi: any, address: string) {
    this.contract = new ethers.Contract(address, abi, provider);
  }

  async getAccountLiquidity(address: string) {
    const [error, liquidity, shortfall] = await this.contract.getAccountLiquidity(address);
    return { error, liquidity: liquidity.toString(), shortfall: shortfall.toString() };
  }
}
