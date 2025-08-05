
import { ethers } from 'ethers';
import { KuruToken } from './kuruService';

// WMON contract ABI for wrapping/unwrapping
const WMON_ABI = [
  'function deposit() external payable',
  'function withdraw(uint256) external',
  'function balanceOf(address) external view returns (uint256)',
  'function decimals() external view returns (uint8)',
  'function symbol() external view returns (string)',
  'function name() external view returns (string)',
  'event Deposit(address indexed dst, uint256 wad)',
  'event Withdrawal(address indexed src, uint256 wad)'
];

// Real WMON address on Monad testnet
const WMON_ADDRESS = '0x760AfE86e5de5fa0Ee542fc7B7B713e1c5425701';

export interface WrappingResult {
  txHash: string;
  amount: string;
  type: 'wrap' | 'unwrap';
}

class WrappingService {
  private provider: ethers.providers.JsonRpcProvider;
  private signer: ethers.Signer | null = null;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider('https://testnet-rpc.monad.xyz');
  }

  initialize(signer: ethers.Signer) {
    this.signer = signer;
  }

  /**
   * Check if a swap is actually a wrap/unwrap operation
   */
  isWrappingOperation(tokenIn: KuruToken, tokenOut: KuruToken): boolean {
    const isMONToWMON = tokenIn.address === ethers.constants.AddressZero && 
                       tokenOut.address === WMON_ADDRESS;
    const isWMONToMON = tokenIn.address === WMON_ADDRESS && 
                       tokenOut.address === ethers.constants.AddressZero;
    
    return isMONToWMON || isWMONToMON;
  }

  /**
   * Get quote for wrapping operations (1:1 ratio)
   */
  getWrappingQuote(tokenIn: KuruToken, tokenOut: KuruToken, amountIn: string) {
    if (!this.isWrappingOperation(tokenIn, tokenOut)) {
      return null;
    }

    return {
      inputAmount: amountIn,
      outputAmount: amountIn, // 1:1 ratio for wrapping
      priceImpact: 0,
      route: [tokenIn.symbol, tokenOut.symbol],
      gasEstimate: '0.0001',
      slippage: 0,
      marketPrice: '1.0',
      executionPrice: '1.0',
    };
  }

  /**
   * Execute wrapping operation
   */
  async executeWrapping(
    tokenIn: KuruToken,
    tokenOut: KuruToken,
    amountIn: string,
    recipient: string
  ): Promise<WrappingResult> {
    if (!this.signer) {
      throw new Error('Signer not initialized');
    }

    if (!this.isWrappingOperation(tokenIn, tokenOut)) {
      throw new Error('Not a wrapping operation');
    }

    const wmonContract = new ethers.Contract(WMON_ADDRESS, WMON_ABI, this.signer);
    const amount = ethers.utils.parseEther(amountIn);

    try {
      let tx;
      let type: 'wrap' | 'unwrap';

      if (tokenIn.address === ethers.constants.AddressZero) {
        // Wrap MON to WMON
        console.log(`Wrapping ${amountIn} MON to WMON`);
        tx = await wmonContract.deposit({ value: amount, gasLimit: 100000 });
        type = 'wrap';
      } else {
        // Unwrap WMON to MON
        console.log(`Unwrapping ${amountIn} WMON to MON`);
        tx = await wmonContract.withdraw(amount, { gasLimit: 100000 });
        type = 'unwrap';
      }

      console.log(`${type === 'wrap' ? 'Wrap' : 'Unwrap'} transaction submitted:`, tx.hash);
      await tx.wait();
      console.log(`${type === 'wrap' ? 'Wrap' : 'Unwrap'} transaction confirmed`);

      return {
        txHash: tx.hash,
        amount: amountIn,
        type
      };
    } catch (error: any) {
      console.error('Wrapping operation failed:', error);
      throw new Error(`${tokenIn.symbol} to ${tokenOut.symbol} ${tokenIn.address === ethers.constants.AddressZero ? 'wrap' : 'unwrap'} failed: ${error.message}`);
    }
  }

  /**
   * Verify if WMON contract exists and is valid
   */
  async verifyWMONContract(): Promise<boolean> {
    try {
      const wmonContract = new ethers.Contract(WMON_ADDRESS, WMON_ABI, this.provider);
      const symbol = await wmonContract.symbol();
      const name = await wmonContract.name();
      
      console.log(`WMON contract verified - Symbol: ${symbol}, Name: ${name}`);
      return symbol === 'WMON' || name.includes('Wrapped');
    } catch (error) {
      console.error('WMON contract verification failed:', error);
      return false;
    }
  }
}

export const wrappingService = new WrappingService();
