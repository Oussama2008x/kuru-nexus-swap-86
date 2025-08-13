import { ethers } from 'ethers';

// WETH Contract information on Monad Testnet
export const WETH_CONTRACT_CONFIG = {
  address: "0xB5a30b0FDc42e3E9760Cb8449Fb37", // WETH contract address on Monad
  name: "Wrapped Ethereum",
  symbol: "WETH",
  decimals: 18,
  logoURI: "/src/assets/tokens/weth.jpg"
};

// WETH Contract ABI based on the repository
export const WETH_ABI = [
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
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "wad", "type": "uint256"}],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "value", "type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

interface WETHData {
  price: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  priceChange24h: number;
  ethPrice: number;
}

export class WETHService {
  private provider: ethers.providers.JsonRpcProvider;
  private contract: ethers.Contract | null = null;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider('https://testnet-rpc.monad.xyz');
  }

  // Initialize WETH contract
  initializeContract(signerOrProvider?: ethers.Signer | ethers.providers.Provider) {
    try {
      const providerOrSigner = signerOrProvider || this.provider;
      this.contract = new ethers.Contract(WETH_CONTRACT_CONFIG.address, WETH_ABI, providerOrSigner);
      return this.contract;
    } catch (error) {
      console.error('Failed to initialize WETH contract:', error);
      return null;
    }
  }

  // Get WETH balance for an address
  async getWETHBalance(address: string): Promise<string> {
    try {
      if (!this.contract) {
        this.initializeContract();
      }
      
      const balance = await this.contract?.balanceOf(address);
      return ethers.utils.formatEther(balance);
    } catch (error) {
      console.error('Error getting WETH balance:', error);
      return "0";
    }
  }

  // Get WETH total supply
  async getTotalSupply(): Promise<string> {
    try {
      if (!this.contract) {
        this.initializeContract();
      }
      
      const totalSupply = await this.contract?.totalSupply();
      return ethers.utils.formatEther(totalSupply);
    } catch (error) {
      console.error('Error getting WETH total supply:', error);
      return "0";
    }
  }

  // Get current ETH price (WETH should be 1:1 with ETH)
  async getETHPrice(): Promise<number> {
    try {
      // Try to get real ETH price from multiple sources
      const responses = await Promise.allSettled([
        fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'),
        fetch('https://api.coinpaprika.com/v1/tickers/eth-ethereum'),
      ]);

      // Try CoinGecko first
      if (responses[0].status === 'fulfilled') {
        const data = await (responses[0].value as Response).json();
        if (data.ethereum?.usd) {
          return data.ethereum.usd;
        }
      }

      // Fallback to CoinPaprika
      if (responses[1].status === 'fulfilled') {
        const data = await (responses[1].value as Response).json();
        if (data.quotes?.USD?.price) {
          return data.quotes.USD.price;
        }
      }

      // Final fallback
      return 3400.50;
    } catch (error) {
      console.error('Error fetching ETH price:', error);
      return 3400.50; // Fallback price
    }
  }

  // Get MON to USD conversion rate
  async getMonadPrice(): Promise<number> {
    try {
      // Using the provided rate: 1 MON = 0.00074865 ETH equivalent
      // Converting to USD: 0.00074865 * ETH_PRICE
      const ethPrice = await this.getETHPrice();
      return 0.00074865 * ethPrice;
    } catch (error) {
      console.error('Error calculating Monad price:', error);
      return 0.00074865 * 3400.50; // Fallback calculation
    }
  }

  // Get comprehensive WETH market data
  async getWETHMarketData(): Promise<WETHData> {
    try {
      const [ethPrice, totalSupply] = await Promise.all([
        this.getETHPrice(),
        this.getTotalSupply()
      ]);

      const circulatingSupply = parseFloat(totalSupply);
      
      return {
        price: ethPrice, // WETH should be 1:1 with ETH
        ethPrice,
        marketCap: ethPrice * circulatingSupply,
        volume24h: 150000000, // Mock 24h volume - in production, fetch from DEX or API
        circulatingSupply,
        priceChange24h: 2.35 // Mock price change
      };
    } catch (error) {
      console.error('Error fetching WETH market data:', error);
      // Return mock data if API fails
      return {
        price: 3400.50,
        ethPrice: 3400.50,
        marketCap: 85000000000,
        volume24h: 150000000,
        circulatingSupply: 25000000,
        priceChange24h: 1.85
      };
    }
  }

  // Convert WETH amount to MON equivalent
  async convertWETHToMON(wethAmount: number): Promise<number> {
    const [ethPrice, monPrice] = await Promise.all([
      this.getETHPrice(),
      this.getMonadPrice()
    ]);
    const wethValueInUSD = wethAmount * ethPrice;
    return wethValueInUSD / monPrice;
  }

  // Convert MON amount to WETH equivalent
  async convertMONToWETH(monAmount: number): Promise<number> {
    const [ethPrice, monPrice] = await Promise.all([
      this.getETHPrice(),
      this.getMonadPrice()
    ]);
    const monValueInUSD = monAmount * monPrice;
    return monValueInUSD / ethPrice;
  }

  // Wrap ETH to WETH
  async wrapETH(amount: string, signer: ethers.Signer): Promise<ethers.ContractTransaction> {
    try {
      const contract = new ethers.Contract(WETH_CONTRACT_CONFIG.address, WETH_ABI, signer);
      const value = ethers.utils.parseEther(amount);
      return await contract.deposit({ value });
    } catch (error) {
      console.error('Error wrapping ETH:', error);
      throw error;
    }
  }

  // Unwrap WETH to ETH
  async unwrapWETH(amount: string, signer: ethers.Signer): Promise<ethers.ContractTransaction> {
    try {
      const contract = new ethers.Contract(WETH_CONTRACT_CONFIG.address, WETH_ABI, signer);
      const value = ethers.utils.parseEther(amount);
      return await contract.withdraw(value);
    } catch (error) {
      console.error('Error unwrapping WETH:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const wethService = new WETHService();