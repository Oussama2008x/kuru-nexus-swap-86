import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Info, TrendingDown, TrendingUp } from 'lucide-react';
import { TOKENS } from '@/lib/contracts';
import { getTokenPrice } from '@/lib/tokenPrices';

interface TransactionSummaryProps {
  fromToken: any;
  toToken: any;
  fromAmount: string;
  toAmount: string;
  slippage: string;
  routePath?: string[];
}

export const TransactionSummary: React.FC<TransactionSummaryProps> = ({
  fromToken,
  toToken,
  fromAmount,
  toAmount,
  slippage,
  routePath = []
}) => {
  const [priceImpact, setPriceImpact] = useState('0');
  const [minimumReceived, setMinimumReceived] = useState('0');

  useEffect(() => {
    if (fromAmount && toAmount) {
      // Calculate minimum received based on slippage
      const slippageMultiplier = (100 - parseFloat(slippage)) / 100;
      const minReceived = (parseFloat(toAmount) * slippageMultiplier).toFixed(6);
      setMinimumReceived(minReceived);

      // Calculate price impact (simplified calculation)
      const fromPriceUSD = getTokenPrice(fromToken.symbol);
      const toPriceUSD = getTokenPrice(toToken.symbol);
      const expectedToAmount = (parseFloat(fromAmount) * fromPriceUSD) / toPriceUSD;
      const actualToAmount = parseFloat(toAmount);
      
      if (expectedToAmount > 0) {
        const impact = ((expectedToAmount - actualToAmount) / expectedToAmount) * 100;
        setPriceImpact(Math.max(0, impact).toFixed(3));
      }
    }
  }, [fromAmount, toAmount, slippage, fromToken, toToken]);

  // Get route display
  const getRouteDisplay = () => {
    if (!routePath || routePath.length === 0) {
      return `${fromToken.symbol} → ${toToken.symbol}`;
    }
    
    const symbols = routePath.map(address => {
      const token = TOKENS.find(t => t.address === address);
      return token ? token.symbol : 'Unknown';
    });
    
    return symbols.join(' → ');
  };

  // Calculate trading fee (0.3% for Uniswap V2)
  const tradingFee = fromAmount ? (parseFloat(fromAmount) * 0.003).toFixed(6) : '0';

  // Estimated gas fee (simplified - in real implementation would fetch from network)
  const estimatedGasFee = '0.0001'; // MON

  if (!fromAmount || !toAmount) {
    return null;
  }

  return (
    <Card className="w-full bg-muted/50 border-muted">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Info className="w-4 h-4" />
          Transaction Summary
        </div>
        
        <div className="space-y-2 text-sm">
          {/* Minimum Received */}
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Minimum received</span>
            <span className="font-medium">
              {minimumReceived} {toToken.symbol}
            </span>
          </div>

          {/* Price Impact */}
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Price impact</span>
            <div className="flex items-center gap-1">
              {parseFloat(priceImpact) > 3 ? (
                <TrendingUp className="w-3 h-3 text-destructive" />
              ) : parseFloat(priceImpact) > 1 ? (
                <TrendingDown className="w-3 h-3 text-yellow-500" />
              ) : (
                <TrendingDown className="w-3 h-3 text-green-500" />
              )}
              <span className={`font-medium ${
                parseFloat(priceImpact) > 3 ? 'text-destructive' : 
                parseFloat(priceImpact) > 1 ? 'text-yellow-500' : 'text-green-500'
              }`}>
                {priceImpact}%
              </span>
            </div>
          </div>

          <Separator />

          {/* Liquidity Provider Fee */}
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Liquidity provider fee</span>
            <span className="font-medium">
              {tradingFee} {fromToken.symbol} (0.30%)
            </span>
          </div>

          {/* Estimated Gas Fee */}
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Network fee</span>
            <span className="font-medium">
              ~{estimatedGasFee} MON
            </span>
          </div>

          {/* Route */}
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Route</span>
            <span className="font-medium text-xs">
              {getRouteDisplay()}
            </span>
          </div>

          {/* Slippage Tolerance */}
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Slippage tolerance</span>
            <span className="font-medium">
              {slippage}%
            </span>
          </div>

          {/* Fee Saved/Slippage Saved (conditional) */}
          {parseFloat(priceImpact) < 1 && (
            <div className="flex justify-between items-center">
              <span className="text-green-500 text-xs">Fee saved</span>
              <span className="text-green-500 text-xs font-medium">
                Low impact trade
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};