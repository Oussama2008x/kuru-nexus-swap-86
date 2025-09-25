import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SimpleSwapInterface } from '@/components/swap/SimpleSwapInterface';
import { LiquidityAdminTools } from '@/components/swap/LiquidityAdminTools';

const Swap: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Token Swap
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Swap tokens instantly with the best rates and minimal slippage
            </p>
          </div>

          {/* Swap Interface */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <SimpleSwapInterface />
              {/* Admin Tools */}
              <LiquidityAdminTools />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Swap;