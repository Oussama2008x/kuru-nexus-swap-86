import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useActiveAccount } from 'thirdweb/react';
import { ERC20_ABI, TOKENS } from '@/lib/contracts';

export const useTokenBalance = (tokenSymbol: string) => {
  const [balance, setBalance] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const account = useActiveAccount();

  const getProvider = () => {
    if (!window.ethereum) {
      throw new Error('MetaMask not found');
    }
    return new ethers.BrowserProvider(window.ethereum);
  };

  const fetchBalance = async () => {
    if (!account?.address || !tokenSymbol) return;

    setIsLoading(true);
    try {
      const provider = getProvider();
      const token = TOKENS.find(t => t.symbol === tokenSymbol);
      
      if (!token) {
        setBalance('0');
        return;
      }

      const tokenContract = new ethers.Contract(token.address, ERC20_ABI, provider);
      const balanceWei = await tokenContract.balanceOf(account.address);
      
      // Format balance based on token decimals
      const formattedBalance = ethers.formatUnits(balanceWei, token.decimals);
      setBalance(formattedBalance);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance('0');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [account?.address, tokenSymbol]);

  return {
    balance,
    isLoading,
    refetch: fetchBalance,
  };
};