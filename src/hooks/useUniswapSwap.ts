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

  const checkAllowance = async (tokenAddress: string, spenderAddress: string, amount: string, decimals: number) => {
    const provider = getProvider();
    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    
    const amountInWei = ethers.parseUnits(amount, decimals);
    const currentAllowance = await tokenContract.allowance(account?.address, spenderAddress);
    
    return currentAllowance >= amountInWei;
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
    
    // Set gas price to 0.014 MON and gas limit
    const gasPrice = ethers.parseUnits('0.014', 18);
    const gasLimit = 300000;
    
    const tx = await tokenContract.approve(spenderAddress, maxAmount, { gasPrice, gasLimit });
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

      // Check for placeholder addresses
      if (fromTokenObj.address.startsWith('0x1234') || fromTokenObj.address.startsWith('0x0987') ||
          toTokenObj.address.startsWith('0x1234') || toTokenObj.address.startsWith('0x0987')) {
        throw new Error('Cannot swap with placeholder token addresses. Please use real token addresses.');
      }
      
      const fromTokenAddress = fromTokenObj.address;
      const toTokenAddress = toTokenObj.address;
      
      // 1. Approve router to spend tokens (only for non-WMON tokens if WMON is involved)
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
            console.log('Selected path:', p, 'Expected output:', expectedOutput);
            break;
          }
        } catch (error) {
          console.warn('Path failed:', p, error);
        }
      }

      if (!selectedPath) {
        throw new Error('No route with sufficient liquidity between selected tokens. You may need to add liquidity first.');
      }

      // 3. Calculate minimum output with slippage
      const slippageMultiplier = (100 - parseFloat(slippage)) / 100;
      const minOutput = (parseFloat(expectedOutput) * slippageMultiplier).toString();
      const minOutputWei = ethers.parseUnits(minOutput, toTokenObj.decimals);

      console.log('Swap details:', {
        fromAmount,
        expectedOutput,
        minOutput,
        slippage,
        path: selectedPath
      });

      // 4. Execute swap
      toast({
        title: "Executing Swap",
        description: "Please confirm the swap transaction...",
      });

      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

      // Set gas price to 0.014 MON and gas limit for Monad Testnet
      const gasPrice = ethers.parseUnits('0.014', 18);
      const gasLimit = 300000;
      
      const tx = await routerContract.swapExactTokensForTokens(
        amountInWei,
        minOutputWei,
        selectedPath,
        account.address,
        deadline,
        { gasPrice, gasLimit }
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
        errorMessage = 'Trading pair does not exist - you may need to add liquidity first';
      } else if (error.message?.includes('placeholder')) {
        errorMessage = error.message;
      } else if (error.message?.includes('No route')) {
        errorMessage = error.message;
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

      // Set gas price to 0.014 MON and gas limit for Monad Testnet
      const gasPrice = ethers.parseUnits('0.014', 18);
      const gasLimit = 300000;

      const tx = await routerContract.addLiquidity(
        tokenAObj.address,
        tokenBObj.address,
        amountAWei,
        amountBWei,
        0, // amountAMin
        0, // amountBMin
        account.address,
        deadline,
        { gasPrice, gasLimit }
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
    try {
      console.log('quoteSwap called:', { fromToken, toToken, amountIn });
      const provider = getProvider();
      const routerContract = new ethers.Contract(CONTRACTS.router, ROUTER_ABI, provider);

      let fromTokenObj = TOKENS.find(t => t.symbol === fromToken);
      let toTokenObj = TOKENS.find(t => t.symbol === toToken);
      
      // Handle MON -> WMON conversion for routing
      const wmonToken = TOKENS.find(t => t.symbol === 'WMON');
      if (!wmonToken) {
        console.error('WMON base token not found');
        return { amountOut: '0', path: [] };
      }

      // If fromToken is MON, use WMON for routing
      if (fromToken === 'MON') {
        console.log('Converting MON to WMON for routing');
        fromTokenObj = wmonToken;
      }
      
      // If toToken is MON, use WMON for routing
      if (toToken === 'MON') {
        console.log('Converting MON to WMON for routing');
        toTokenObj = wmonToken;
      }
      
      if (!fromTokenObj || !toTokenObj) {
        console.error('Token not found:', { fromToken, toToken });
        return { amountOut: '0', path: [] };
      }

      // Check for placeholder addresses
      if (fromTokenObj.address.startsWith('0x1234') || fromTokenObj.address.startsWith('0x0987') ||
          toTokenObj.address.startsWith('0x1234') || toTokenObj.address.startsWith('0x0987')) {
        console.warn('Cannot quote swap with placeholder token addresses');
        return { amountOut: '0', path: [] };
      }

      if (!amountIn || Number(amountIn) <= 0) {
        return { amountOut: '0', path: [fromTokenObj.address, toTokenObj.address] };
      }

      const amountInWei = ethers.parseUnits(amountIn, fromTokenObj.decimals);
      console.log('Amount in Wei:', amountInWei.toString());

      // Try direct path first
      const candidatePaths: string[][] = [[fromTokenObj.address, toTokenObj.address]];
      
      // Add WMON intermediate path if needed
      if (fromTokenObj.address !== wmonToken.address && toTokenObj.address !== wmonToken.address) {
        candidatePaths.push([fromTokenObj.address, wmonToken.address, toTokenObj.address]);
      }

      console.log('Trying paths:', candidatePaths);

      for (const p of candidatePaths) {
        try {
          console.log('Attempting path:', p);
          const amounts = await routerContract.getAmountsOut(amountInWei, p);
          console.log('Amounts returned:', amounts.map((a: bigint) => a.toString()));
          const outWei = amounts[amounts.length - 1];
          if (outWei > 0n) {
            const amountOut = ethers.formatUnits(outWei, toTokenObj.decimals);
            console.log('Quote successful:', { fromToken, toToken, amountIn, amountOut, path: p });
            return { amountOut, path: p };
          }
        } catch (error: any) {
          console.error('Path failed:', p, 'Error:', error?.message || error);
        }
      }

      console.warn('No valid quote found for:', { fromToken, toToken, amountIn });
      return { amountOut: '0', path: candidatePaths[0] };
    } catch (error: any) {
      console.error('Quote error:', error?.message || error);
      return { amountOut: '0', path: [] };
    }
  };

  return {
    executeSwap,
    getAmountsOut,
    addLiquidity,
    createAllLiquidityPairs,
    quoteSwap,
    checkAllowance,
    approveToken,
    isLoading,
  };
};