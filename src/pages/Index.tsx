import React from 'react';
import { Header } from '@/components/layout/Header';
import { TradingStats } from '@/components/layout/TradingStats';
import { SwapInterface } from '@/components/swap/SwapInterface';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Trade with{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Lightning Speed
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the next generation of DeFi trading with Nexus Swap. 
            Powered by Kuru's advanced orderbook technology for optimal execution.
          </p>
        </div>

        {/* Trading Stats */}
        <TradingStats />

        {/* Main Trading Interface */}
        <div className="flex justify-center">
          <SwapInterface />
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-gradient-primary rounded" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Sub-second trade execution with Kuru's optimized orderbook
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-accent rounded" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Best Prices</h3>
            <p className="text-muted-foreground">
              Deep liquidity ensures minimal slippage on your trades
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-success rounded" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure</h3>
            <p className="text-muted-foreground">
              Non-custodial trading with advanced security protocols
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
