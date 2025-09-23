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

  const approveToken = async (tokenAddress: string, spenderAddress: string, amount: string) => {
    const signer = await getSigner();
    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
    
    // Convert amount to wei
    const amountInWei = ethers.parseEther(amount);
    
    // Check current allowance
    const currentAllowance = await tokenContract.allowance(account?.address, spenderAddress);
    
    if (currentAllowance >= amountInWei) {
      return true; // Already approved
    }
    
    // Approve transaction
    const tx = await tokenContract.approve(spenderAddress, amountInWei);
    await tx.wait();
    
    return true;
  };

  const getAmountsOut = async (amountIn: string, path: string[]) => {
    const provider = getProvider();
    const routerContract = new ethers.Contract(CONTRACTS.router, ROUTER_ABI, provider);
    
    const amountInWei = ethers.parseEther(amountIn);
    const amounts = await routerContract.getAmountsOut(amountInWei, path);
    
    return ethers.formatEther(amounts[amounts.length - 1]);
  };

  const executeSwap = async ({ fromToken, toToken, fromAmount, slippage }: SwapParams) => {
    if (!account?.address) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    
    try {
      const signer = await getSigner();
      const routerContract = new ethers.Contract(CONTRACTS.router, ROUTER_ABI, signer);
      
      // Map token symbols to addresses from TOKENS array
      const tokenAddresses: { [key: string]: string } = {};
      TOKENS.forEach(token => {
        tokenAddresses[token.symbol] = token.address;
      });
      
      const fromTokenAddress = tokenAddresses[fromToken];
      const toTokenAddress = tokenAddresses[toToken];
      
      if (!fromTokenAddress || !toTokenAddress) {
        throw new Error('Invalid token selection');
      }
      
      // 1. Approve router to spend tokens
      toast({
        title: "Approving Token",
        description: "Please confirm the approval transaction...",
      });
      
      await approveToken(fromTokenAddress, CONTRACTS.router, fromAmount);
      
      // 2. Get expected output amount
      const path = [fromTokenAddress, toTokenAddress];
      const expectedOutput = await getAmountsOut(fromAmount, path);
      
      // 3. Calculate minimum output with slippage
      const slippageMultiplier = (100 - parseFloat(slippage)) / 100;
      const minOutput = (parseFloat(expectedOutput) * slippageMultiplier).toString();
      const minOutputWei = ethers.parseEther(minOutput);
      
      // 4. Execute swap
      toast({
        title: "Executing Swap",
        description: "Please confirm the swap transaction...",
      });
      
      const amountInWei = ethers.parseEther(fromAmount);
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes
      
      const tx = await routerContract.swapExactTokensForTokens(
        amountInWei,
        minOutputWei,
        path,
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

  return {
    executeSwap,
    getAmountsOut,
    isLoading,
  };
};