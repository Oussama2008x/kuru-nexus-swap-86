import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { ArrowUpDown, Settings, Zap, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TradingButton } from "@/components/ui/trading-button";
import { TokenSelector } from './TokenSelector';
import { SwapInputField } from './SwapInputField';
import { SwapStats } from './SwapStats';
import { useKuruSwap } from '@/hooks/useKuruSwap';
import { useWeb3 } from '@/hooks/useWeb3';
import { Badge } from "@/components/ui/badge";

export const SwapInterface: React.FC = () => {
  const { 
    account, 
    isConnected, 
    signer, 
    provider,
    isMonadTestnet, 
    isWrongNetwork, 
    switchToMonad,
    networkConfig 
  } = useWeb3();
  
  const { 
    tokens, 
    quote, 
    loading, 
    isSwapping, 
    sdkInitialized,
    poolsLoaded,
    initializationError,
    getQuote, 
    executeSwap,
    getTokenBalance
  } = useKuruSwap(signer);

  const [fromToken, setFromToken] = useState<any>(null);
  const [toToken, setToToken] = useState<any>(null);
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [tokenBalances, setTokenBalances] = useState<Record<string, string>>({});

  // Set default tokens when available and load balances
  useEffect(() => {
    if (tokens.length > 0 && !fromToken) {
      setFromToken(tokens[0]);
      setToToken(tokens[1] || tokens[0]);
    }
  }, [tokens, fromToken]);

  // Load token balances when account or tokens change
  useEffect(() => {
    const loadBalances = async () => {
      if (!account || !tokens.length) return;

      const balances: Record<string, string> = {};
      
      for (const token of tokens) {
        try {
          let balance = '0';
          if (token.address === ethers.constants.AddressZero || token.symbol === 'MON') {
            // For native MON, use the Web3 provider directly
            if (provider) {
              const nativeBalance = await provider.getBalance(account);
              balance = ethers.utils.formatEther(nativeBalance);
            }
          } else {
            // For ERC20 tokens, use the service
            balance = await getTokenBalance(token.address, account);
          }
          balances[token.address] = parseFloat(balance).toFixed(6);
        } catch (error) {
          console.error(`Error fetching balance for ${token.symbol}:`, error);
          balances[token.address] = '0';
        }
      }
      
      setTokenBalances(balances);
    };

    loadBalances();
    // Refresh balances every 10 seconds
    const interval = setInterval(loadBalances, 10000);
    return () => clearInterval(interval);
  }, [account, tokens, provider, getTokenBalance]);

  // Get quote when input changes
  useEffect(() => {
    if (fromAmount && parseFloat(fromAmount) > 0 && fromToken && toToken) {
      const timer = setTimeout(() => {
        getQuote(fromToken, toToken, fromAmount);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setToAmount('');
    }
  }, [fromAmount, fromToken, toToken, getQuote]);

  // Update to amount when quote changes
  useEffect(() => {
    if (quote) {
      setToAmount(quote.outputAmount);
    }
  }, [quote]);

  const handleSwapTokens = () => {
    if (!fromToken || !toToken) return;
    
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = async () => {
    if (!isConnected || !account || !fromToken || !toToken) {
      return;
    }

    try {
      await executeSwap(fromToken, toToken, fromAmount, account);
      setFromAmount('');
      setToAmount('');
    } catch (error) {
      console.error('Swap failed:', error);
    }
  };

  const isValidSwap = fromAmount && toAmount && parseFloat(fromAmount) > 0 && fromToken && toToken;
  const canSwap = isValidSwap && isConnected && sdkInitialized && !loading && !isSwapping;

  if (!tokens.length) {
    return (
      <div className="w-full max-w-md mx-auto">
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardContent className="p-8 text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading tokens...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="bg-gradient-card border-0 shadow-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Swap
            </CardTitle>
            <div className="flex items-center gap-2">
              {/* Network Status */}
              <Badge 
                variant={isMonadTestnet ? "default" : "destructive"}
                className="text-xs"
              >
                {isMonadTestnet ? 'Monad' : 'Wrong Network'}
              </Badge>
              
              {/* Pool Status */}
              <Badge 
                variant={poolsLoaded ? "default" : sdkInitialized ? "secondary" : "destructive"}
                className="text-xs"
              >
                {poolsLoaded ? 'Pools' : sdkInitialized ? 'Fallback' : 'Offline'}
              </Badge>
              
              <TradingButton variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </TradingButton>
            </div>
          </div>
          
          {/* Pool Status Info */}
          {sdkInitialized && !poolsLoaded && (
            <div className="text-xs text-muted-foreground bg-muted/20 p-2 rounded-lg">
              Using Uniswap fallback - enhanced pricing available
            </div>
          )}
          
          {initializationError && (
            <div className="text-xs text-warning bg-warning/10 p-2 rounded-lg">
              SDK Issue: {initializationError}
            </div>
          )}
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Network Warning */}
          {isWrongNetwork && (
            <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-warning">Wrong Network</p>
                  <p className="text-xs text-warning/80">Switch to Monad Testnet for optimal trading</p>
                </div>
                <TradingButton 
                  variant="outline" 
                  size="sm"
                  onClick={switchToMonad}
                  className="border-warning text-warning hover:bg-warning/10"
                >
                  Switch
                </TradingButton>
              </div>
            </div>
          )}

          {/* From Token Input */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>From</span>
              <span>Balance: {tokenBalances[fromToken?.address] || '0.0'} {fromToken?.symbol}</span>
            </div>
            <div className="relative">
              <SwapInputField
                value={fromAmount}
                onChange={setFromAmount}
                placeholder="0.0"
                className="pr-32"
              />
              <div className="absolute right-2 top-2">
                <TokenSelector
                  selectedToken={fromToken}
                  onTokenSelect={setFromToken}
                  tokens={tokens}
                />
              </div>
            </div>
          </div>

          {/* Swap Direction Button */}
          <div className="flex justify-center">
            <TradingButton
              variant="ghost"
              size="icon"
              onClick={handleSwapTokens}
              className="rounded-full border border-border bg-background hover:bg-accent"
              disabled={!fromToken || !toToken}
            >
              <ArrowUpDown className="w-4 h-4" />
            </TradingButton>
          </div>

          {/* To Token Input */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>To</span>
              <span>Balance: {tokenBalances[toToken?.address] || '0.0'} {toToken?.symbol}</span>
            </div>
            <div className="relative">
              <SwapInputField
                value={loading ? 'Loading...' : toAmount}
                onChange={setToAmount}
                placeholder={loading ? 'Getting quote...' : '0.0'}
                className="pr-32"
                readOnly
              />
              <div className="absolute right-2 top-2">
                <TokenSelector
                  selectedToken={toToken}
                  onTokenSelect={setToToken}
                  tokens={tokens}
                />
              </div>
            </div>
          </div>

          {/* Swap Stats */}
          {quote && fromAmount && toAmount && fromToken && toToken && (
            <SwapStats
              fromToken={fromToken}
              toToken={toToken}
              fromAmount={fromAmount}
              toAmount={toAmount}
              quote={quote}
            />
          )}

          {/* Swap Button */}
          <TradingButton
            variant={!isConnected ? "secondary" : "trading"}
            size="xl"
            className="w-full"
            onClick={!isConnected ? () => {} : handleSwap}
            disabled={!canSwap}
          >
            {!isConnected ? (
              'Connect Wallet to Swap'
            ) : !sdkInitialized ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Initializing Kuru SDK...
              </div>
            ) : isSwapping ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Swapping...
              </div>
            ) : loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Getting Quote...
              </div>
            ) : initializationError ? (
              'Swap (Fallback Mode)'
            ) : (
              'Swap'
            )}
          </TradingButton>

          {/* Explorer Link */}
          {isMonadTestnet && (
            <div className="flex justify-center">
              <TradingButton
                variant="link"
                size="sm"
                onClick={() => window.open(networkConfig.explorerUrl, '_blank')}
                className="text-xs text-muted-foreground hover:text-primary"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                View on Monad Explorer
              </TradingButton>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
