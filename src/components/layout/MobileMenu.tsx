import React, { useState } from 'react';
import { Menu, X, Wallet, ExternalLink, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TradingButton } from "@/components/ui/trading-button";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';
import { useWeb3 } from '@/hooks/useWeb3';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  
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

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Swap', href: '/swap' },
    { name: 'Pool', href: '/pool' },
    { name: 'Stake', href: '/stake' },
    { name: 'Tasks', href: '/tasks' },
    { name: 'USDC', href: '/usdc' },
    { name: 'WETH', href: '/weth' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'About Kerdium', href: '/about' },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
        <div className="flex flex-col space-y-6 mt-8">
          {/* Navigation */}
          <div>
            <div className="text-lg font-semibold mb-4">Navigation</div>
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-left py-3 px-4 rounded-lg hover:bg-muted transition-colors text-foreground hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Wallet Connection - Mobile Only */}
          <div>
            <div className="text-lg font-semibold mb-4">Wallet</div>
            {isConnected ? (
              <div className="flex flex-col space-y-3">
                <TradingButton
                  variant="secondary"
                  onClick={disconnectWallet}
                  className="gap-2 w-full justify-start"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    isMonadTestnet ? 'bg-success' : 'bg-warning'
                  }`} />
                  {formatAddress(account!)}
                </TradingButton>
                <TradingButton
                  variant="outline"
                  onClick={() => {
                    window.open(`${networkConfig.explorerUrl}/address/${account}`, '_blank');
                    setIsOpen(false);
                  }}
                  className="gap-2 w-full justify-start"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on Explorer
                </TradingButton>
                {isWrongNetwork && (
                  <TradingButton
                    variant="outline"
                    onClick={() => {
                      switchToMonad();
                      setIsOpen(false);
                    }}
                    className="gap-2 w-full justify-start border-warning text-warning hover:bg-warning/10"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Switch to Monad
                  </TradingButton>
                )}
              </div>
            ) : (
              <TradingButton
                variant="trading"
                onClick={() => {
                  connectWallet();
                  setIsOpen(false);
                }}
                disabled={isConnecting}
                className="gap-2 w-full justify-start"
              >
                <Wallet className="w-4 h-4" />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </TradingButton>
            )}
          </div>

          {/* Settings - Mobile Only */}
          <div>
            <div className="text-lg font-semibold mb-4">Settings</div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">Language</span>
                <LanguageSelector />
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { MobileMenu };