/**
 * Network RPC URLs for all supported chains
 * Extracted from: https://github.com/luxfi/exchange
 */
import { SupportedChainId } from './chains'

/**
 * Fallback JSON-RPC endpoints.
 * These are used if the integrator does not provide an endpoint, or if the endpoint does not work.
 */
export const FALLBACK_URLS: { [key in SupportedChainId]: string[] } = {
  [SupportedChainId.MAINNET]: [
    'https://api.mycryptoapi.com/eth',
    'https://cloudflare-eth.com',
    'https://rpc.ankr.com/eth',
    'https://eth-mainnet.public.blastapi.io',
  ],
  [SupportedChainId.ROPSTEN]: [
    'https://rpc.ankr.com/eth_ropsten',
  ],
  [SupportedChainId.RINKEBY]: [
    'https://rinkeby-light.eth.linkpool.io/',
  ],
  [SupportedChainId.GOERLI]: [
    'https://rpc.goerli.mudit.blog/',
    'https://rpc.ankr.com/eth_goerli',
  ],
  [SupportedChainId.KOVAN]: [
    'https://kovan.poa.network',
    'https://eth-kovan.public.blastapi.io',
  ],
  [SupportedChainId.POLYGON]: [
    'https://polygon-rpc.com/',
    'https://rpc-mainnet.matic.network',
    'https://matic-mainnet.chainstacklabs.com',
    'https://rpc-mainnet.maticvigil.com',
    'https://rpc-mainnet.matic.quiknode.pro',
    'https://matic-mainnet-full-rpc.bwarelabs.com',
  ],
  [SupportedChainId.POLYGON_MUMBAI]: [
    'https://matic-mumbai.chainstacklabs.com',
    'https://rpc-mumbai.maticvigil.com',
    'https://matic-testnet-archive-rpc.bwarelabs.com',
  ],
  [SupportedChainId.ARBITRUM_ONE]: [
    'https://arb1.arbitrum.io/rpc',
    'https://arbitrum.public-rpc.com',
  ],
  [SupportedChainId.ARBITRUM_RINKEBY]: [
    'https://rinkeby.arbitrum.io/rpc',
  ],
  [SupportedChainId.OPTIMISM]: [
    'https://mainnet.optimism.io/',
    'https://rpc.ankr.com/optimism',
  ],
  [SupportedChainId.OPTIMISM_GOERLI]: [
    'https://goerli.optimism.io',
  ],
  [SupportedChainId.BASE]: [
    'https://mainnet.base.org',
  ],
  [SupportedChainId.BNB]: [
    'https://bsc-dataseed.binance.org',
  ],
  [SupportedChainId.AVALANCHE]: [
    'https://api.avax.network/ext/bc/C/rpc',
  ],
  [SupportedChainId.BLAST]: [
    'https://rpc.blast.io',
  ],
  [SupportedChainId.ZORA]: [
    'https://rpc.zora.energy',
  ],
  [SupportedChainId.CELO]: [
    'https://forno.celo.org',
  ],
  [SupportedChainId.CELO_ALFAJORES]: [
    'https://alfajores-forno.celo-testnet.org',
  ],
  [SupportedChainId.LUX]: [
    'https://api.lux.network/',
  ],
  [SupportedChainId.LUX_TESTNET]: [
    'https://api.lux-test.network/',
  ],
  [SupportedChainId.ZOO]: [
    'https://api.zoo.network/',
  ],
}

/**
 * Known JSON-RPC endpoints.
 * These are the URLs used by the interface when there is not another available source of chain data.
 */
export const RPC_URLS: { [key in SupportedChainId]: string[] } = {
  [SupportedChainId.MAINNET]: [...FALLBACK_URLS[SupportedChainId.MAINNET]],
  [SupportedChainId.RINKEBY]: [...FALLBACK_URLS[SupportedChainId.RINKEBY]],
  [SupportedChainId.ROPSTEN]: [...FALLBACK_URLS[SupportedChainId.ROPSTEN]],
  [SupportedChainId.GOERLI]: [...FALLBACK_URLS[SupportedChainId.GOERLI]],
  [SupportedChainId.KOVAN]: [...FALLBACK_URLS[SupportedChainId.KOVAN]],
  [SupportedChainId.OPTIMISM]: [...FALLBACK_URLS[SupportedChainId.OPTIMISM]],
  [SupportedChainId.OPTIMISM_GOERLI]: [...FALLBACK_URLS[SupportedChainId.OPTIMISM_GOERLI]],
  [SupportedChainId.ARBITRUM_ONE]: [...FALLBACK_URLS[SupportedChainId.ARBITRUM_ONE]],
  [SupportedChainId.ARBITRUM_RINKEBY]: [...FALLBACK_URLS[SupportedChainId.ARBITRUM_RINKEBY]],
  [SupportedChainId.POLYGON]: [...FALLBACK_URLS[SupportedChainId.POLYGON]],
  [SupportedChainId.POLYGON_MUMBAI]: [...FALLBACK_URLS[SupportedChainId.POLYGON_MUMBAI]],
  [SupportedChainId.LUX]: [...FALLBACK_URLS[SupportedChainId.LUX]],
  [SupportedChainId.ZOO]: [...FALLBACK_URLS[SupportedChainId.ZOO]],
  [SupportedChainId.LUX_TESTNET]: [...FALLBACK_URLS[SupportedChainId.LUX_TESTNET]],
  [SupportedChainId.CELO]: FALLBACK_URLS[SupportedChainId.CELO],
  [SupportedChainId.BASE]: FALLBACK_URLS[SupportedChainId.BASE],
  [SupportedChainId.BNB]: FALLBACK_URLS[SupportedChainId.BNB],
  [SupportedChainId.AVALANCHE]: FALLBACK_URLS[SupportedChainId.AVALANCHE],
  [SupportedChainId.BLAST]: FALLBACK_URLS[SupportedChainId.BLAST],
  [SupportedChainId.ZORA]: FALLBACK_URLS[SupportedChainId.ZORA],
  [SupportedChainId.CELO_ALFAJORES]: FALLBACK_URLS[SupportedChainId.CELO_ALFAJORES],
}

