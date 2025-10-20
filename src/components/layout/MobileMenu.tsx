import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConnectButton } from "thirdweb/react";
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
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
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction="left">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full w-[300px] sm:w-[400px] bg-[#111] text-white border-r border-border/20 rounded-r-xl">
        <div className="flex flex-col space-y-6 mt-8 px-4 overflow-y-auto h-full pb-8">
          {/* Navigation */}
          <div>
            <div className="text-lg font-semibold mb-4">Navigation</div>
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-left py-3 px-4 rounded-lg transition-colors text-white/80 hover:text-white hover:bg-[#22c55e]/20"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Crypto Section */}
              <div className="mt-4">
                <div className="text-sm font-medium text-white/60 mb-2 px-4">Crypto</div>
                {cryptoItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-left py-2 px-6 rounded-lg transition-colors text-white/80 hover:text-white hover:bg-[#22c55e]/20 text-sm"
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
      </DrawerContent>
    </Drawer>
  );
};

export { MobileMenu };