import { ethers } from 'ethers';

// Load environment variables
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

export class CTokenService {
  private contract: ethers.Contract;
  private address: string;

  constructor(abi: any, address: string) {
    this.contract = new ethers.Contract(address, abi, wallet);
    this.address = address;
}

  async mint(amount: string): Promise<string> {
    const tx = await this.contract.mint(amount);
    await tx.wait();
    return tx.hash;
  }

  async redeem(amount: string): Promise<string> {
    const tx = await this.contract.redeem(amount);
    await tx.wait();
    return tx.hash;
  }

  async borrow(amount: string): Promise<string> {
    const tx = await this.contract.borrow(amount);
    await tx.wait();
    return tx.hash;
  }

  async repayBorrow(amount: string): Promise<string> {
    const tx = await this.contract.repayBorrow(amount);
    await tx.wait();
    return tx.hash;
  }

  async getBalance(userAddress: string): Promise<string> {
    return this.contract.balanceOf(userAddress);
  }
}
