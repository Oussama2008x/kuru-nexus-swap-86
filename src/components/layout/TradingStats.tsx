import React from 'react';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive, icon }) => (
  <Card className="bg-gradient-card border-0 shadow-sm hover:shadow-primary/10 transition-all duration-300">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-lg font-semibold">{value}</p>
          {change && (
            <div className={`flex items-center gap-1 text-xs ${isPositive ? 'text-success' : 'text-danger'}`}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {change}
            </div>
          )}
        </div>
        <div className="text-primary opacity-70">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

export const TradingStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        title="24h Volume"
        value="$12.4M"
        change="+5.2%"
        isPositive={true}
        icon={<Activity className="w-5 h-5" />}
      />
      <StatCard
        title="Total Liquidity"
        value="$89.2M"
        change="+2.1%"
        isPositive={true}
        icon={<DollarSign className="w-5 h-5" />}
      />
      <StatCard
        title="ETH Price"
        value="$3,421.50"
        change="-1.3%"
        isPositive={false}
        icon={<TrendingUp className="w-5 h-5" />}
      />
      <StatCard
        title="Active Traders"
        value="2,847"
        change="+8.7%"
        isPositive={true}
        icon={<Activity className="w-5 h-5" />}
      />
    </div>
  );
};