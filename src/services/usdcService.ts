import { ethers } from 'ethers';

// USDC Contract information on Monad Testnet
export const USDC_CONTRACT_CONFIG = {
  address: "0xf817257fed379853cDe0fa4F97AB987181B1E5Ea", // Real USDC contract address on Monad
  name: "USD Coin",
  symbol: "USDC",
  decimals: 6,
  logoURI: "/src/assets/tokens/usdc.png"
};

// USDC Contract ABI (simplified version based on the provided contract)
export const USDC_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "address", "name": "spender", "type": "address"}
    ],
    "name": "allowance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

interface USDCData {
  price: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  priceChange24h: number;
}

export class USDCService {
  private provider: ethers.providers.JsonRpcProvider;
  private contract: ethers.Contract | null = null;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider('https://testnet-rpc.monad.xyz');
  }

  // Initialize USDC contract
  initializeContract(signerOrProvider?: ethers.Signer | ethers.providers.Provider) {
    try {
      const providerOrSigner = signerOrProvider || this.provider;
      this.contract = new ethers.Contract(USDC_CONTRACT_CONFIG.address, USDC_ABI, providerOrSigner);
      return this.contract;
    } catch (error) {
      console.error('Failed to initialize USDC contract:', error);
      return null;
    }
  }

  // Get USDC balance for an address
  async getUSDCBalance(address: string): Promise<string> {
    try {
      if (!this.contract) {
        this.initializeContract();
      }
      
      const balance = await this.contract?.balanceOf(address);
      return ethers.utils.formatUnits(balance, USDC_CONTRACT_CONFIG.decimals);
    } catch (error) {
      console.error('Error getting USDC balance:', error);
      return "0";
    }
  }

  // Get USDC total supply
  async getTotalSupply(): Promise<string> {
    try {
      if (!this.contract) {
        this.initializeContract();
      }
      
      const totalSupply = await this.contract?.totalSupply();
      return ethers.utils.formatUnits(totalSupply, USDC_CONTRACT_CONFIG.decimals);
    } catch (error) {
      console.error('Error getting USDC total supply:', error);
      return "0";
    }
  }

  // Get current USDC price (in USD)
  async getUSDCPrice(): Promise<number> {
    try {
      // USDC is a stablecoin pegged to USD, so it should always be ~$1.00
      // In a real implementation, you might want to fetch from price oracles
      return 1.00;
    } catch (error) {
      console.error('Error fetching USDC price:', error);
      return 1.00; // Default to $1 as USDC is a stablecoin
    }
  }

  // Get MON to USD conversion rate
  async getMonadPrice(): Promise<number> {
    try {
      // Using the provided rate: 1 MON = 3.168425 USD
      // In production, you might want to fetch this from Kuru SDK or price oracle
      return 3.168425;
    } catch (error) {
      console.error('Error fetching Monad price:', error);
      return 3.168425; // Fallback to provided rate
    }
  }

  // Get comprehensive USDC market data
  async getUSDCMarketData(): Promise<USDCData> {
    try {
      const [price, totalSupply] = await Promise.all([
        this.getUSDCPrice(),
        this.getTotalSupply()
      ]);

      const circulatingSupply = parseFloat(totalSupply);
      
      return {
        price,
        marketCap: price * circulatingSupply,
        volume24h: 50000000, // Mock 24h volume - in production, fetch from DEX or API
        circulatingSupply,
        priceChange24h: 0.05 // USDC typically has very small price changes
      };
    } catch (error) {
      console.error('Error fetching USDC market data:', error);
      // Return mock data if API fails
      return {
        price: 1.00,
        marketCap: 50000000,
        volume24h: 25000000,
        circulatingSupply: 50000000,
        priceChange24h: 0.02
      };
    }
  }

  // Convert USDC amount to MON equivalent
  convertUSDCToMON(usdcAmount: number): Promise<number> {
    return this.getMonadPrice().then(monPrice => usdcAmount / monPrice);
  }

  // Convert MON amount to USDC equivalent
  convertMONToUSDC(monAmount: number): Promise<number> {
    return this.getMonadPrice().then(monPrice => monAmount * monPrice);
  }
}

// Export singleton instance
export const usdcService = new USDCService();