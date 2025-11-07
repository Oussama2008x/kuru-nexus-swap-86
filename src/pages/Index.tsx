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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Kerdium Platform of the Future DEFI
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            AI-powered DeFi trading platform with smart execution algorithms for optimal performance.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button className="group relative px-8 py-4 bg-primary/10 hover:bg-primary/20 backdrop-blur-sm border border-primary/30 hover:border-primary/50 rounded-2xl text-foreground font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(88,230,147,0.3)] min-w-[200px]">
              <span className="relative z-10">Start Trading</span>
            </button>
            
            <button className="group relative px-8 py-4 bg-background/40 hover:bg-background/60 backdrop-blur-sm border border-border/50 hover:border-primary/30 rounded-2xl text-foreground font-semibold transition-all duration-300 hover:scale-105 min-w-[200px]">
              <span className="relative z-10">Learn More</span>
            </button>
          </div>
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
