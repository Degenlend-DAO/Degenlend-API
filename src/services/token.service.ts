import { ethers } from 'ethers';

// Load environment variables
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);


export class TokenService {
    private contract: ethers.Contract;
    private address: string;

    constructor(abi: any, address: string) {
        this.contract = new ethers.Contract(address, abi, signer);
        this.address = address;
    }

    async approve(spender: string, amount: string): Promise<string> {
        const tx = await this.contract.approve(spender, amount);
        await tx.wait();
        return tx.hash;
    }

    async allowance(owner: string, spender: string): Promise<string> {
        const allowance = await this.contract.allowance(owner, spender);
        return allowance.toString();
    }

    async balanceOf(address: string): Promise<string> {
        const balance = await this.contract.balanceOf(address);
        return balance.toString();
    }
}