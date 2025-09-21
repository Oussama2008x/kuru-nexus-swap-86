import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConnectButton } from "thirdweb/react";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';
import { client, wallets } from '@/lib/thirdweb';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Swap', href: '/swap' },
    { name: 'Pool', href: '/pool' },
    { name: 'Stake', href: '/stake' },
    { name: 'Tasks', href: '/tasks' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'About Kerdium', href: '/about' },
  ];

  const cryptoItems = [
    { name: 'USDC', href: '/usdc' },
    { name: 'WETH', href: '/weth' },
    { name: 'WBTC', href: '/wbtc' },
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
              
              {/* Crypto Section */}
              <div className="mt-4">
                <div className="text-sm font-medium text-muted-foreground mb-2 px-4">Crypto</div>
                {cryptoItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-left py-2 px-6 rounded-lg hover:bg-muted transition-colors text-foreground hover:text-primary text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Wallet Connection - Mobile Only */}
          <div>
            <div className="text-lg font-semibold mb-4">Wallet</div>
            <ConnectButton
              client={client}
              connectButton={{ label: "Connect Wallet" }}
              connectModal={{
                privacyPolicyUrl: "https://kerdium.vercel.app/about",
                size: "compact",
                termsOfServiceUrl: "https://kerdium.vercel.app/faq",
                title: "KERDIUM FINANCE",
              }}
              wallets={wallets}
            />
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