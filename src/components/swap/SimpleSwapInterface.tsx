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
    <div className="w-full max-w-md mx-auto">
      {/* Header with Settings */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Swap</h2>
        <TradingButton 
          variant="ghost" 
          size="icon"
          onClick={() => setShowSettings(true)}
          className="hover:bg-muted/50"
        >
          <Settings className="w-5 h-5" />
        </TradingButton>
      </div>

      {/* From Panel */}
      <div className="bg-card border border-border rounded-2xl p-4 shadow-card mb-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground">From</span>
          {account && (
            <span className="text-xs text-muted-foreground">
              Balance: {fromToken.symbol === 'MON' 
                ? (monLoading ? '...' : parseFloat(monBalance).toFixed(6))
                : (balanceLoading ? '...' : parseFloat(fromTokenBalance).toFixed(6))
              }
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between gap-3">
          <TradingButton
            variant="ghost"
            onClick={() => setShowFromTokenSelector(true)}
            className="flex items-center gap-2 px-3 py-2 h-auto hover:bg-muted/50 rounded-xl"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {fromToken.symbol === 'MON' ? '🟣' : fromToken.symbol.slice(0, 1)}
              </span>
            </div>
            <span className="text-lg font-semibold">{fromToken.symbol}</span>
            <ChevronDown className="w-4 h-4" />
          </TradingButton>
          
          <div className="flex-1 text-right">
            <Input
              type="number"
              placeholder="0.00"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              className="text-right text-2xl font-semibold bg-transparent border-none p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <div className="text-xs text-muted-foreground mt-1">
              ${fromAmount ? (Number(fromAmount) * getTokenPrice(fromToken.symbol)).toFixed(2) : '0.00'}
            </div>
          </div>
        </div>

        {/* Percentage Buttons */}
        {account && (
          <div className="mt-3">
            <PercentageButtons
              balance={fromToken.symbol === 'MON' ? monBalance : fromTokenBalance}
              onAmountSelect={handlePercentageAmount}
              disabled={balanceLoading || isLoading || monLoading}
            />
          </div>
        )}
      </div>

      {/* Swap Icon */}
      <div className="flex justify-center -my-2 relative z-10">
        <TradingButton
          variant="ghost"
          size="icon"
          onClick={handleSwapTokens}
          className="rounded-full bg-card border-2 border-border hover:bg-muted/50 h-10 w-10"
        >
          <ArrowDownUp className="w-4 h-4 text-primary" />
        </TradingButton>
      </div>

      {/* To Panel */}
      <div className="bg-card border border-border rounded-2xl p-4 shadow-card mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground">To</span>
        </div>
        
        <div className="flex items-center justify-between gap-3">
          <TradingButton
            variant="ghost"
            onClick={() => setShowToTokenSelector(true)}
            className="flex items-center gap-2 px-3 py-2 h-auto hover:bg-muted/50 rounded-xl"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {toToken.symbol === 'USDC' ? '🔵' : toToken.symbol.slice(0, 1)}
              </span>
            </div>
            <span className="text-lg font-semibold">{toToken.symbol}</span>
            <ChevronDown className="w-4 h-4" />
          </TradingButton>
          
          <div className="flex-1 text-right">
            <div className="text-2xl font-semibold text-foreground">
              {toAmount || '0.00'}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              ${toAmount ? (Number(toAmount) * getTokenPrice(toToken.symbol)).toFixed(2) : '0.00'}
            </div>
          </div>
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
        <div className="space-y-3 mt-6">
          {needsApproval && (
            <TradingButton
              variant="outline"
              size="lg"
              onClick={handleApprove}
              disabled={!fromAmount || isLoading || isCheckingApproval}
              className="w-full text-base font-semibold h-14 rounded-2xl border-primary/50 hover:border-primary"
            >
              {isCheckingApproval ? 'Checking...' : `Approve ${fromToken.symbol}`}
            </TradingButton>
          )}
          <TradingButton
            variant="default"
            size="lg"
            onClick={handleSwap}
            disabled={!fromAmount || !toAmount || isLoading || needsApproval}
            className="w-full text-base font-semibold h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isLoading ? 'Processing...' : needsApproval ? 'Approve First' : 'Swap'}
          </TradingButton>
        </div>
      ) : (
        <div className="mt-6">
          <ConnectButton
            client={client}
            connectButton={{ 
              label: "Connect wallet",
              className: "w-full h-16 rounded-2xl bg-[#00ff88] hover:bg-[#00ff88]/90 text-black font-bold text-lg shadow-lg shadow-[#00ff88]/20"
            }}
            connectModal={{
              privacyPolicyUrl: "https://kerdium.vercel.app/about",
              size: "compact",
              termsOfServiceUrl: "https://kerdium.vercel.app/faq",
              title: "KERDIUM FINANCE",
            }}
            wallets={wallets}
            chain={monadTestnet}
          />
        </div>
      )}

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
    </div>
  );
};