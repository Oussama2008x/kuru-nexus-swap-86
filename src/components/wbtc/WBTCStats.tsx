import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, TrendingDown, Coins, Activity, Users, DollarSign } from 'lucide-react';

interface WBTCStatsType {
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  circulatingSupply: number;
}

interface WBTCContractInfo {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  contractAddress: string;
}

export const WBTCStats = () => {
  const [stats, setStats] = useState<WBTCStatsType | null>(null);
  const [contractInfo, setContractInfo] = useState<WBTCContractInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Mock data for display
    setStats({
      price: 65432,
      priceChange24h: 2.5,
      volume24h: 890000000,
      marketCap: 12800000000,
      circulatingSupply: 155420
    });
    
    setContractInfo({
      name: "Wrapped Bitcoin",
      symbol: "WBTC",
      decimals: 18,
      totalSupply: "155420.0",
      contractAddress: "0x517C7b2c5ab04Fe60f481bdDEC07D3f1fccDF489"
    });
    
    setLoading(false);
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(2);
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 w-4 bg-muted rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats || !contractInfo) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            فشل في تحميل بيانات WBTC
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Price and Change */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">سعر WBTC</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(stats.price)}</div>
            <div className="flex items-center mt-1">
              {stats.priceChange24h >= 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span
                className={`text-xs ${
                  stats.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {stats.priceChange24h >= 0 ? '+' : ''}{stats.priceChange24h.toFixed(2)}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">حجم التداول 24س</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${formatNumber(stats.volume24h)}</div>
            <p className="text-xs text-muted-foreground">حجم التداول اليومي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">القيمة السوقية</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${formatNumber(stats.marketCap)}</div>
            <p className="text-xs text-muted-foreground">إجمالي القيمة السوقية</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المعروض المتداول</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(stats.circulatingSupply)}</div>
            <p className="text-xs text-muted-foreground">WBTC متداولة</p>
          </CardContent>
        </Card>
      </div>

      {/* Contract Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            معلومات عقد WBTC
          </CardTitle>
          <CardDescription>
            تفاصيل العقد الذكي لعملة Wrapped Bitcoin على شبكة Monad
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-muted-foreground">اسم الرمز</label>
              <p className="text-lg font-semibold">{contractInfo.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">الرمز</label>
              <p className="text-lg font-semibold">{contractInfo.symbol}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">الكسور العشرية</label>
              <p className="text-lg font-semibold">{contractInfo.decimals}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">إجمالي المعروض</label>
              <p className="text-lg font-semibold">{formatNumber(parseFloat(contractInfo.totalSupply))}</p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">عنوان العقد</label>
            <div className="flex items-center gap-2 mt-1">
              <code className="text-sm bg-muted px-2 py-1 rounded font-mono break-all">
                {contractInfo.contractAddress}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(contractInfo.contractAddress);
                  toast({
                    title: "تم النسخ",
                    description: "تم نسخ عنوان العقد إلى الحافظة",
                  });
                }}
              >
                نسخ
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">ERC-20</Badge>
            <Badge variant="secondary">Mintable</Badge>
            <Badge variant="secondary">Burnable</Badge>
            <Badge variant="secondary">Access Control</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>إجراءات سريعة</CardTitle>
          <CardDescription>
            تفاعل مع عقد WBTC على شبكة Monad
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => window.open(`https://testnet-explorer.monad.xyz/address/${contractInfo.contractAddress}`, '_blank')}>
              عرض في Explorer
            </Button>
            <Button variant="outline" onClick={() => window.open('/swap', '_self')}>
              تداول WBTC
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};