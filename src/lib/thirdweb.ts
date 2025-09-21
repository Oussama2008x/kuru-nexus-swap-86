import { createThirdwebClient } from "thirdweb";
import { createWallet } from "thirdweb/wallets";

export const client = createThirdwebClient({
  clientId: "19c0ffb997d9e0d9ea54ddc15ebaff6f",
});

export const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("com.trustwallet.app"),
  createWallet("com.okex.wallet"),
  createWallet("com.binance.wallet"),
];