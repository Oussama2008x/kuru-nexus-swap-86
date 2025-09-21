import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SimpleSwapInterface } from '@/components/swap/SimpleSwapInterface';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Kerdium Platform of the Future DEFI
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-powered DeFi trading platform with smart execution algorithms for optimal performance.
          </p>
        </div>

        {/* Main Trading Interface */}
        <div className="flex justify-center">
          <SimpleSwapInterface />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
