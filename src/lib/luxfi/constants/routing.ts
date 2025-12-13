import { Currency, Token } from '@uniswap/sdk-core'
import { SupportedChainId } from './chains'
import {
  DAI,
  DAI_ARBITRUM_ONE,
  DAI_OPTIMISM,
  DAI_POLYGON,
  USDC_MAINNET,
  USDC_OPTIMISM,
  USDC_POLYGON,
  USDC_ARBITRUM,
  USDC_BASE,
  USDC_BNB,
  USDC_LUX,
  USDT,
  USDT_ARBITRUM_ONE,
  USDT_OPTIMISM,
  USDT_POLYGON,
  USDT_BNB,
  WBTC,
  WBTC_ARBITRUM_ONE,
  WBTC_OPTIMISM,
  WBTC_POLYGON,
  WETH_POLYGON,
  WETH_LUX,
  WRAPPED_NATIVE_CURRENCY,
  nativeOnChain,
  LBTC,
  LETH,
  LSOL,
  LUSD,
  LZOO,
  ZBTC,
  ZETH,
  ZSOL,
  ZUSD,
  ZLUX,
  USDT_LUX_TESTNET,
  USDC_LUX_TESTNET,
} from './tokens'

type ChainTokenList = {
  readonly [chainId: number]: Token[]
}

type ChainCurrencyList = {
  readonly [chainId: number]: Currency[]
}

const WRAPPED_NATIVE_CURRENCIES_ONLY: ChainTokenList = Object.fromEntries(
  Object.entries(WRAPPED_NATIVE_CURRENCY)
    .map(([key, value]) => [key, value ? [value] : []])
    .filter(([, value]) => (value as Token[]).length > 0)
)

// Used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WRAPPED_NATIVE_CURRENCIES_ONLY,
  [SupportedChainId.MAINNET]: [
    ...(WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.MAINNET] || []),
    DAI,
    USDC_MAINNET,
    USDT,
    WBTC,
  ],
  [SupportedChainId.OPTIMISM]: [
    ...(WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.OPTIMISM] || []),
    DAI_OPTIMISM,
    USDT_OPTIMISM,
    WBTC_OPTIMISM,
  ],
  [SupportedChainId.ARBITRUM_ONE]: [
    ...(WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.ARBITRUM_ONE] || []),
    DAI_ARBITRUM_ONE,
    USDT_ARBITRUM_ONE,
    WBTC_ARBITRUM_ONE,
  ],
  [SupportedChainId.BASE]: [
    ...(WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.BASE] || []),
    USDC_BASE,
  ],
  [SupportedChainId.POLYGON]: [
    ...(WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.POLYGON] || []),
    DAI_POLYGON,
    USDC_POLYGON,
    USDT_POLYGON,
    WETH_POLYGON,
  ],
}

// Shows up in the currency select for swap and add liquidity
export const COMMON_BASES: ChainCurrencyList = {
  [SupportedChainId.MAINNET]: [
    nativeOnChain(SupportedChainId.MAINNET),
    DAI,
    USDC_MAINNET,
    USDT,
    WBTC,
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.MAINNET] as Token,
  ],
  [SupportedChainId.ARBITRUM_ONE]: [
    nativeOnChain(SupportedChainId.ARBITRUM_ONE),
    DAI_ARBITRUM_ONE,
    USDC_ARBITRUM,
    USDT_ARBITRUM_ONE,
    WBTC_ARBITRUM_ONE,
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.ARBITRUM_ONE] as Token,
  ],
  [SupportedChainId.BASE]: [
    nativeOnChain(SupportedChainId.BASE),
    USDC_BASE,
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.BASE] as Token,
  ],
  [SupportedChainId.BNB]: [
    nativeOnChain(SupportedChainId.BNB),
    USDC_BNB,
    USDT_BNB,
  ],
  [SupportedChainId.LUX]: [
    nativeOnChain(SupportedChainId.LUX),
    USDC_LUX,
    WETH_LUX,
    LBTC,
    LETH,
    LSOL,
    LUSD,
    LZOO,
  ],
  [SupportedChainId.OPTIMISM]: [
    nativeOnChain(SupportedChainId.OPTIMISM),
    DAI_OPTIMISM,
    USDC_OPTIMISM,
    USDT_OPTIMISM,
    WBTC_OPTIMISM,
  ],
  [SupportedChainId.POLYGON]: [
    nativeOnChain(SupportedChainId.POLYGON),
    WETH_POLYGON,
    USDC_POLYGON,
    DAI_POLYGON,
    USDT_POLYGON,
    WBTC_POLYGON,
  ],
  [SupportedChainId.ZOO]: [
    nativeOnChain(SupportedChainId.ZOO),
    ZBTC,
    ZETH,
    ZSOL,
    ZUSD,
    ZLUX,
  ],
  [SupportedChainId.LUX_TESTNET]: [
    nativeOnChain(SupportedChainId.LUX_TESTNET),
    USDT_LUX_TESTNET,
    USDC_LUX_TESTNET,
  ],
}

// Used to construct the list of all pairs we consider by default
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WRAPPED_NATIVE_CURRENCIES_ONLY,
  [SupportedChainId.MAINNET]: [
    ...(WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.MAINNET] || []),
    DAI,
    USDC_MAINNET,
    USDT,
    WBTC,
  ],
}

// Pinned pairs for display
export const PINNED_PAIRS: { readonly [chainId: number]: [Token, Token][] } = {
  [SupportedChainId.MAINNET]: [
    [USDC_MAINNET, USDT],
    [DAI, USDT],
  ],
}
