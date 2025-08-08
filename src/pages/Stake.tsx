import React from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';

const Stake = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <Card className="border-dashed border-2 border-muted">
            <CardHeader className="pb-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-muted-foreground" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold">Staking Feature</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl text-muted-foreground mb-6">
                Advanced staking mechanisms are coming soon
              </p>
              <p className="text-muted-foreground">
                Earn passive income by staking your tokens with our innovative staking protocols.
                We're developing cutting-edge staking solutions with flexible lock periods,
                competitive APY rates, and automated compound rewards.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Stake;