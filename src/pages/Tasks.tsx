import React from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';

const Tasks = () => {
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
              <CardTitle className="text-3xl font-bold">Tasks & Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl text-muted-foreground mb-6">
                Task-based reward system is under development
              </p>
              <p className="text-muted-foreground">
                Complete various tasks and challenges to earn rewards on the Kerdium platform.
                Our gamified approach will include daily missions, achievement badges,
                referral programs, and community participation rewards.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Tasks;