import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, Droplets, TrendingUp, ArrowLeftRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client, wallets } from '@/lib/thirdweb';
import { useToast } from '@/hooks/use-toast';

const Pool = () => {
  const [activeTab, setActiveTab] = useState<'add' | 'remove'>('add');
  const [token1Amount, setToken1Amount] = useState('');
  const [token2Amount, setToken2Amount] = useState('');
  const account = useActiveAccount();
  const { toast } = useToast();

  const handleAddLiquidity = () => {
    if (!account) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to add liquidity",
        variant: "destructive"
      });
      return;
    }

    if (token1Amount && token2Amount) {
      toast({
        title: "Liquidity Added",
        description: `Added ${token1Amount} WETH + ${token2Amount} USDC to pool`,
        variant: "default"
      });
      setToken1Amount('');
      setToken2Amount('');
    }
  };

  const handleRemoveLiquidity = () => {
    if (!account) {
      toast({
        title: "Wallet Required", 
        description: "Please connect your wallet to remove liquidity",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Liquidity Removed",
      description: "Successfully removed liquidity from pool",
      variant: "default"
    });
  };

  const poolData = [
    {
      pair: 'WETH/USDC',
      tvl: '$2,345,678',
      apr: '12.5%',
      volume24h: '$456,789',
      fees: '0.3%',
      yourLiquidity: '$0',
      poolShare: '0%'
    },
    {
      pair: 'WBTC/USDC',
      tvl: '$1,234,567',
      apr: '8.7%',
      volume24h: '$234,567',
      fees: '0.3%',
      yourLiquidity: '$0',
      poolShare: '0%'
    },
    {
      pair: 'WETH/WBTC',
      tvl: '$987,654',
      apr: '15.2%',
      volume24h: '$345,678',
      fees: '0.3%',
      yourLiquidity: '$0',
      poolShare: '0%'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back to Home Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors">
          <Home className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Liquidity Pools
          </h1>
          <p className="text-xl text-muted-foreground">
            Provide liquidity and earn trading fees from swaps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pool Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">Total TVL</span>
                  </div>
                  <p className="text-2xl font-bold">$4,567,899</p>
                  <p className="text-sm text-green-500">+12.3% this week</p>
                </CardContent>
              </Card>
              
              <Card className="border-accent/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    <span className="text-sm font-medium text-muted-foreground">24h Volume</span>
                  </div>
                  <p className="text-2xl font-bold">$1,037,034</p>
                  <p className="text-sm text-green-500">+8.7% today</p>
                </CardContent>
              </Card>
              
              <Card className="border-secondary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowLeftRight className="w-5 h-5 text-secondary" />
                    <span className="text-sm font-medium text-muted-foreground">Active Pools</span>
                  </div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Available pairs</p>
                </CardContent>
              </Card>
            </div>

            {/* Pool List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="w-5 h-5" />
                  Available Pools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {poolData.map((pool, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="font-semibold text-lg">{pool.pair}</p>
                        <Badge variant="secondary" className="mt-1">
                          Fee: {pool.fees}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">TVL</p>
                        <p className="font-semibold">{pool.tvl}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">APR</p>
                        <p className="font-semibold text-green-500">{pool.apr}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">24h Volume</p>
                        <p className="font-semibold">{pool.volume24h}</p>
                      </div>
                    </div>
                    <Separator className="my-3" />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Your Liquidity: </span>
                        <span className="font-medium">{pool.yourLiquidity}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Pool Share: </span>
                        <span className="font-medium">{pool.poolShare}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Liquidity Management */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Liquidity</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant={activeTab === 'add' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveTab('add')}
                    className="flex-1"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                  <Button
                    variant={activeTab === 'remove' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveTab('remove')}
                    className="flex-1"
                  >
                    <Minus className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeTab === 'add' ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Token 1 Amount</label>
                      <div className="relative">
                        <Input
                          placeholder="0.0"
                          value={token1Amount}
                          onChange={(e) => setToken1Amount(e.target.value)}
                          className="pr-16"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <Badge variant="outline">WETH</Badge>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Balance: 0.0 WETH</p>
                    </div>

                    <div className="flex justify-center">
                      <Plus className="w-6 h-6 text-muted-foreground" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Token 2 Amount</label>
                      <div className="relative">
                        <Input
                          placeholder="0.0"
                          value={token2Amount}
                          onChange={(e) => setToken2Amount(e.target.value)}
                          className="pr-16"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <Badge variant="outline">USDC</Badge>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">Balance: 0.0 USDC</p>
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pool Share:</span>
                        <span>0%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">LP Tokens:</span>
                        <span>0.0</span>
                      </div>
                    </div>

                    {account ? (
                      <Button 
                        className="w-full"
                        onClick={handleAddLiquidity}
                        disabled={!token1Amount || !token2Amount}
                      >
                        Add Liquidity
                      </Button>
                    ) : (
                      <ConnectButton
                        client={client}
                        connectButton={{ label: "Connect Wallet to Add Liquidity" }}
                        connectModal={{
                          privacyPolicyUrl: "https://kerdium.vercel.app/about",
                          size: "compact",
                          termsOfServiceUrl: "https://kerdium.vercel.app/faq",
                          title: "KERDIUM FINANCE",
                        }}
                        wallets={wallets}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">LP Tokens to Remove</label>
                      <Input
                        placeholder="0.0"
                        className="pr-20"
                      />
                      <p className="text-xs text-muted-foreground">Available: 0.0 LP tokens</p>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      <Button variant="outline" size="sm">25%</Button>
                      <Button variant="outline" size="sm">50%</Button>
                      <Button variant="outline" size="sm">75%</Button>
                      <Button variant="outline" size="sm">MAX</Button>
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">WETH Received:</span>
                        <span>0.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">USDC Received:</span>
                        <span>0.0</span>
                      </div>
                    </div>

                    {account ? (
                      <Button 
                        className="w-full"
                        onClick={handleRemoveLiquidity}
                        variant="destructive"
                      >
                        Remove Liquidity
                      </Button>
                    ) : (
                      <ConnectButton
                        client={client}
                        connectButton={{ label: "Connect Wallet to Remove Liquidity" }}
                        connectModal={{
                          privacyPolicyUrl: "https://kerdium.vercel.app/about",
                          size: "compact",
                          termsOfServiceUrl: "https://kerdium.vercel.app/faq",
                          title: "KERDIUM FINANCE",
                        }}
                        wallets={wallets}
                      />
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Pool Stats Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Position</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Liquidity:</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Unclaimed Fees:</span>
                  <span className="font-medium text-green-500">$0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Est. APR:</span>
                  <span className="font-medium">0%</span>
                </div>
                <Button variant="outline" className="w-full" size="sm" disabled>
                  Claim Fees
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pool;