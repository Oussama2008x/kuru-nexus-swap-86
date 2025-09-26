import { useState } from 'react';
import { ethers } from 'ethers';
import { useActiveAccount } from 'thirdweb/react';
import { CONTRACTS, ROUTER_ABI, ERC20_ABI, TOKENS } from '@/lib/contracts';
import { useToast } from '@/hooks/use-toast';

export interface SwapParams {
  fromToken: string;
  toToken: string;
  fromAmount: string;
  slippage: string;
}

export const useUniswapSwap = () => {
  const [isLoading, setIsLoading] = useState(false);
  const account = useActiveAccount();
  const { toast } = useToast();

  const getProvider = () => {
    if (!window.ethereum) {
      throw new Error('MetaMask not found');
    }
    return new ethers.BrowserProvider(window.ethereum);
  };

  const getSigner = async () => {
    const provider = getProvider();
    return await provider.getSigner();
  };

  const approveToken = async (tokenAddress: string, spenderAddress: string, amount: string, decimals: number) => {
    const signer = await getSigner();
    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
    
    // Convert amount based on token decimals
    const amountInWei = ethers.parseUnits(amount, decimals);
    
    // Check current allowance
    const currentAllowance = await tokenContract.allowance(account?.address, spenderAddress);
    
    if (currentAllowance >= amountInWei) {
      return true; // Already approved
    }
    
    // Approve max amount to avoid repeated approvals
    const maxAmount = ethers.MaxUint256;
    const tx = await tokenContract.approve(spenderAddress, maxAmount);
    await tx.wait();
    
    return true;
  };

  const getAmountsOut = async (amountIn: string, path: string[], fromDecimals: number, toDecimals: number) => {
    const provider = getProvider();
    const routerContract = new ethers.Contract(CONTRACTS.router, ROUTER_ABI, provider);
    
    const amountInWei = ethers.parseUnits(amountIn, fromDecimals);
    const amounts = await routerContract.getAmountsOut(amountInWei, path);
    
    return ethers.formatUnits(amounts[amounts.length - 1], toDecimals);
  };

  const executeSwap = async ({ fromToken, toToken, fromAmount, slippage }: SwapParams) => {
    if (!account?.address) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    
    try {
      const signer = await getSigner();
      const routerContract = new ethers.Contract(CONTRACTS.router, ROUTER_ABI, signer);
      
      // Find token objects from TOKENS array
      const fromTokenObj = TOKENS.find(token => token.symbol === fromToken);
      const toTokenObj = TOKENS.find(token => token.symbol === toToken);
      
      if (!fromTokenObj || !toTokenObj) {
        throw new Error('Invalid token selection');
      }
      
      const fromTokenAddress = fromTokenObj.address;
      const toTokenAddress = toTokenObj.address;
      
      // 1. Approve router to spend tokens
      toast({
        title: "Approving Token",
        description: "Please confirm the approval transaction...",
      });
      
      await approveToken(fromTokenAddress, CONTRACTS.router, fromAmount, fromTokenObj.decimals);
      
      // 2. Determine swap path with WMON as primary base token
      const amountInWei = ethers.parseUnits(fromAmount, fromTokenObj.decimals);

      // Get WMON as the primary base token
      const wmonToken = TOKENS.find(t => t.symbol === 'WMON');
      if (!wmonToken) {
        throw new Error('WMON base token not found in token list');
      }

      const candidatePaths: string[][] = [];
      
      // Direct path first
      candidatePaths.push([fromTokenAddress, toTokenAddress]);
      
      // Via WMON (prioritized as base token)
      if (fromTokenAddress !== wmonToken.address && toTokenAddress !== wmonToken.address) {
        candidatePaths.push([fromTokenAddress, wmonToken.address, toTokenAddress]);
      }

      // Probe paths to find the first route with liquidity
      let selectedPath: string[] | null = null;
      let expectedOutput = '0';
      for (const p of candidatePaths) {
        try {
          const amounts = await routerContract.getAmountsOut(amountInWei, p);
          const outWei = amounts[amounts.length - 1];
          // Guard against zero outputs
          if (outWei > 0n) {
            expectedOutput = ethers.formatUnits(outWei, toTokenObj.decimals);
            selectedPath = p;
            break;
          }
        } catch {
          // try next path
        }
      }

      if (!selectedPath) {
        throw new Error('No route with sufficient liquidity between selected tokens');
      }

      // 3. Calculate minimum output with slippage
      const slippageMultiplier = (100 - parseFloat(slippage)) / 100;
      const minOutput = (parseFloat(expectedOutput) * slippageMultiplier).toString();
      const minOutputWei = ethers.parseUnits(minOutput, toTokenObj.decimals);

      // 4. Execute swap
      toast({
        title: "Executing Swap",
        description: "Please confirm the swap transaction...",
      });

      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

      const tx = await routerContract.swapExactTokensForTokens(
        amountInWei,
        minOutputWei,
        selectedPath,
        account.address,
        deadline
      );
      
      toast({
        title: "Transaction Submitted",
        description: "Waiting for confirmation...",
      });
      
      const receipt = await tx.wait();
      
      toast({
        title: "Swap Successful!",
        description: `Swapped ${fromAmount} ${fromToken} for ${toToken}`,
      });
      
      return {
        success: true,
        txHash: receipt.hash,
        expectedOutput,
        minOutput,
      };
      
    } catch (error: any) {
      console.error('Swap error:', error);
      
      let errorMessage = 'Swap failed';
      
      if (error.code === 'ACTION_REJECTED') {
        errorMessage = 'Transaction rejected by user';
      } else if (error.message?.includes('insufficient')) {
        errorMessage = 'Insufficient balance or liquidity';
      } else if (error.message?.includes('slippage')) {
        errorMessage = 'Slippage tolerance exceeded';
      } else if (error.message?.includes('TRANSFER_FROM_FAILED')) {
        errorMessage = 'Token transfer failed - check allowance';
      } else if (error.message?.includes('EXPIRED')) {
        errorMessage = 'Transaction expired';
      } else if (error.message?.includes('Pair does not exist')) {
        errorMessage = 'Trading pair does not exist';
      }
      
      toast({
        title: "Swap Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const addLiquidity = async (tokenA: string, tokenB: string, amountA: string, amountB: string) => {
    if (!account?.address) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    
    try {
      const signer = await getSigner();
      const routerContract = new ethers.Contract(CONTRACTS.router, ROUTER_ABI, signer);
      
      const tokenAObj = TOKENS.find(token => token.symbol === tokenA);
      const tokenBObj = TOKENS.find(token => token.symbol === tokenB);
      
      if (!tokenAObj || !tokenBObj) {
        throw new Error('Invalid token selection');
      }

      // Only approve non-WMON tokens when WMON is involved
      if (tokenA !== 'WMON') {
        await approveToken(tokenAObj.address, CONTRACTS.router, amountA, tokenAObj.decimals);
      }
      if (tokenB !== 'WMON') {
        await approveToken(tokenBObj.address, CONTRACTS.router, amountB, tokenBObj.decimals);
      }

      const amountAWei = ethers.parseUnits(amountA, tokenAObj.decimals);
      const amountBWei = ethers.parseUnits(amountB, tokenBObj.decimals);
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

      const tx = await routerContract.addLiquidity(
        tokenAObj.address,
        tokenBObj.address,
        amountAWei,
        amountBWei,
        0, // amountAMin
        0, // amountBMin
        account.address,
        deadline
      );

      await tx.wait();
      
      toast({
        title: "Liquidity Added!",
        description: `Added liquidity for ${tokenA}/${tokenB} pair`,
      });

      return { success: true, txHash: tx.hash };
    } catch (error: any) {
      console.error('Add liquidity error:', error);
      
      toast({
        title: "Add Liquidity Failed",
        description: error.message || 'Failed to add liquidity',
        variant: "destructive",
      });

      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Create liquidity pairs for all tokens using WMON as base
  const createAllLiquidityPairs = async (customAmounts: Record<string, { tokenAmount: string, wmonAmount: string }>) => {
    if (!account?.address) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    
    try {
      const wmonToken = TOKENS.find(t => t.symbol === 'WMON');
      if (!wmonToken) {
        throw new Error('WMON base token not found');
      }

      const results = [];
      
      for (const token of TOKENS) {
        // Skip WMON itself
        if (token.symbol === 'WMON') continue;
        
        const pairKey = token.symbol;
        const amounts = customAmounts[pairKey];
        
        if (amounts) {
          try {
            console.log(`Creating liquidity pair: ${token.symbol}/WMON`);
            const result = await addLiquidity(
              token.symbol,
              'WMON',
              amounts.tokenAmount,
              amounts.wmonAmount
            );
            results.push({ token: token.symbol, success: result.success, txHash: result.txHash });
          } catch (error: any) {
            console.error(`Failed to create ${token.symbol}/WMON pair:`, error);
            results.push({ token: token.symbol, success: false, error: error.message });
          }
        }
      }

      toast({
        title: "Liquidity Creation Complete",
        description: `Created ${results.filter(r => r.success).length} out of ${results.length} pairs`,
      });

      return results;
    } catch (error: any) {
      console.error('Create all liquidity pairs failed:', error);
      
      toast({
        title: "Liquidity Creation Failed",
        description: error.message || 'Failed to create liquidity pairs',
        variant: "destructive",
      });
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Quote helper using same routing logic (WMON as base)
  const quoteSwap = async (fromToken: string, toToken: string, amountIn: string) => {
    const provider = getProvider();
    const routerContract = new ethers.Contract(CONTRACTS.router, ROUTER_ABI, provider);

    const fromTokenObj = TOKENS.find(t => t.symbol === fromToken);
    const toTokenObj = TOKENS.find(t => t.symbol === toToken);
    if (!fromTokenObj || !toTokenObj) throw new Error('Invalid token selection');

    const wmonToken = TOKENS.find(t => t.symbol === 'WMON');
    if (!wmonToken) throw new Error('WMON base token not found');

    if (!amountIn || Number(amountIn) <= 0) return { amountOut: '0', path: [fromTokenObj.address, toTokenObj.address] };

    const amountInWei = ethers.parseUnits(amountIn, fromTokenObj.decimals);

    const candidatePaths: string[][] = [[fromTokenObj.address, toTokenObj.address]];
    if (fromTokenObj.address !== wmonToken.address && toTokenObj.address !== wmonToken.address) {
      candidatePaths.push([fromTokenObj.address, wmonToken.address, toTokenObj.address]);
    }

    for (const p of candidatePaths) {
      try {
        const amounts = await routerContract.getAmountsOut(amountInWei, p);
        const outWei = amounts[amounts.length - 1];
        if (outWei > 0n) {
          return { amountOut: ethers.formatUnits(outWei, toTokenObj.decimals), path: p };
        }
      } catch {}
    }

    return { amountOut: '0', path: candidatePaths[0] };
  };

  return {
    executeSwap,
    getAmountsOut,
    addLiquidity,
    createAllLiquidityPairs,
    quoteSwap,
    isLoading,
  };
};