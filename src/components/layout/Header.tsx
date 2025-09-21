
import React from 'react';
import { Wallet, Menu, Zap, ExternalLink, AlertTriangle } from 'lucide-react';
import { TradingButton } from "@/components/ui/trading-button";
import { Badge } from "@/components/ui/badge";
import { LanguageSelector } from './LanguageSelector';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';
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
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Kerdium
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="/" className="text-foreground/60 hover:text-foreground transition-colors">
            Home
          </a>
          <a href="/swap" className="text-foreground/60 hover:text-foreground transition-colors">
            Swap
          </a>
          <a href="/pool" className="text-foreground/60 hover:text-foreground transition-colors">
            Pool
          </a>
          <a href="/stake" className="text-foreground/60 hover:text-foreground transition-colors">
            Stake
          </a>
          <a href="/tasks" className="text-foreground/60 hover:text-foreground transition-colors">
            Tasks
          </a>
          <div className="relative group">
            <span className="text-foreground/60 hover:text-foreground transition-colors cursor-pointer">
              Crypto
            </span>
            <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <a href="/usdc" className="block px-4 py-3 text-sm text-foreground/60 hover:text-foreground hover:bg-muted transition-colors">
                USDC
              </a>
              <a href="/weth" className="block px-4 py-3 text-sm text-foreground/60 hover:text-foreground hover:bg-muted transition-colors">
                WETH
              </a>
              <a href="/wbtc" className="block px-4 py-3 text-sm text-foreground/60 hover:text-foreground hover:bg-muted transition-colors">
                WBTC
              </a>
            </div>
          </div>
          <a href="/faq" className="text-foreground/60 hover:text-foreground transition-colors">
            FAQ
          </a>
          <a href="/about" className="text-foreground/60 hover:text-foreground transition-colors">
            About
          </a>
        </nav>

        {/* Wallet Connection */}
        <div className="flex items-center gap-2">
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

          {/* Theme Toggle - Desktop Only */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          

          {/* Wallet Button - Desktop Only */}
          <div className="hidden md:block">
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
          </div>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};
