
import React from 'react';
import { Wallet, Menu, Zap, ExternalLink, AlertTriangle } from 'lucide-react';
import { TradingButton } from "@/components/ui/trading-button";
import { Badge } from "@/components/ui/badge";
import { useWeb3 } from '@/hooks/useWeb3';

export const Header: React.FC = () => {
  const { 
    account, 
    isConnected, 
    isConnecting, 
    chainId, 
    isMonadTestnet,
    isWrongNetwork,
    connectWallet, 
    disconnectWallet,
    switchToMonad,
    networkConfig
  } = useWeb3();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getNetworkName = () => {
    if (isMonadTestnet) return 'Monad Testnet';
    if (chainId === 1) return 'Ethereum';
    return 'Unknown Network';
  };

  const getNetworkStatus = () => {
    if (isMonadTestnet) return { color: 'bg-success', text: 'Monad Testnet' };
    if (isWrongNetwork) return { color: 'bg-warning', text: 'Wrong Network' };
    return { color: 'bg-muted', text: 'Not Connected' };
  };

  const networkStatus = getNetworkStatus();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Nexus Swap
            </span>
          </div>
          <Badge variant="secondary" className="text-xs">
            Monad
          </Badge>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
            Trade
          </a>
          <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
            Orderbook
          </a>
          <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
            Analytics
          </a>
          <a 
            href="https://github.com/Kuru-Labs/kuru-sdk" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-foreground transition-colors flex items-center gap-1"
          >
            Docs
            <ExternalLink className="w-3 h-3" />
          </a>
        </nav>

        {/* Wallet Connection */}
        <div className="flex items-center gap-3">
          {/* Network Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50">
            <div className={`w-2 h-2 rounded-full animate-pulse ${networkStatus.color}`} />
            <span className="text-xs font-medium">
              {networkStatus.text}
            </span>
            {isWrongNetwork && (
              <TradingButton
                variant="ghost"
                size="sm"
                onClick={switchToMonad}
                className="h-6 px-2 text-xs border-warning text-warning hover:bg-warning/10"
              >
                <AlertTriangle className="w-3 h-3 mr-1" />
                Switch
              </TradingButton>
            )}
          </div>

          {/* Wallet Button */}
          {isConnected ? (
            <div className="flex items-center gap-2">
              <TradingButton
                variant="secondary"
                onClick={disconnectWallet}
                className="gap-2"
              >
                <div className={`w-2 h-2 rounded-full ${
                  isMonadTestnet ? 'bg-success' : 'bg-warning'
                }`} />
                {formatAddress(account!)}
              </TradingButton>
              <TradingButton
                variant="ghost"
                size="icon"
                onClick={() => window.open(`${networkConfig.explorerUrl}/address/${account}`, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
              </TradingButton>
            </div>
          ) : (
            <TradingButton
              variant="trading"
              onClick={connectWallet}
              disabled={isConnecting}
              className="gap-2"
            >
              <Wallet className="w-4 h-4" />
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </TradingButton>
          )}

          {/* Mobile Menu */}
          <TradingButton variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-4 h-4" />
          </TradingButton>
        </div>
      </div>
    </header>
  );
};
