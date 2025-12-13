import { SupportedChainId } from './chains'

interface ChainInfo {
  chainId: string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls: string[]
}

// Fallback RPC URLs for each chain
export const FALLBACK_URLS: { [chainId: number]: string[] } = {
  [SupportedChainId.MAINNET]: [
    'https://eth.llamarpc.com',
    'https://ethereum.publicnode.com',
    'https://rpc.ankr.com/eth',
  ],
  [SupportedChainId.ROPSTEN]: ['https://ropsten.infura.io/v3/'],
  [SupportedChainId.RINKEBY]: ['https://rinkeby.infura.io/v3/'],
  [SupportedChainId.GOERLI]: ['https://goerli.infura.io/v3/'],
  [SupportedChainId.KOVAN]: ['https://kovan.infura.io/v3/'],
  [SupportedChainId.OPTIMISM]: [
    'https://mainnet.optimism.io',
    'https://optimism.publicnode.com',
    'https://rpc.ankr.com/optimism',
  ],
  [SupportedChainId.OPTIMISM_GOERLI]: ['https://goerli.optimism.io'],
  [SupportedChainId.ARBITRUM_ONE]: [
    'https://arb1.arbitrum.io/rpc',
    'https://arbitrum-one.publicnode.com',
    'https://rpc.ankr.com/arbitrum',
  ],
  [SupportedChainId.ARBITRUM_RINKEBY]: ['https://rinkeby.arbitrum.io/rpc'],
  [SupportedChainId.ARBITRUM_GOERLI]: ['https://goerli-rollup.arbitrum.io/rpc'],
  [SupportedChainId.POLYGON]: [
    'https://polygon-rpc.com',
    'https://polygon-bor.publicnode.com',
    'https://rpc.ankr.com/polygon',
  ],
  [SupportedChainId.POLYGON_MUMBAI]: ['https://rpc-mumbai.maticvigil.com'],
  [SupportedChainId.CELO]: ['https://forno.celo.org'],
  [SupportedChainId.CELO_ALFAJORES]: ['https://alfajores-forno.celo-testnet.org'],
  [SupportedChainId.BNB]: [
    'https://bsc-dataseed.binance.org',
    'https://bsc.publicnode.com',
    'https://rpc.ankr.com/bsc',
  ],
  [SupportedChainId.BASE]: [
    'https://mainnet.base.org',
    'https://base.publicnode.com',
    'https://base.llamarpc.com',
  ],
  [SupportedChainId.BLAST]: [
    'https://rpc.blast.io',
    'https://blast.din.dev/rpc',
  ],
  [SupportedChainId.ZORA]: [
    'https://rpc.zora.energy',
  ],
  [SupportedChainId.LUX]: [
    'https://api.lux.network',
    'https://api.lux-test.network',
  ],
  [SupportedChainId.ZOO]: [
    'https://api.zoo.network',
  ],
  [SupportedChainId.LUX_TESTNET]: [
    'https://api.lux-test.network',
  ],
}

// Primary RPC URLs (uses first fallback)
export const RPC_URLS: { [chainId: number]: string } = Object.fromEntries(
  Object.entries(FALLBACK_URLS).map(([chainId, urls]) => [chainId, urls[0]])
)

// Get primary RPC URL for a chain
export function getPrimaryRpcUrl(chainId: SupportedChainId): string {
  return RPC_URLS[chainId] || ''
}

// Chain info for adding networks to wallets
export const CHAIN_INFO: { [chainId: number]: ChainInfo } = {
  [SupportedChainId.MAINNET]: {
    chainId: '0x1',
    chainName: 'Ethereum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: FALLBACK_URLS[SupportedChainId.MAINNET],
    blockExplorerUrls: ['https://etherscan.io'],
  },
  [SupportedChainId.OPTIMISM]: {
    chainId: '0xa',
    chainName: 'Optimism',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: FALLBACK_URLS[SupportedChainId.OPTIMISM],
    blockExplorerUrls: ['https://optimistic.etherscan.io'],
  },
  [SupportedChainId.ARBITRUM_ONE]: {
    chainId: '0xa4b1',
    chainName: 'Arbitrum One',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: FALLBACK_URLS[SupportedChainId.ARBITRUM_ONE],
    blockExplorerUrls: ['https://arbiscan.io'],
  },
  [SupportedChainId.POLYGON]: {
    chainId: '0x89',
    chainName: 'Polygon',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: FALLBACK_URLS[SupportedChainId.POLYGON],
    blockExplorerUrls: ['https://polygonscan.com'],
  },
  [SupportedChainId.CELO]: {
    chainId: '0xa4ec',
    chainName: 'Celo',
    nativeCurrency: { name: 'Celo', symbol: 'CELO', decimals: 18 },
    rpcUrls: FALLBACK_URLS[SupportedChainId.CELO],
    blockExplorerUrls: ['https://celoscan.io'],
  },
  [SupportedChainId.BNB]: {
    chainId: '0x38',
    chainName: 'BNB Chain',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    rpcUrls: FALLBACK_URLS[SupportedChainId.BNB],
    blockExplorerUrls: ['https://bscscan.com'],
  },
  [SupportedChainId.BASE]: {
    chainId: '0x2105',
    chainName: 'Base',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: FALLBACK_URLS[SupportedChainId.BASE],
    blockExplorerUrls: ['https://basescan.org'],
  },
  [SupportedChainId.BLAST]: {
    chainId: '0x13e31',
    chainName: 'Blast',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: FALLBACK_URLS[SupportedChainId.BLAST],
    blockExplorerUrls: ['https://blastscan.io'],
  },
  [SupportedChainId.ZORA]: {
    chainId: '0x76adf1',
    chainName: 'Zora',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: FALLBACK_URLS[SupportedChainId.ZORA],
    blockExplorerUrls: ['https://explorer.zora.energy'],
  },
  [SupportedChainId.LUX]: {
    chainId: '0x1e61',
    chainName: 'Lux',
    nativeCurrency: { name: 'LUX', symbol: 'LUX', decimals: 18 },
    rpcUrls: FALLBACK_URLS[SupportedChainId.LUX],
    blockExplorerUrls: ['https://explore.lux.network'],
  },
  [SupportedChainId.ZOO]: {
    chainId: '0x30dc8',
    chainName: 'Zoo',
    nativeCurrency: { name: 'ZOO', symbol: 'ZOO', decimals: 18 },
    rpcUrls: FALLBACK_URLS[SupportedChainId.ZOO],
    blockExplorerUrls: ['https://explore.zoo.network'],
  },
  [SupportedChainId.LUX_TESTNET]: {
    chainId: '0x22b8',
    chainName: 'Lux Testnet',
    nativeCurrency: { name: 'LUX', symbol: 'LUX', decimals: 18 },
    rpcUrls: FALLBACK_URLS[SupportedChainId.LUX_TESTNET],
    blockExplorerUrls: ['https://explore.lux-test.network'],
  },
}
