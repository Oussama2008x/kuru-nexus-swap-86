import { Token, Ether, NativeCurrency, WETH9 } from '@uniswap/sdk-core'
import invariant from 'tiny-invariant'
import { SupportedChainId } from './chains'
import { UNI_ADDRESS } from './addresses'

export const NATIVE_CHAIN_ID = 'NATIVE'
export const DEFAULT_ERC20_DECIMALS = 18

// Mainnet Tokens
export const USDC_MAINNET = new Token(
  SupportedChainId.MAINNET,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD//C'
)

export const DAI = new Token(
  SupportedChainId.MAINNET,
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  18,
  'DAI',
  'Dai Stablecoin'
)

export const USDT = new Token(
  SupportedChainId.MAINNET,
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  6,
  'USDT',
  'Tether USD'
)

export const WBTC = new Token(
  SupportedChainId.MAINNET,
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  8,
  'WBTC',
  'Wrapped BTC'
)

// Polygon Tokens
export const USDC_POLYGON = new Token(
  SupportedChainId.POLYGON,
  '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
  6,
  'USDC',
  'USD//C'
)

export const DAI_POLYGON = new Token(
  SupportedChainId.POLYGON,
  '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  18,
  'DAI',
  'Dai Stablecoin'
)

export const USDT_POLYGON = new Token(
  SupportedChainId.POLYGON,
  '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
  6,
  'USDT',
  'Tether USD'
)

export const WBTC_POLYGON = new Token(
  SupportedChainId.POLYGON,
  '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
  8,
  'WBTC',
  'Wrapped BTC'
)

export const WETH_POLYGON = new Token(
  SupportedChainId.POLYGON,
  '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
  18,
  'WETH',
  'Wrapped Ether'
)

// Optimism Tokens
export const USDC_OPTIMISM = new Token(
  SupportedChainId.OPTIMISM,
  '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  6,
  'USDC',
  'USD//C'
)

export const DAI_OPTIMISM = new Token(
  SupportedChainId.OPTIMISM,
  '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  18,
  'DAI',
  'Dai stable coin'
)

export const USDT_OPTIMISM = new Token(
  SupportedChainId.OPTIMISM,
  '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
  6,
  'USDT',
  'Tether USD'
)

export const WBTC_OPTIMISM = new Token(
  SupportedChainId.OPTIMISM,
  '0x68f180fcCe6836688e9084f035309E29Bf0A2095',
  8,
  'WBTC',
  'Wrapped BTC'
)

// Arbitrum Tokens
export const USDC_ARBITRUM = new Token(
  SupportedChainId.ARBITRUM_ONE,
  '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
  6,
  'USDC',
  'USD//C'
)

export const DAI_ARBITRUM_ONE = new Token(
  SupportedChainId.ARBITRUM_ONE,
  '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  18,
  'DAI',
  'Dai stable coin'
)

export const USDT_ARBITRUM_ONE = new Token(
  SupportedChainId.ARBITRUM_ONE,
  '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
  6,
  'USDT',
  'Tether USD'
)

export const WBTC_ARBITRUM_ONE = new Token(
  SupportedChainId.ARBITRUM_ONE,
  '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
  8,
  'WBTC',
  'Wrapped BTC'
)

// Base Tokens
export const USDC_BASE = new Token(
  SupportedChainId.BASE,
  '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  6,
  'USDC',
  'USD//C'
)

// BNB Tokens
export const USDC_BNB = new Token(
  SupportedChainId.BNB,
  '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  6,
  'USDC',
  'USD Coin'
)

export const USDT_BNB = new Token(
  SupportedChainId.BNB,
  '0x55d398326f99059fF775485246999027B3197955',
  6,
  'USDT',
  'Tether USD'
)

// Lux Network Tokens
export const LUSD = new Token(
  SupportedChainId.LUX,
  '0x848Cff46eb323f323b6Bbe1Df274E40793d7f2c2',
  18,
  'LUSD',
  'Liquid USD'
)

export const LBTC = new Token(
  SupportedChainId.LUX,
  '0x1E48D32a4F5e9f08DB9aE4959163300FaF8A6C8e',
  18,
  'LBTC',
  'Liquid BTC'
)

