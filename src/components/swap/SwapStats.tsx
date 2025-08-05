
import React from 'react';
import { Info, Zap, TrendingUp, ArrowRightLeft } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface Token {
  symbol: string;
  name: string;
}

interface Quote {
  priceImpact: number;
  gasEstimate: string;
  marketPrice: string;
  executionPrice: string;
  slippage: number;
}

interface SwapStatsProps {
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  toAmount: string;
  quote?: Quote;
}

export const SwapStats: React.FC<SwapStatsProps> = ({
  fromToken,
  toToken,
  fromAmount,
  toAmount,
  quote,
}) => {
  const rate = parseFloat(toAmount) / parseFloat(fromAmount);
  const priceImpact = quote?.priceImpact || 0.12;
  const minimumReceived = (parseFloat(toAmount) * (1 - (quote?.slippage || 0.5) / 100)).toFixed(6);
  const networkFee = quote?.gasEstimate || "0.00001 MON";
  const route = `${fromToken.symbol} → ${toToken.symbol}`;

  // Check if this is a wrapping operation
  const isWrapping = (fromToken.symbol === 'MON' && toToken.symbol === 'WMON') ||
                    (fromToken.symbol === 'WMON' && toToken.symbol === 'MON');
  const isWrap = fromToken.symbol === 'MON' && toToken.symbol === 'WMON';

  const priceImpactColor = priceImpact < 0.1 ? "text-success" : 
                          priceImpact < 1 ? "text-warning" : "text-destructive";

  return (
    <TooltipProvider>
      <div className="space-y-3 p-4 bg-muted/20 rounded-xl border border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            {isWrapping ? <ArrowRightLeft className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
            {isWrapping ? 'Wrapping Details' : 'Trade Details'}
          </div>
          <Badge variant="secondary" className="text-xs">
            {isWrapping ? (
              <>
                <ArrowRightLeft className="w-3 h-3 mr-1" />
                {isWrap ? 'Wrap MON' : 'Unwrap WMON'}
              </>
            ) : (
              <>
                <TrendingUp className="w-3 h-3 mr-1" />
                Kuru Orderbook
              </>
            )}
          </Badge>
        </div>
        
        <div className="space-y-2 text-sm">
          {/* Exchange Rate */}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Rate</span>
            <span className="font-medium">
              1 {fromToken.symbol} = {rate.toFixed(6)} {toToken.symbol}
            </span>
          </div>

          {/* Market vs Execution Price */}
          {quote && !isWrapping && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Market Price</span>
              <span className="font-medium">{quote.marketPrice}</span>
            </div>
          )}

          {/* Price Impact */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">
                {isWrapping ? 'Price Impact' : 'Price Impact'}
              </span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-3 h-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {isWrapping 
                      ? 'Wrapping has no price impact - it\'s a 1:1 conversion.'
                      : 'The difference between market price and execution price due to orderbook liquidity.'
                    }
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <span className={`font-medium ${isWrapping ? 'text-success' : priceImpactColor}`}>
              {priceImpact.toFixed(2)}%
              {isWrapping && ' (None)'}
            </span>
          </div>

          {/* Minimum Received */}
          {!isWrapping && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Minimum received</span>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-3 h-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your transaction will revert if the price moves unfavorably by more than {quote?.slippage || 0.5}%.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="font-medium">
                {minimumReceived} {toToken.symbol}
              </span>
            </div>
          )}

          {isWrapping && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">You will receive</span>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-3 h-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Wrapping is guaranteed 1:1 - you receive exactly what you deposit.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="font-medium text-success">
                {toAmount} {toToken.symbol}
              </span>
            </div>
          )}

          {/* Network Fee */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Network fee</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-3 h-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Gas fee on Monad testnet 
                    {isWrapping && ' (lower for wrapping operations)'}
                    .
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <span className="font-medium text-success">{networkFee}</span>
          </div>

          {/* Slippage Tolerance - only for swaps */}
          {!isWrapping && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Slippage tolerance</span>
              <span className="font-medium">{quote?.slippage || 0.5}%</span>
            </div>
          )}

          {/* Route */}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Route</span>
            <span className="font-medium text-primary">{route}</span>
          </div>
        </div>

        {isWrapping && (
          <div className="text-xs text-muted-foreground bg-success/5 p-2 rounded-lg border border-success/20">
            <div className="flex items-center gap-1">
              <ArrowRightLeft className="w-3 h-3 text-success" />
              <span className="text-success font-medium">
                {isWrap ? 'Wrapping MON' : 'Unwrapping WMON'}:
              </span>
            </div>
            <p className="mt-1">
              {isWrap 
                ? 'Converts native MON to WMON tokens at 1:1 ratio with no fees.'
                : 'Converts WMON tokens back to native MON at 1:1 ratio with no fees.'
              }
            </p>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};
