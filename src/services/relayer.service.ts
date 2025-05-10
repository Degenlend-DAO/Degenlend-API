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
}