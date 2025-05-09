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

}