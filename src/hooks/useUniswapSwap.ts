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
      
      // 2. Determine swap path dynamically (direct, via wrapped token, or via USDC)
      const amountInWei = ethers.parseUnits(fromAmount, fromTokenObj.decimals);

      // Ask router for its canonical wrapped native token (often named WETH in ABI)
      let wrappedAddress: string | null = null;
      try {
        wrappedAddress = await routerContract.WETH();
      } catch {
        // Fallback to WMON from TOKENS if router.WETH() not available
        const wmonToken = TOKENS.find(t => t.symbol === 'WMON');
        wrappedAddress = wmonToken?.address ?? null;
      }

      // Candidate intermediary like USDC
      const usdc = TOKENS.find(t => t.symbol === 'USDC');

      const candidatePaths: string[][] = [];
      // Direct
      candidatePaths.push([fromTokenAddress, toTokenAddress]);
      // Via wrapped
      if (wrappedAddress && fromTokenAddress !== wrappedAddress && toTokenAddress !== wrappedAddress) {
        candidatePaths.push([fromTokenAddress, wrappedAddress, toTokenAddress]);
      }
      // Via USDC
      if (usdc && usdc.address !== fromTokenAddress && usdc.address !== toTokenAddress) {
        candidatePaths.push([fromTokenAddress, usdc.address, toTokenAddress]);
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

      // Approve both tokens
      await approveToken(tokenAObj.address, CONTRACTS.router, amountA, tokenAObj.decimals);
      await approveToken(tokenBObj.address, CONTRACTS.router, amountB, tokenBObj.decimals);

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

  return {
    executeSwap,
    getAmountsOut,
    addLiquidity,
    isLoading,
  };
};