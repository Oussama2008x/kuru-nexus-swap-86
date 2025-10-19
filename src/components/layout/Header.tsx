
import React from 'react';
import { Menu, Zap } from 'lucide-react';
import { ConnectButton } from "thirdweb/react";
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';
import { client, wallets } from '@/lib/thirdweb';
import headerBg from '@/assets/header-bg.png';

export const Header: React.FC = () => {

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-cover bg-center" style={{ backgroundImage: `url(${headerBg})` }}>
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
          {/* Theme Toggle - Desktop Only */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          
          {/* Wallet Button - Desktop Only */}
          <div className="hidden md:block">
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

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};
