// Token prices in USD - Smart pricing engine for Monad Testnet
export interface TokenPrice {
  symbol: string;
  price: number; // Price in USD
  lastUpdated: number;
}

export const TOKEN_PRICES: Record<string, TokenPrice> = {
  'YAKI': { symbol: 'YAKI', price: 0.0130, lastUpdated: Date.now() },
  'WMON': { symbol: 'WMON', price: 3.2749, lastUpdated: Date.now() },
  'MON': { symbol: 'MON', price: 3.2749, lastUpdated: Date.now() }, // Native MONAD
  'USDC': { symbol: 'USDC', price: 1.0049, lastUpdated: Date.now() },
  'USDT': { symbol: 'USDT', price: 0.9938, lastUpdated: Date.now() },
  'CHOG': { symbol: 'CHOG', price: 0.2257, lastUpdated: Date.now() },
  'BEAN': { symbol: 'BEAN', price: 4.9277, lastUpdated: Date.now() },
  'WETH': { symbol: 'WETH', price: 4181.83, lastUpdated: Date.now() },
  'WBTC': { symbol: 'WBTC', price: 113252, lastUpdated: Date.now() },
  'WSOL': { symbol: 'WSOL', price: 214.77, lastUpdated: Date.now() }
};

// Smart price calculation function
export const calculateTokenAmount = (
  fromAmount: string,
  fromSymbol: string,
  toSymbol: string
): string => {
  if (!fromAmount || !fromSymbol || !toSymbol || isNaN(Number(fromAmount))) {
    return '';
  }

  const fromPrice = TOKEN_PRICES[fromSymbol];
  const toPrice = TOKEN_PRICES[toSymbol];

  if (!fromPrice || !toPrice) {
    return '';
  }

  // Calculate USD value of input amount
  const usdValue = Number(fromAmount) * fromPrice.price;
  
  // Calculate output amount based on target token price
  const outputAmount = usdValue / toPrice.price;

  // Apply a small fee (0.3% like Uniswap)
  const outputWithFee = outputAmount * 0.997;

  return outputWithFee.toFixed(6);
};

// Get price for a specific token
export const getTokenPrice = (symbol: string): number => {
  return TOKEN_PRICES[symbol]?.price || 0;
};

// Get all token prices for display
export const getAllTokenPrices = (): TokenPrice[] => {
  return Object.values(TOKEN_PRICES);
};