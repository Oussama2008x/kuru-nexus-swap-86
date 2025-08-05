import { useState, useEffect, useCallback } from 'react';
import { kuruService, type KuruToken, type KuruQuote } from '@/services/kuruService';
import { wrappingService } from '@/services/wrappingService';
import { useToast } from '@/hooks/use-toast';
import { ethers } from 'ethers';

export const useKuruSwap = (signer?: ethers.Signer) => {
  const [tokens, setTokens] = useState<KuruToken[]>([]);
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState<KuruQuote | null>(null);
  const [isSwapping, setIsSwapping] = useState(false);
  const [sdkInitialized, setSdkInitialized] = useState(false);
  const [poolsLoaded, setPoolsLoaded] = useState(false);
  const [initializationError, setInitializationError] = useState<string | null>(null);
  const { toast } = useToast();

  // Initialize Kuru SDK when signer is available
  useEffect(() => {
    const initializeSDK = async () => {
      if (signer && !sdkInitialized) {
        try {
          setInitializationError(null);
          await kuruService.initialize(signer);
          setSdkInitialized(true);
          setPoolsLoaded(kuruService.isPoolsLoaded());
          
          const poolStatus = kuruService.isPoolsLoaded() ? 'with pools' : 'without pools (fallback mode)';
          console.log(`Kuru SDK initialized successfully ${poolStatus}`);
          
          if (!kuruService.isPoolsLoaded()) {
            toast({
              title: "Limited Pool Data",
              description: "Using fallback pricing. Wrapping/unwrapping still available.",
              variant: "default"
            });
          }
        } catch (error: any) {
          console.error('Failed to initialize Kuru SDK:', error);
          setInitializationError(error.message);
          setSdkInitialized(true); // Still allow fallback mode
          setPoolsLoaded(false);
          
          toast({
            title: "SDK Initialization Issue",
            description: "Using fallback mode. Wrapping/unwrapping available.",
            variant: "destructive"
          });
        }
      }
    };

    initializeSDK();
  }, [signer, sdkInitialized, toast]);

  // Load available tokens
  useEffect(() => {
    const loadTokens = async () => {
      try {
        const availableTokens = await kuruService.getTokens();
        setTokens(availableTokens);
      } catch (error) {
        console.error('Failed to load tokens:', error);
        toast({
          title: "Error",
          description: "Failed to load available tokens",
          variant: "destructive"
        });
      }
    };

    loadTokens();
  }, [toast]);

  // Get quote for swap with wrapping detection
  const getQuote = useCallback(async (
    tokenIn: KuruToken,
    tokenOut: KuruToken,
    amountIn: string
  ) => {
    if (!amountIn || parseFloat(amountIn) <= 0) {
      setQuote(null);
      return;
    }

    setLoading(true);
    try {
      const newQuote = await kuruService.getQuote(tokenIn, tokenOut, amountIn);
      setQuote(newQuote);
      
      // Log quote source for debugging
      if (newQuote) {
        let source = 'fallback pricing';
        if (wrappingService.isWrappingOperation(tokenIn, tokenOut)) {
          source = 'wrapping operation (1:1)';
        } else if (poolsLoaded) {
          source = 'Kuru pools';
        }
        console.log(`Quote obtained from: ${source}`);
      }
    } catch (error: any) {
      console.error('Failed to get quote:', error);
      
      // More specific error messages based on error type
      let errorMessage = "Failed to get swap quote";
      if (error.message?.includes('pool')) {
        errorMessage = "No liquidity pools available for this token pair";
      } else if (error.message?.includes('network')) {
        errorMessage = "Network connection issue. Please try again.";
      } else if (error.message?.includes('contract')) {
        errorMessage = "Token contract not found or invalid";
      }
      
      toast({
        title: "Quote Error",
        description: errorMessage,
        variant: "destructive"
      });
      setQuote(null);
    } finally {
      setLoading(false);
    }
  }, [toast, poolsLoaded]);

  // Execute swap with wrapping detection and better error handling
  const executeSwap = useCallback(async (
    tokenIn: KuruToken,
    tokenOut: KuruToken,
    amountIn: string,
    recipient: string
  ) => {
    if (!quote) {
      toast({
        title: "Error",
        description: "No quote available for swap",
        variant: "destructive"
      });
      return;
    }

    if (!sdkInitialized) {
      toast({
        title: "Error",
        description: "SDK not initialized. Please reconnect your wallet.",
        variant: "destructive"
      });
      return;
    }

    setIsSwapping(true);
    try {
      const txHash = await kuruService.executeSwap({
        tokenIn,
        tokenOut,
        amountIn,
        expectedOutput: quote?.outputAmount || '0',
        slippage: 0.5,
        recipient
      });

      // Check if this was a wrapping operation for better messaging
      const isWrapping = wrappingService.isWrappingOperation(tokenIn, tokenOut);
      const operationType = isWrapping ? 
        (tokenIn.symbol === 'MON' ? 'Wrap' : 'Unwrap') : 'Swap';

      toast({
        title: `${operationType} Successful`,
        description: `Transaction: ${txHash.slice(0, 10)}...`,
        variant: "default"
      });

      setQuote(null);
      return txHash;
    } catch (error: any) {
      console.error('Failed to execute swap:', error);
      
      let errorMessage = "Transaction failed or was rejected";
      if (error.message?.includes('pool')) {
        errorMessage = "Insufficient liquidity for this swap";
      } else if (error.message?.includes('slippage')) {
        errorMessage = "Price moved too much. Try increasing slippage tolerance.";
      } else if (error.message?.includes('allowance')) {
        errorMessage = "Token approval failed. Please try again.";
      } else if (error.message?.includes('wrap') || error.message?.includes('unwrap')) {
        errorMessage = error.message; // Use specific wrapping error message
      } else if (error.message?.includes('contract')) {
        errorMessage = "Token contract interaction failed. Check token addresses.";
      }
      
      toast({
        title: "Operation Failed",
        description: errorMessage,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsSwapping(false);
    }
  }, [quote, sdkInitialized, toast]);

  // Get token balance with enhanced error handling
  const getTokenBalance = useCallback(async (
    tokenAddress: string,
    walletAddress: string
  ) => {
    try {
      return await kuruService.getTokenBalance(tokenAddress, walletAddress);
    } catch (error) {
      console.error(`Failed to get token balance for ${tokenAddress}:`, error);
      return '0';
    }
  }, []);

  // Subscribe to orderbook updates
  const subscribeToOrderbook = useCallback((tokenPair: string, callback: (data: any) => void) => {
    if (sdkInitialized) {
      kuruService.subscribeToOrderbook(tokenPair, callback);
    }
  }, [sdkInitialized]);

  return {
    tokens,
    quote,
    loading,
    isSwapping,
    sdkInitialized,
    poolsLoaded,
    initializationError,
    getQuote,
    executeSwap,
    getTokenBalance,
    subscribeToOrderbook
  };
};
