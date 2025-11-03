// Contract addresses and ABIs for Ethereum Mainnet
// TODO: Add your Ethereum contract addresses here
export const CONTRACTS_ETHEREUM = {
  router: "", // TODO: Add Uniswap V2 Router address
  factory: "", // TODO: Add Uniswap V2 Factory address
  multicall: "", // TODO: Add Multicall contract address
};

// Token list for Ethereum Mainnet
// TODO: Add your Ethereum tokens here
export const TOKENS_ETHEREUM = [
  // Example structure (uncomment and fill when ready):
  // { name: "Wrapped Ether", symbol: "WETH", decimals: 18, address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" },
  // { name: "USD Coin", symbol: "USDC", decimals: 6, address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" },
  // { name: "Tether USD", symbol: "USDT", decimals: 6, address: "0xdAC17F958D2ee523a2206206994597C13D831ec7" },
];

// TODO: Add Router ABI for Ethereum when ready
export const ROUTER_ABI_ETHEREUM: any[] = [];

// TODO: Add Factory ABI for Ethereum when ready
export const FACTORY_ABI_ETHEREUM: any[] = [];

// TODO: Add Pair ABI for Ethereum when ready
export const PAIR_ABI_ETHEREUM: any[] = [];

// ERC20 ABI is standard across all chains
export { ERC20_ABI } from './contracts';