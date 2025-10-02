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
import { useTokenBalance } from '@/hooks/useTokenBalance';
import { TOKENS, CONTRACTS } from '@/lib/contracts';
import { ethers } from 'ethers';

// Custom hook for MON (native token) balance
const useNativeBalance = () => {
  const [balance, setBalance] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const account = useActiveAccount();

  const fetchBalance = async () => {
    if (!account?.address) return;
    
    setIsLoading(true);
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask not found');
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balanceWei = await provider.getBalance(account.address);
      const formattedBalance = ethers.formatEther(balanceWei);
      setBalance(formattedBalance);
    } catch (error) {
      console.error('Error fetching MON balance:', error);
      setBalance('0');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [account?.address]);

  return { balance, isLoading, refetch: fetchBalance };
};
import { calculateTokenAmount, getTokenPrice } from '@/lib/tokenPrices';
import { TokenSelector } from './TokenSelector';
import { SwapSettings } from './SwapSettings';
import { PercentageButtons } from './PercentageButtons';
import { TransactionSummary } from './TransactionSummary';

export const SimpleSwapInterface: React.FC = () => {
  const [fromToken, setFromToken] = useState(TOKENS[0]);
  const [toToken, setToToken] = useState(TOKENS[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const [showFromTokenSelector, setShowFromTokenSelector] = useState(false);
  const [showToTokenSelector, setShowToTokenSelector] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [routePath, setRoutePath] = useState<string[]>([]);
  const [needsApproval, setNeedsApproval] = useState(false);
  const [isCheckingApproval, setIsCheckingApproval] = useState(false);
  const account = useActiveAccount();
  const { toast } = useToast();
  const { executeSwap, quoteSwap, addLiquidity, checkAllowance, approveToken, isLoading } = useUniswapSwap();
  const { balance: fromTokenBalance, isLoading: balanceLoading, refetch: refetchBalance } = useTokenBalance(fromToken.symbol);
  const { balance: monBalance, isLoading: monLoading, refetch: refetchMonBalance } = useNativeBalance();

  const checkApprovalStatus = async (token: typeof TOKENS[0], amount: string) => {
    if (!account?.address || !amount || Number(amount) <= 0) {
      setNeedsApproval(false);
      return;
    }

    // MON doesn't need approval (native token)
    if (token.symbol === 'MON') {
      setNeedsApproval(false);
      return;
    }

    setIsCheckingApproval(true);
    try {
      const hasAllowance = await checkAllowance(
        token.address,
        CONTRACTS.router,
        amount,
        token.decimals
      );
      setNeedsApproval(!hasAllowance);
    } catch (error) {
      console.error('Error checking allowance:', error);
      setNeedsApproval(false);
    } finally {
      setIsCheckingApproval(false);
    }
  };

  const handleFromAmountChange = async (value: string) => {
    setFromAmount(value);
    
    if (value && !isNaN(Number(value)) && Number(value) > 0) {
      // Check approval status
      await checkApprovalStatus(fromToken, value);
      
      // Get on-chain quote using router paths (WMON as base)
      console.log('Getting quote for:', { fromToken: fromToken.symbol, toToken: toToken.symbol, amount: value });
      quoteSwap(fromToken.symbol, toToken.symbol, value)
        .then(({ amountOut, path }) => {
          console.log('Quote result:', { amountOut, path });
          if (amountOut && amountOut !== '0') {
            setToAmount(amountOut);
            setRoutePath(path || []);
          } else {
            console.warn('Invalid quote result, amountOut is 0');
            setToAmount('0');
            setRoutePath([]);
          }
        })
        .catch((error) => {
          console.error('Quote failed:', error);
          setToAmount('0');
          setRoutePath([]);
        });
    } else {
      setToAmount('');
      setRoutePath([]);
      setNeedsApproval(false);
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

  const handleApprove = async () => {
    if (!account || !fromAmount) {
      return;
    }

    try {
      toast({
        title: "Approving Token",
        description: `Approving ${fromToken.symbol} for trading...`,
      });

      await approveToken(
        fromToken.address,
        CONTRACTS.router,
        fromAmount,
        fromToken.decimals
      );

      toast({
        title: "Approval Successful",
        description: `${fromToken.symbol} approved successfully!`,
      });

      // Recheck approval status
      await checkApprovalStatus(fromToken, fromAmount);
    } catch (error: any) {
      console.error('Approval error:', error);
      toast({
        title: "Approval Failed",
        description: error.message || "Failed to approve token",
        variant: "destructive",
      });
    }
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

    // Check if user has sufficient balance
    const userBalance = fromToken.symbol === 'MON' ? monBalance : fromTokenBalance;
    if (parseFloat(fromAmount) > parseFloat(userBalance)) {
      toast({
        title: "Insufficient Balance",
        description: `You don't have enough ${fromToken.symbol}`,
        variant: "destructive"
      });
      return;
    }

    const result = await executeSwap({
      fromToken: fromToken.symbol,
      toToken: toToken.symbol,
      fromAmount,
      slippage,
    });

    // Refresh balances after successful swap
    if (result?.success) {
      refetchBalance();
      if (fromToken.symbol === 'MON' || toToken.symbol === 'MON') {
        refetchMonBalance();
      }
    }
  };

  const handlePercentageAmount = (amount: string) => {
    setFromAmount(amount);
    handleFromAmountChange(amount);
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
        {/* MON Balance Display - Only show when MON is selected */}
        {account && fromToken.symbol === 'MON' && (
          <div className="bg-muted/50 p-3 rounded-lg mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">MON Balance</span>
              <span className="text-sm font-mono">
                {monLoading ? '...' : parseFloat(monBalance).toFixed(6)} MON
              </span>
            </div>
          </div>
        )}

        {/* From Token */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>From</Label>
            {account && (
              <div className="text-xs text-muted-foreground">
                Balance: {balanceLoading ? '...' : parseFloat(fromTokenBalance).toFixed(6)} {fromToken.symbol}
              </div>
            )}
          </div>
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
          
          {/* Percentage Buttons */}
          {account && (
            <PercentageButtons
              balance={fromTokenBalance}
              onAmountSelect={handlePercentageAmount}
              disabled={balanceLoading || isLoading}
            />
          )}
          
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

        {/* Transaction Summary */}
        {fromAmount && toAmount && (
          <TransactionSummary
            fromToken={fromToken}
            toToken={toToken}
            fromAmount={fromAmount}
            toAmount={toAmount}
            slippage={slippage}
            routePath={routePath}
          />
        )}

        {/* Action Buttons */}
        {account ? (
          <div className="space-y-2">
            {needsApproval && (
              <TradingButton
                variant="outline"
                size="lg"
                onClick={handleApprove}
                disabled={!fromAmount || isLoading || isCheckingApproval}
                className="w-full"
              >
                {isCheckingApproval ? 'Checking...' : `Approve ${fromToken.symbol}`}
              </TradingButton>
            )}
            <TradingButton
              variant="trading"
              size="lg"
              onClick={handleSwap}
              disabled={!fromAmount || !toAmount || isLoading || needsApproval}
              className="w-full"
            >
              {isLoading ? 'Processing...' : needsApproval ? 'Approve First' : `Swap ${fromToken.symbol} for ${toToken.symbol}`}
            </TradingButton>
          </div>
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
        onSelectToken={async (token) => {
          setFromToken(token);
          if (fromAmount) {
            await checkApprovalStatus(token, fromAmount);
            quoteSwap(token.symbol, toToken.symbol, fromAmount)
              .then(({ amountOut, path }) => {
                setToAmount(amountOut);
                setRoutePath(path || []);
              })
              .catch(() => {
                setToAmount('');
                setRoutePath([]);
              });
          } else {
            setFromAmount('');
            setToAmount('');
            setRoutePath([]);
            setNeedsApproval(false);
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
            quoteSwap(fromToken.symbol, token.symbol, fromAmount)
              .then(({ amountOut, path }) => {
                setToAmount(amountOut);
                setRoutePath(path || []);
              })
              .catch(() => {
                setToAmount('');
                setRoutePath([]);
              });
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