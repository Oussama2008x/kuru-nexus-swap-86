import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, TrendingDown, Activity, Coins } from 'lucide-react';

interface USDCData {
  price: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  priceChange24h: number;
}

export const USDCStats = () => {
  const [usdcData, setUsdcData] = useState<USDCData | null>(null);
  const [loading, setLoading] = useState(true);
  const [monadPrice, setMonadPrice] = useState<number>(0);

  useEffect(() => {
    // Mock data for display
    setUsdcData({
      price: 1.0,
      marketCap: 34200000000,
      volume24h: 2100000000,
      circulatingSupply: 34200000000,
      priceChange24h: 0.02
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

  if (!usdcData) {
    return (
      <Card className="col-span-full">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">فشل في تحميل بيانات USDC</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          معلومات عملة USDC
        </h2>
        <p className="text-muted-foreground mt-2">
          عملة USDC المستقرة على شبكة Monad
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* USDC Price */}
        <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">سعر USDC</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${usdcData.price.toFixed(4)}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              {usdcData.priceChange24h >= 0 ? (
                <TrendingUp className="h-3 w-3 text-emerald-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={usdcData.priceChange24h >= 0 ? 'text-emerald-500' : 'text-red-500'}>
                {usdcData.priceChange24h >= 0 ? '+' : ''}{usdcData.priceChange24h.toFixed(2)}%
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Market Cap */}
        <Card className="border-secondary/20 bg-gradient-to-br from-background to-secondary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">القيمة السوقية</CardTitle>
            <Activity className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(usdcData.marketCap)}</div>
            <p className="text-xs text-muted-foreground">
              القيمة السوقية الإجمالية
            </p>
          </CardContent>
        </Card>

        {/* 24h Volume */}
        <Card className="border-accent/20 bg-gradient-to-br from-background to-accent/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">حجم التداول 24ساعة</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(usdcData.volume24h)}</div>
            <p className="text-xs text-muted-foreground">
              خلال 24 ساعة الماضية
            </p>
          </CardContent>
        </Card>

        {/* Circulating Supply */}
        <Card className="border-muted/20 bg-gradient-to-br from-background to-muted/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المعروض المتداول</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatSupply(usdcData.circulatingSupply)}</div>
            <p className="text-xs text-muted-foreground">
              USDC في التداول
            </p>
          </CardContent>
        </Card>

        {/* Contract Address */}
        <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5 md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">عنوان العقد</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-mono break-all">0x13C944aF2de88DA97Bc5BBEB831cDfFaF9ee52e8</div>
            <p className="text-xs text-muted-foreground mt-1">
              عقد USDC على شبكة Monad Testnet
            </p>
          </CardContent>
        </Card>

        {/* Status Badge */}
        <Card className="border-accent/20 bg-gradient-to-br from-background to-accent/5 md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">حالة العملة</CardTitle>
            <Coins className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <Badge variant="default" className="text-sm">
              مستقرة
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">
              عملة مستقرة مربوطة بالدولار
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};