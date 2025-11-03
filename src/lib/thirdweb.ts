import { createThirdwebClient } from "thirdweb";
import { createWallet } from "thirdweb/wallets";
import { defineChain } from "thirdweb";
import { ethereum } from "thirdweb/chains";

export const client = createThirdwebClient({
  clientId: "19c0ffb997d9e0d9ea54ddc15ebaff6f",
});

// Define Monad Testnet
export const monadTestnet = defineChain({
  id: 41454,
  name: "Monad Testnet",
  nativeCurrency: {
    name: "MON",
    symbol: "MON",
    decimals: 18,
  },
  rpc: "https://testnet-rpc.monad.xyz",
  blockExplorers: [
    {
      name: "Monad Explorer",
      url: "https://testnet-explorer.monad.xyz",
    },
  ],
});

// Export Ethereum Mainnet
export const ethereumMainnet = ethereum;

// Supported networks
export const SUPPORTED_NETWORKS = {
  MONAD: monadTestnet,
  ETHEREUM: ethereumMainnet,
} as const;

export type NetworkType = keyof typeof SUPPORTED_NETWORKS;

export const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("com.trustwallet.app"),
  createWallet("com.okex.wallet"),
  createWallet("com.binance.wallet"),
];