export const LETH = new Token(
  SupportedChainId.LUX,
  '0x60E0a8167FC13dE89348978860466C9ceC24B9ba',
  18,
  'LETH',
  'LUX ETH'
)

export const LSOL = new Token(
  SupportedChainId.LUX,
  '0x26B40f650156C7EbF9e087Dd0dca181Fe87625B7',
  18,
  'LSOL',
  'Liquid SOL'
)

export const LZOO = new Token(
  SupportedChainId.LUX,
  '0x5E5290f350352768bD2bfC59c2DA15DD04A7cB88',
  18,
  'LZOO',
  'Liquid ZOO'
)

export const USDC_LUX = new Token(
  SupportedChainId.LUX,
  '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
  6,
  'USDC',
  'USD Coin'
)

export const WETH_LUX = new Token(
  SupportedChainId.LUX,
  '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
  18,
  'WETH.e',
  'Wrapped Ether'
)

// Zoo Network Tokens
export const ZUSD = new Token(
  SupportedChainId.ZOO,
  '0x848Cff46eb323f323b6Bbe1Df274E40793d7f2c2',
  18,
  'ZUSD',
  'Zoo Dollar'
)

export const ZBTC = new Token(
  SupportedChainId.ZOO,
  '0x1E48D32a4F5e9f08DB9aE4959163300FaF8A6C8e',
  18,
  'ZBTC',
  'Zoo BTC'
)

export const ZETH = new Token(
  SupportedChainId.ZOO,
  '0x60E0a8167FC13dE89348978860466C9ceC24B9ba',
  18,
  'ZETH',
  'Zoo ETH'
)

export const ZSOL = new Token(
  SupportedChainId.ZOO,
  '0x26B40f650156C7EbF9e087Dd0dca181Fe87625B7',
  18,
  'ZSOL',
  'Zoo SOL'
)

export const ZLUX = new Token(
  SupportedChainId.ZOO,
  '0x5E5290f350352768bD2bfC59c2DA15DD04A7cB88',
  18,
  'ZLUX',
  'Zoo LUX'
)

// Lux Testnet Tokens
export const USDC_LUX_TESTNET = new Token(
  SupportedChainId.LUX_TESTNET,
  '0x8031e9b0D02a792cfEFaa2bDCA6E1289d385426F',
  18,
  'USDC',
  'USD Coin'
)

export const USDT_LUX_TESTNET = new Token(
  SupportedChainId.LUX_TESTNET,
  '0xdf1De693C31e2A5eb869c329529623556B20AbF3',
  18,
  'USDT',
  'LUX USDT'
)

