import { ethers } from 'ethers';

// Load environment variables
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);



export class OracleService {
    private contract: ethers.Contract;
    private address: string;

    constructor(abi: any, address: string) {
        this.contract = new ethers.Contract(address, abi, wallet);
        this.address = address;
    }

    async getUnderlyingPrice(address: string): Promise<string> {
        return this.contract.getUnderlyingPrice(address);
    }
}