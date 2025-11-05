import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, TrendingDown, Activity, Coins, Zap } from 'lucide-react';

interface WETHData {
  price: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  priceChange24h: number;
  ethPrice: number;
}

export const WETHStats = () => {
  const [wethData, setWethData] = useState<WETHData | null>(null);
  const [loading, setLoading] = useState(true);
  const [monadPrice, setMonadPrice] = useState<number>(0);

  useEffect(() => {
    // Mock data for display
    setWethData({
      price: 3200,
      marketCap: 384000000000,
      volume24h: 15200000000,
      circulatingSupply: 120000000,
      priceChange24h: 1.8,
      ethPrice: 3200
    });
    setMonadPrice(0.85);
    setLoading(false);
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatSupply = (num: number): string => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toFixed(0);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-0 pb-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-6 bg-muted rounded w-1/2 mt-2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!wethData) {
    return (
      <Card className="col-span-full">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Failed to load WETH data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          WETH Token Information
        </h2>
        <p className="text-muted-foreground mt-2">
          Wrapped Ethereum on Monad Network
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* WETH Price */}
        <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">WETH Price</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${wethData.price.toFixed(2)}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              {wethData.priceChange24h >= 0 ? (
                <TrendingUp className="h-3 w-3 text-emerald-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={wethData.priceChange24h >= 0 ? 'text-emerald-500' : 'text-red-500'}>
                {wethData.priceChange24h >= 0 ? '+' : ''}{wethData.priceChange24h.toFixed(2)}%
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Market Cap */}
        <Card className="border-secondary/20 bg-gradient-to-br from-background to-secondary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Cap</CardTitle>
            <Activity className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(wethData.marketCap)}</div>
            <p className="text-xs text-muted-foreground">
              Total Market Cap
            </p>
          </CardContent>
        </Card>

        {/* 24h Volume */}
        <Card className="border-accent/20 bg-gradient-to-br from-background to-accent/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">24h Volume</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(wethData.volume24h)}</div>
            <p className="text-xs text-muted-foreground">
              Last 24 Hours
            </p>
          </CardContent>
        </Card>

        {/* Contract Address */}
        <Card className="border-muted/20 bg-gradient-to-br from-background to-muted/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contract Address</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-mono break-all">0x92907055EA5FFb809aE9809dF4c193fa345Ebac1</div>
            <p className="text-xs text-muted-foreground">
              WETH Contract on Monad Testnet
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Wrap/Unwrap Info */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Wrap & Unwrap Info
          </CardTitle>
          <CardDescription>
            You can convert ETH to WETH and vice versa at 1:1 ratio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Wrap ETH → WETH</h4>
              <p className="text-xs text-muted-foreground">
                Convert your ETH to WETH to be ERC-20 compatible
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Unwrap WETH → ETH</h4>
              <p className="text-xs text-muted-foreground">
                Convert WETH back to native ETH
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};