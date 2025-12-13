/**
 * Supported Chain IDs from luxfi/exchange
 */
export enum SupportedChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,

  ARBITRUM_ONE = 42161,
  ARBITRUM_RINKEBY = 421611,
  ARBITRUM_GOERLI = 421613,

  OPTIMISM = 10,
  OPTIMISM_GOERLI = 420,

  POLYGON = 137,
  POLYGON_MUMBAI = 80001,

  CELO = 42220,
  CELO_ALFAJORES = 44787,

  BNB = 56,
  BASE = 8453,
  BLAST = 81457,
  ZORA = 7777777,

  LUX = 7777,
  ZOO = 200200,
  LUX_TESTNET = 8888,
}

export const CHAIN_IDS_TO_NAMES: Record<SupportedChainId, string> = {
  [SupportedChainId.MAINNET]: 'mainnet',
  [SupportedChainId.ROPSTEN]: 'ropsten',
  [SupportedChainId.RINKEBY]: 'rinkeby',
  [SupportedChainId.GOERLI]: 'goerli',
  [SupportedChainId.KOVAN]: 'kovan',
  [SupportedChainId.POLYGON]: 'polygon',
  [SupportedChainId.POLYGON_MUMBAI]: 'polygon_mumbai',
  [SupportedChainId.CELO]: 'celo',
  [SupportedChainId.CELO_ALFAJORES]: 'celo_alfajores',
  [SupportedChainId.ARBITRUM_ONE]: 'arbitrum',
  [SupportedChainId.ARBITRUM_RINKEBY]: 'arbitrum_rinkeby',
  [SupportedChainId.ARBITRUM_GOERLI]: 'arbitrum_goerli',
  [SupportedChainId.OPTIMISM]: 'optimism',
  [SupportedChainId.OPTIMISM_GOERLI]: 'optimism_goerli',
  [SupportedChainId.BNB]: 'bnb',
  [SupportedChainId.BASE]: 'base',
  [SupportedChainId.BLAST]: 'blast',
  [SupportedChainId.ZORA]: 'zora',
  [SupportedChainId.LUX]: 'lux',
  [SupportedChainId.ZOO]: 'zoo',
  [SupportedChainId.LUX_TESTNET]: 'lux_testnet',
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId).filter(
  (id): id is SupportedChainId => typeof id === 'number'
)

export const L1_CHAIN_IDS = [
  SupportedChainId.MAINNET,
  SupportedChainId.ROPSTEN,
  SupportedChainId.RINKEBY,
  SupportedChainId.GOERLI,
  SupportedChainId.KOVAN,
  SupportedChainId.POLYGON,
  SupportedChainId.POLYGON_MUMBAI,
  SupportedChainId.CELO,
  SupportedChainId.CELO_ALFAJORES,
  SupportedChainId.BNB,
  SupportedChainId.LUX,
  SupportedChainId.ZOO,
  SupportedChainId.LUX_TESTNET,
] as const

export const L2_CHAIN_IDS = [
  SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.ARBITRUM_RINKEBY,
  SupportedChainId.ARBITRUM_GOERLI,
  SupportedChainId.OPTIMISM,
  SupportedChainId.OPTIMISM_GOERLI,
  SupportedChainId.BASE,
  SupportedChainId.BLAST,
  SupportedChainId.ZORA,
] as const

export function isSupportedChain(chainId: number | null | undefined): chainId is SupportedChainId {
  return !!chainId && ALL_SUPPORTED_CHAIN_IDS.includes(chainId as SupportedChainId)
}