/**
 * Get the primary RPC URL for a chain
 */
export function getPrimaryRpcUrl(chainId: SupportedChainId): string {
  return RPC_URLS[chainId]?.[0] || ''
}

/**
 * Chain info for wallet configuration
 */
export interface ChainInfo {
  chainId: number
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls: string[]
}

export const CHAIN_INFO: Partial<Record<SupportedChainId, ChainInfo>> = {
  [SupportedChainId.MAINNET]: {
    chainId: 1,
    chainName: 'Ethereum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: RPC_URLS[SupportedChainId.MAINNET],
    blockExplorerUrls: ['https://etherscan.io'],
  },
  [SupportedChainId.POLYGON]: {
    chainId: 137,
    chainName: 'Polygon',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: RPC_URLS[SupportedChainId.POLYGON],
    blockExplorerUrls: ['https://polygonscan.com'],
  },
  [SupportedChainId.ARBITRUM_ONE]: {
    chainId: 42161,
    chainName: 'Arbitrum One',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: RPC_URLS[SupportedChainId.ARBITRUM_ONE],
    blockExplorerUrls: ['https://arbiscan.io'],
  },
  [SupportedChainId.OPTIMISM]: {
    chainId: 10,
    chainName: 'Optimism',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: RPC_URLS[SupportedChainId.OPTIMISM],
    blockExplorerUrls: ['https://optimistic.etherscan.io'],
  },
  [SupportedChainId.BASE]: {
    chainId: 8453,
    chainName: 'Base',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: RPC_URLS[SupportedChainId.BASE],
    blockExplorerUrls: ['https://basescan.org'],
  },
  [SupportedChainId.BNB]: {
    chainId: 56,
    chainName: 'BNB Chain',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    rpcUrls: RPC_URLS[SupportedChainId.BNB],
    blockExplorerUrls: ['https://bscscan.com'],
  },
  [SupportedChainId.AVALANCHE]: {
    chainId: 43114,
    chainName: 'Avalanche C-Chain',
    nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
    rpcUrls: RPC_URLS[SupportedChainId.AVALANCHE],
    blockExplorerUrls: ['https://snowtrace.io'],
  },
  [SupportedChainId.ZORA]: {
    chainId: 7777777,
    chainName: 'Zora',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: RPC_URLS[SupportedChainId.ZORA],
    blockExplorerUrls: ['https://explorer.zora.energy'],
  },
  [SupportedChainId.BLAST]: {
    chainId: 81457,
    chainName: 'Blast',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: RPC_URLS[SupportedChainId.BLAST],
    blockExplorerUrls: ['https://blastscan.io'],
  },
  [SupportedChainId.CELO]: {
    chainId: 42220,
    chainName: 'Celo',
    nativeCurrency: { name: 'CELO', symbol: 'CELO', decimals: 18 },
    rpcUrls: RPC_URLS[SupportedChainId.CELO],
    blockExplorerUrls: ['https://celoscan.io'],
  },
  [SupportedChainId.LUX]: {
    chainId: 96369,
    chainName: 'Lux',
    nativeCurrency: { name: 'LUX', symbol: 'LUX', decimals: 18 },
    rpcUrls: RPC_URLS[SupportedChainId.LUX],
    blockExplorerUrls: ['https://explore.lux.network'],
  },
  [SupportedChainId.ZOO]: {
    chainId: 200200,
    chainName: 'Zoo',
    nativeCurrency: { name: 'ZOO', symbol: 'ZOO', decimals: 18 },
    rpcUrls: RPC_URLS[SupportedChainId.ZOO],
    blockExplorerUrls: ['https://explore.zoo.network'],
  },
}
