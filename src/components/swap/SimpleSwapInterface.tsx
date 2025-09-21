import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TradingButton } from "@/components/ui/trading-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDownUp, Settings } from 'lucide-react';
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client, wallets } from '@/lib/thirdweb';
import { useToast } from '@/hooks/use-toast';

const TOKENS = [
  { symbol: 'ETH', name: 'Ethereum', price: 3200 },
  { symbol: 'USDC', name: 'USD Coin', price: 1 },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', price: 65000 },
];

export const SimpleSwapInterface: React.FC = () => {
  const [fromToken, setFromToken] = useState(TOKENS[0]);
  const [toToken, setToToken] = useState(TOKENS[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const account = useActiveAccount();
  const { toast } = useToast();

  const calculateToAmount = (amount: string) => {
    if (!amount || isNaN(Number(amount))) return '';
    const rate = fromToken.price / toToken.price;
    return (Number(amount) * rate).toFixed(6);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(calculateToAmount(value));
  };

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = () => {
    if (!account) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to perform swaps",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Swap Initiated",
      description: `Swapping ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`,
      variant: "default"
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          Swap
          <TradingButton variant="ghost" size="icon">
            <Settings className="w-4 h-4" />
          </TradingButton>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* From Token */}
        <div className="space-y-2">
          <Label>From</Label>
          <div className="flex items-center space-x-2">
            <select 
              value={fromToken.symbol}
              onChange={(e) => setFromToken(TOKENS.find(t => t.symbol === e.target.value) || TOKENS[0])}
              className="flex h-10 w-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {TOKENS.map(token => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </select>
            <Input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              className="flex-1"
            />
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
            <select 
              value={toToken.symbol}
              onChange={(e) => setToToken(TOKENS.find(t => t.symbol === e.target.value) || TOKENS[1])}
              className="flex h-10 w-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {TOKENS.map(token => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </select>
            <Input
              type="number"
              placeholder="0.0"
              value={toAmount}
              readOnly
              className="flex-1 bg-muted"
            />
          </div>
        </div>

        {/* Slippage */}
        <div className="space-y-2">
          <Label>Slippage Tolerance (%)</Label>
          <Input
            type="number"
            value={slippage}
            onChange={(e) => setSlippage(e.target.value)}
            placeholder="0.5"
            step="0.1"
          />
        </div>

        {/* Action Button */}
        {account ? (
          <TradingButton
            variant="trading"
            size="lg"
            onClick={handleSwap}
            disabled={!fromAmount || !toAmount}
            className="w-full"
          >
            Swap {fromToken.symbol} for {toToken.symbol}
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
          />
        )}
      </CardContent>
    </Card>
  );
};