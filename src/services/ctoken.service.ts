import { text } from 'body-parser';
import { ethers } from 'ethers';

// Load environment variables
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

export class CTokenService {
  private contract: ethers.Contract;
  private address: string;

  constructor(abi: any, address: string) {
    this.contract = new ethers.Contract(address, abi, signer);
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

  async repayUnderlying(amount: string): Promise<string> {
    const tx = await this.contract.redeemUnderlying(amount);
    await tx.wait();
    return tx.hash;
  }

  async repayBorrow(amount: string): Promise<string> {
    const tx = await this.contract.repayBorrow(amount);
    await tx.wait();
    return tx.hash;
  }

  async getCash(): Promise<string> {
    return await this.contract.getCash();
  }

  // Get user's balance in the market
  async getBalance(userAddress: string): Promise<BigInt> {
    return await this.contract.balanceOf(userAddress);
  }

  // Get supply APY
  async getSupplyAPY(): Promise<string> {
    try {
      const supplyRatePerBlock: BigInt = await this.contract.supplyRatePerBlock();
      const blocksPerYear = 2102400n; // ~13.3 seconds per block
      // Forcefully cast supplyrateperblock to bigInt (it already should be a BigInt, this is a failsafe)
      const rate = BigInt(supplyRatePerBlock.toString());

      const scaledRate = (rate * blocksPerYear) / BigInt(1e16); // Convert to percentage
      return scaledRate.toString();
    } catch (error) {
      throw new Error(`Failed to get supply APY: ${error}`);
    }
  }

  // Get borrow APY
  async getBorrowAPY(): Promise<string> {
    try {
      const borrowRatePerBlock: BigInt = await this.contract.borrowRatePerBlock();
      const blocksPerYear = 2102400n; // ~13.3 seconds per block
      // Forcefully cast supplyrateperblock to bigInt (it already should be a BigInt, this is a failsafe)
      const rate = BigInt(borrowRatePerBlock.toString());

      const scaledRate = (rate * blocksPerYear) / BigInt(1e16); // Convert to percentage
      return scaledRate.toString();
    } catch (error) {
      throw new Error(`Failed to get supply APY: ${error}`);
    }
  }

  // Get supply and borrow balances for a user
  async getAccountSnapshot(userAddress: string): Promise<{ supply: string; borrow: string }> {
    const [error, cTokenBalance, borrowBalance, exchangeRateMantissa] =
      await this.contract.getAccountSnapshot(userAddress);

    if (error.toNumber() !== 0) {
      throw new Error(`Error fetching account snapshot: ${error}`);
    }

    // Calculate supply balance based on exchange rate
    const exchangeRate = exchangeRateMantissa / 1e18; // Normalize exchange rate
    const supplyBalance = cTokenBalance * exchangeRate;

    return {
      supply: supplyBalance.toString(),
      borrow: borrowBalance.toString(),
    };
  }

  async getDecimals(): Promise<number> {
    return this.contract.decimals();
  }

  async getExchangeRate(): Promise<string> {
    return this.contract.exchangeRateStored();
  }

  async getSupplyBalance(userAddress: string): Promise<string> {
    try {
      let decimals = await this.contract.decimals();
      let balance = await this.contract.balanceOf(userAddress);
      let exchangeRateMantissa = await this.contract.exchangeRateStored();

      // Post-processing to get the supply balance out
      let proccessedBalance: number = parseFloat(ethers.formatUnits(balance, decimals)) * parseFloat(ethers.formatUnits(exchangeRateMantissa, decimals));

      return proccessedBalance.toFixed(2);
    } catch (err) {
      throw new Error(`Failed to get supply balance: ${err}`);
    }
  }

  async getBorrowBalance(userAddress: string): Promise<string> {

    try {
      let decimals = await this.contract.decimals();
      let borrowBalance = await this.contract.borrowBalanceStored(userAddress);
      let exchangeRateMantissa = await this.contract.exchangeRateStored();
      let proccessedBalance: number = parseFloat(ethers.formatUnits(borrowBalance, decimals)) * parseFloat(ethers.formatUnits(exchangeRateMantissa, decimals));

      return proccessedBalance.toFixed(2);
    } catch (err) {
      throw new Error(`Failed to get borrow balance: ${err}`);
    }
  }

}
