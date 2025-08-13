import { ethers } from 'ethers';

// WBTC Contract ABI (ERC20 + custom functions)
const WBTC_ABI = [
  // ERC20 Standard Functions
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  
  // WBTC Specific Functions
  "function mint(address to, uint256 amount)",
  "function burn(address from, uint256 amount)",
  "function hasRole(bytes32 role, address account) view returns (bool)",
  
  // Events
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
  "event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender)",
];

// WBTC Contract Address on Monad
export const WBTC_CONTRACT_ADDRESS = "0xcf5a6076cfa32686c0Df13aBaDa2b40dec133F1d"; // WBTC address on Monad

// Convert MON price to WBTC price (1 MON = 0.00002648 WBTC)
export const MON_TO_WBTC_RATE = 0.00002648;

export interface WBTCStats {
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  totalSupply: number;
  circulatingSupply: number;
}

export interface WBTCContractInfo {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  contractAddress: string;
}

class WBTCService {
  private contract: ethers.Contract | null = null;
  private provider: ethers.providers.Provider | null = null;

  constructor() {
    this.initializeProvider();
  }

  private async initializeProvider() {
    try {
      // Initialize with Monad RPC
      const rpcUrl = "https://testnet-rpc.monad.xyz";
      this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      
      if (this.provider) {
        this.contract = new ethers.Contract(WBTC_CONTRACT_ADDRESS, WBTC_ABI, this.provider);
      }
    } catch (error) {
      console.error("Failed to initialize WBTC provider:", error);
    }
  }

  // Get real-time WBTC price from multiple sources
  async getWBTCPrice(): Promise<number> {
    try {
      // Try to get price from multiple sources for accuracy
      const responses = await Promise.allSettled([
        fetch('https://api.coingecko.com/api/v3/simple/price?ids=wrapped-bitcoin&vs_currencies=usd'),
        fetch('https://api.coinpaprika.com/v1/tickers/wbtc-wrapped-bitcoin'),
      ]);

      // Try CoinGecko first
      if (responses[0].status === 'fulfilled') {
        const data = await (responses[0].value as Response).json();
        if (data['wrapped-bitcoin']?.usd) {
          return data['wrapped-bitcoin'].usd;
        }
      }

      // Fallback to CoinPaprika
      if (responses[1].status === 'fulfilled') {
        const data = await (responses[1].value as Response).json();
        if (data.quotes?.USD?.price) {
          return data.quotes.USD.price;
        }
      }

      // Final fallback - calculate from MON rate
      // Assuming 1 WBTC ≈ $100,000 (approximate market value)
      const monPriceUSD = 1 / MON_TO_WBTC_RATE; // Convert MON to USD
      return monPriceUSD * MON_TO_WBTC_RATE * 100000; // Approximate WBTC price

    } catch (error) {
      console.error("Error fetching WBTC price:", error);
      // Return approximate WBTC price based on MON rate
      return 100000; // Fallback WBTC price in USD
    }
  }

  // Get WBTC statistics
  async getWBTCStats(): Promise<WBTCStats> {
    try {
      const price = await this.getWBTCPrice();
      
      // Try to get additional stats from CoinGecko
      const response = await fetch('https://api.coingecko.com/api/v3/coins/wrapped-bitcoin');
      const data = await response.json();

      return {
        price,
        priceChange24h: data.market_data?.price_change_percentage_24h || 0,
        volume24h: data.market_data?.total_volume?.usd || 0,
        marketCap: data.market_data?.market_cap?.usd || 0,
        totalSupply: data.market_data?.total_supply || 0,
        circulatingSupply: data.market_data?.circulating_supply || 0,
      };
    } catch (error) {
      console.error("Error fetching WBTC stats:", error);
      const price = await this.getWBTCPrice();
      
      return {
        price,
        priceChange24h: 0,
        volume24h: 0,
        marketCap: 0,
        totalSupply: 0,
        circulatingSupply: 0,
      };
    }
  }

  // Get WBTC contract information
  async getContractInfo(): Promise<WBTCContractInfo> {
    try {
      if (!this.contract) {
        await this.initializeProvider();
      }

      if (this.contract) {
        const [name, symbol, decimals, totalSupply] = await Promise.all([
          this.contract.name(),
          this.contract.symbol(),
          this.contract.decimals(),
          this.contract.totalSupply(),
        ]);

        return {
          name,
          symbol,
          decimals,
          totalSupply: ethers.utils.formatUnits(totalSupply, decimals),
          contractAddress: WBTC_CONTRACT_ADDRESS,
        };
      }
    } catch (error) {
      console.error("Error fetching WBTC contract info:", error);
    }

    // Return default values if contract call fails
    return {
      name: "Wrapped BTC",
      symbol: "WBTC",
      decimals: 8,
      totalSupply: "0",
      contractAddress: WBTC_CONTRACT_ADDRESS,
    };
  }

  // Get WBTC balance for a specific address
  async getBalance(address: string): Promise<string> {
    try {
      if (!this.contract) {
        await this.initializeProvider();
      }

      if (this.contract) {
        const balance = await this.contract.balanceOf(address);
        const decimals = await this.contract.decimals();
        return ethers.utils.formatUnits(balance, decimals);
      }
    } catch (error) {
      console.error("Error fetching WBTC balance:", error);
    }
    return "0";
  }

  // Mint WBTC (requires MINTER_ROLE)
  async mint(to: string, amount: string, signer: ethers.Signer): Promise<ethers.ContractTransaction> {
    if (!this.contract) {
      throw new Error("Contract not initialized");
    }

    const contractWithSigner = this.contract.connect(signer);
    const decimals = await contractWithSigner.decimals();
    const amountWei = ethers.utils.parseUnits(amount, decimals);
    
    return await contractWithSigner.mint(to, amountWei);
  }

  // Burn WBTC (requires BURNER_ROLE)
  async burn(from: string, amount: string, signer: ethers.Signer): Promise<ethers.ContractTransaction> {
    if (!this.contract) {
      throw new Error("Contract not initialized");
    }

    const contractWithSigner = this.contract.connect(signer);
    const decimals = await contractWithSigner.decimals();
    const amountWei = ethers.utils.parseUnits(amount, decimals);
    
    return await contractWithSigner.burn(from, amountWei);
  }

  // Check if address has minter role
  async hasMinterRole(address: string): Promise<boolean> {
    try {
      if (!this.contract) {
        await this.initializeProvider();
      }

      if (this.contract) {
        const MINTER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("MINTER_ROLE"));
        return await this.contract.hasRole(MINTER_ROLE, address);
      }
    } catch (error) {
      console.error("Error checking minter role:", error);
    }
    return false;
  }

  // Check if address has burner role
  async hasBurnerRole(address: string): Promise<boolean> {
    try {
      if (!this.contract) {
        await this.initializeProvider();
      }

      if (this.contract) {
        const BURNER_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("BURNER_ROLE"));
        return await this.contract.hasRole(BURNER_ROLE, address);
      }
    } catch (error) {
      console.error("Error checking burner role:", error);
    }
    return false;
  }
}

export const wbtcService = new WBTCService();