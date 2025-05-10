import { text } from 'body-parser';
import { ethers } from 'ethers';

// Load environment variables
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

export class RelayerService {
    private contract: ethers.Contract;
    private address: String;

    constructor(abi: any, address: string) {
        this.contract = new ethers.Contract(address, abi, signer);
        this.address = address;
    }

    async mintWithIntent(user: string, cToken: string, amount: string, deadline: number, signature: string): Promise<string> {
        const tx = await this.contract.mintWithIntent(user, cToken, amount, deadline, signature);
        await tx.wait();
        return tx.hash;
      }
    
      async redeemWithIntent(user: string, cToken: string, amount: string, deadline: number, signature: string): Promise<string> {
        const tx = await this.contract.redeemUnderlyingWithIntent(user, cToken, amount, deadline, signature);
        await tx.wait();
        return tx.hash;
      }
    
      async borrowWithIntent(user: string, cToken: string, amount: string, deadline: number, signature: string): Promise<string> {
        const tx = await this.contract.borrowWithIntent(user, cToken, amount, deadline, signature);
        await tx.wait();
        return tx.hash;
      }
    
      async repayWithIntent(user: string, cToken: string, amount: string, deadline: number, signature: string): Promise<string> {
        const tx = await this.contract.repayBorrowWithIntent(user, cToken, amount, deadline, signature);
        await tx.wait();
        return tx.hash;
      }
}