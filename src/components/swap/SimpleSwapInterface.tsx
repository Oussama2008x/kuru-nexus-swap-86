import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TradingButton } from "@/components/ui/trading-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDownUp, Settings, ChevronDown } from 'lucide-react';
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client, wallets, monadTestnet } from '@/lib/thirdweb';
import { useToast } from '@/hooks/use-toast';
import { useUniswapSwap } from '@/hooks/useUniswapSwap';
import { TOKENS } from '@/lib/contracts';
import { calculateTokenAmount, getTokenPrice } from '@/lib/tokenPrices';
import { TokenSelector } from './TokenSelector';
import { SwapSettings } from './SwapSettings';

export const SimpleSwapInterface: React.FC = () => {
  const [fromToken, setFromToken] = useState(TOKENS[0]);
  const [toToken, setToToken] = useState(TOKENS[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const [showFromTokenSelector, setShowFromTokenSelector] = useState(false);
  const [showToTokenSelector, setShowToTokenSelector] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const account = useActiveAccount();
  const { toast } = useToast();
  const { executeSwap, getAmountsOut, isLoading } = useUniswapSwap();

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    
    if (value && !isNaN(Number(value)) && Number(value) > 0) {
      // Use smart price calculation
      const calculatedAmount = calculateTokenAmount(value, fromToken.symbol, toToken.symbol);
      setToAmount(calculatedAmount);
    } else {
      setToAmount('');
    }
  };

  const handleSwapTokens = () => {
    const tempToken = fromToken;
    const tempAmount = fromAmount;
    
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleSwap = async () => {
    if (!account) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to perform swaps",
        variant: "destructive"
      });
      return;
    }

    if (!fromAmount || !toAmount) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to swap",
        variant: "destructive"
      });
      return;
    }

    await executeSwap({
      fromToken: fromToken.symbol,
      toToken: toToken.symbol,
      fromAmount,
      slippage,
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          Swap
          <TradingButton 
            variant="ghost" 
            size="icon"
            onClick={() => setShowSettings(true)}
          >
            <Settings className="w-4 h-4" />
          </TradingButton>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* From Token */}
        <div className="space-y-2">
          <Label>From</Label>
          <div className="flex items-center space-x-2">
            <TradingButton
              variant="outline"
              onClick={() => setShowFromTokenSelector(true)}
              className="flex items-center space-x-2 px-3 h-10"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-xs font-bold">
                {fromToken.symbol.slice(0, 2)}
              </div>
              <span>{fromToken.symbol}</span>
              <ChevronDown className="w-4 h-4" />
            </TradingButton>
            <Input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="text-xs text-muted-foreground text-right">
            ≈ ${fromAmount ? (Number(fromAmount) * getTokenPrice(fromToken.symbol)).toFixed(2) : '0.00'}
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <TradingButton
            variant="ghost"
            size="icon"
            onClick={handleSwapTokens}
            className="rounded-full border border-border"
          >
            <ArrowDownUp className="w-4 h-4" />
          </TradingButton>
        </div>

        {/* To Token */}
        <div className="space-y-2">
          <Label>To</Label>
          <div className="flex items-center space-x-2">
            <TradingButton
              variant="outline"
              onClick={() => setShowToTokenSelector(true)}
              className="flex items-center space-x-2 px-3 h-10"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-xs font-bold">
                {toToken.symbol.slice(0, 2)}
              </div>
              <span>{toToken.symbol}</span>
              <ChevronDown className="w-4 h-4" />
            </TradingButton>
            <Input
              type="number"
              placeholder="0.0"
              value={toAmount}
              readOnly
              className="flex-1 bg-muted"
            />
          </div>
          <div className="text-xs text-muted-foreground text-right">
            ≈ ${toAmount ? (Number(toAmount) * getTokenPrice(toToken.symbol)).toFixed(2) : '0.00'}
          </div>
        </div>


        {/* Action Button */}
        {account ? (
          <TradingButton
            variant="trading"
            size="lg"
            onClick={handleSwap}
            disabled={!fromAmount || !toAmount || isLoading}
            className="w-full"
          >
            {isLoading ? 'Processing...' : `Swap ${fromToken.symbol} for ${toToken.symbol}`}
          </TradingButton>
        ) : (
          <ConnectButton
            client={client}
            connectButton={{ label: "Connect Wallet to Swap" }}
            connectModal={{
              privacyPolicyUrl: "https://kerdium.vercel.app/about",
              size: "compact",
              termsOfServiceUrl: "https://kerdium.vercel.app/faq",
              title: "KERDIUM FINANCE",
            }}
            wallets={wallets}
            chain={monadTestnet}
          />
        )}
      </CardContent>
      
      {/* Token Selectors */}
      <TokenSelector
        isOpen={showFromTokenSelector}
        onClose={() => setShowFromTokenSelector(false)}
        onSelectToken={(token) => {
          setFromToken(token);
          if (fromAmount) {
            const calculatedAmount = calculateTokenAmount(fromAmount, token.symbol, toToken.symbol);
            setToAmount(calculatedAmount);
          }
        }}
        selectedToken={fromToken}
      />
      
      <TokenSelector
        isOpen={showToTokenSelector}
        onClose={() => setShowToTokenSelector(false)}
        onSelectToken={(token) => {
          setToToken(token);
          if (fromAmount) {
            const calculatedAmount = calculateTokenAmount(fromAmount, fromToken.symbol, token.symbol);
            setToAmount(calculatedAmount);
          }
        }}
        selectedToken={toToken}
      />
      
      {/* Settings Dialog */}
      <SwapSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        slippage={slippage}
        onSlippageChange={setSlippage}
      />
    </Card>
  );
};