// Wrapped Native Currency
export const WRAPPED_NATIVE_CURRENCY: { [chainId: number]: Token | undefined } = {
  ...(WETH9 as Record<SupportedChainId, Token>),
  [SupportedChainId.OPTIMISM]: new Token(
    SupportedChainId.OPTIMISM,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [SupportedChainId.BASE]: new Token(
    SupportedChainId.BASE,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [SupportedChainId.BNB]: new Token(
    SupportedChainId.BNB,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB'
  ),
  [SupportedChainId.BLAST]: new Token(
    SupportedChainId.BLAST,
    '0x4300000000000000000000000000000000000004',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [SupportedChainId.ZORA]: new Token(
    SupportedChainId.ZORA,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [SupportedChainId.ARBITRUM_ONE]: new Token(
    SupportedChainId.ARBITRUM_ONE,
    '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [SupportedChainId.POLYGON]: new Token(
    SupportedChainId.POLYGON,
    '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    18,
    'WMATIC',
    'Wrapped MATIC'
  ),
  [SupportedChainId.LUX]: new Token(
    SupportedChainId.LUX,
    '0x4888E4a2Ee0F03051c72D2BD3ACf755eD3498B3E',
    18,
    'WLUX',
    'Wrapped LUX'
  ),
  [SupportedChainId.ZOO]: new Token(
    SupportedChainId.ZOO,
    '0x4888E4a2Ee0F03051c72D2BD3ACf755eD3498B3E',
    18,
    'WZOO',
    'Wrapped ZOO'
  ),
  [SupportedChainId.LUX_TESTNET]: new Token(
    SupportedChainId.LUX_TESTNET,
    '0x4888E4a2Ee0F03051c72D2BD3ACf755eD3498B3E',
    18,
    'WLUX',
    'Wrapped LUX'
  ),
}

// Helper functions
function isMatic(chainId: number): chainId is SupportedChainId.POLYGON | SupportedChainId.POLYGON_MUMBAI {
  return chainId === SupportedChainId.POLYGON_MUMBAI || chainId === SupportedChainId.POLYGON
}

function isBNB(chainId: number): chainId is SupportedChainId.BNB {
  return chainId === SupportedChainId.BNB
}

export function isLUX(chainId: number): chainId is SupportedChainId.LUX {
  return chainId === SupportedChainId.LUX || chainId === SupportedChainId.LUX_TESTNET
}

export function isZOO(chainId: number): chainId is SupportedChainId.ZOO {
  return chainId === SupportedChainId.ZOO
}

// Native currency classes
class MaticNativeCurrency extends NativeCurrency {
  equals(other: any): boolean {
    return other.isNative && other.chainId === this.chainId
  }

  get wrapped(): Token {
    if (!isMatic(this.chainId)) throw new Error('Not matic')
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    invariant(wrapped instanceof Token)
    return wrapped
  }

  public constructor(chainId: number) {
    if (!isMatic(chainId)) throw new Error('Not matic')
    super(chainId, 18, 'MATIC', 'Polygon Matic')
  }
}

class BNBNativeCurrency extends NativeCurrency {
  equals(other: any): boolean {
    return other.isNative && other.chainId === this.chainId
  }

  get wrapped(): Token {
    if (!isBNB(this.chainId)) throw new Error('Not bnb')
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    invariant(wrapped instanceof Token)
    return wrapped
  }

  public constructor(chainId: number) {
    if (!isBNB(chainId)) throw new Error('Not bnb')
    super(chainId, 18, 'BNB', 'BNB')
  }
}

class LUXNativeCurrency extends NativeCurrency {
  equals(other: any): boolean {
    return other.isNative && other.chainId === this.chainId
  }

  get wrapped(): Token {
    if (!isLUX(this.chainId)) throw new Error('Not lux')
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    invariant(wrapped instanceof Token)
    return wrapped
  }

  public constructor(chainId: number) {
    if (!isLUX(chainId)) throw new Error('Not lux')
    super(chainId, 18, 'LUX', 'LUX')
  }
}

class ZOONativeCurrency extends NativeCurrency {
  equals(other: any): boolean {
    return other.isNative && other.chainId === this.chainId
  }

  get wrapped(): Token {
    if (!isZOO(this.chainId)) throw new Error('Not zoo')
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    invariant(wrapped instanceof Token)
    return wrapped
  }

  public constructor(chainId: number) {
    if (!isZOO(chainId)) throw new Error('Not zoo')
    super(chainId, 18, 'ZOO', 'ZOO')
  }
}

class ExtendedEther extends Ether {
  public get wrapped(): Token {
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    if (wrapped) return wrapped
    throw new Error('Unsupported chain ID')
  }

  private static _cachedExtendedEther: { [chainId: number]: NativeCurrency } = {}

  public static onChain(chainId: number): ExtendedEther {
    return this._cachedExtendedEther[chainId] ?? (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId))
  }
}

const cachedNativeCurrency: { [chainId: number]: NativeCurrency | Token } = {}

export function nativeOnChain(chainId: number): NativeCurrency | Token {
  if (cachedNativeCurrency[chainId]) return cachedNativeCurrency[chainId]
  let nativeCurrency: NativeCurrency | Token

  if (isMatic(chainId)) {
    nativeCurrency = new MaticNativeCurrency(chainId)
  } else if (isBNB(chainId)) {
    nativeCurrency = new BNBNativeCurrency(chainId)
  } else if (isLUX(chainId)) {
    nativeCurrency = new LUXNativeCurrency(chainId)
  } else if (isZOO(chainId)) {
    nativeCurrency = new ZOONativeCurrency(chainId)
  } else {
    nativeCurrency = ExtendedEther.onChain(chainId)
  }

  return (cachedNativeCurrency[chainId] = nativeCurrency)
}

// UNI Token
export const UNI: { [chainId: number]: Token } = {
  [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, UNI_ADDRESS[1], 18, 'UNI', 'Uniswap'),
}
