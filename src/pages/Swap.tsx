import React from 'react';
import { Header } from '@/components/layout/Header';
import { SimpleSwapInterface } from '@/components/swap/SimpleSwapInterface';
import { LiquidityAdminTools } from '@/components/swap/LiquidityAdminTools';

const Swap: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent italic">
                Trade whenever, wherever
              </span>
            </h1>
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
      
      {/* Copyright Only Footer */}
      <footer className="border-t bg-background py-4">
        <div className="container mx-auto px-4">
          <div className="text-xs text-muted-foreground text-center">
            © 2024 Kerdium. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Swap;