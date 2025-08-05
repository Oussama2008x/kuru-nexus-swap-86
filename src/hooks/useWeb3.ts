
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { useToast } from '@/hooks/use-toast';
import { kuruService } from '@/services/kuruService';

declare global {
  interface Window {
    ethereum?: any;
  }
}

// Monad Testnet Configuration
const MONAD_TESTNET = {
  chainId: '0x279f', // 10143 in hex
  chainName: 'Monad Testnet',
  nativeCurrency: {
    name: 'Monad',
    symbol: 'MON',
    decimals: 18,
  },
  rpcUrls: ['https://testnet-rpc.monad.xyz'],
  blockExplorerUrls: ['https://testnet.monadexplorer.com'],
};

export const useWeb3 = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  // Check if MetaMask is available
  const isMetaMaskAvailable = typeof window !== 'undefined' && !!window.ethereum;

  // Connect to wallet
  const connectWallet = useCallback(async () => {
    if (!isMetaMaskAvailable) {
      toast({
        title: "MetaMask Required",
        description: "Please install MetaMask to connect your wallet",
        variant: "destructive"
      });
      return;
    }

    setIsConnecting(true);
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Create provider and signer
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const web3Signer = web3Provider.getSigner();
      const address = await web3Signer.getAddress();
      const network = await web3Provider.getNetwork();

      setProvider(web3Provider);
      setSigner(web3Signer);
      setAccount(address);
      setChainId(network.chainId);

      // Check if we're on Monad testnet
      if (network.chainId !== 10143) {
        toast({
          title: "Wrong Network",
          description: "Please switch to Monad Testnet for optimal experience",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Wallet Connected",
          description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)} on Monad`,
          variant: "default"
        });
      }
    } catch (error: any) {
      console.error('Failed to connect wallet:', error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  }, [isMetaMaskAvailable, toast]);

  // Disconnect wallet
  const disconnectWallet = useCallback(() => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setChainId(null);
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
      variant: "default"
    });
  }, [toast]);

  // Switch to Monad testnet
  const switchToMonad = useCallback(async () => {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: MONAD_TESTNET.chainId }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [MONAD_TESTNET],
          });
        } catch (addError: any) {
          console.error('Failed to add Monad network:', addError);
          toast({
            title: "Network Add Failed",
            description: "Failed to add Monad testnet to MetaMask",
            variant: "destructive"
          });
        }
      } else {
        console.error('Failed to switch network:', switchError);
        toast({
          title: "Network Switch Failed",
          description: "Failed to switch to Monad testnet",
          variant: "destructive"
        });
      }
    }
  }, [toast]);

  // Get MON balance
  const getMonBalance = useCallback(async (address?: string) => {
    if (!provider) return '0';
    
    try {
      const targetAddress = address || account;
      if (!targetAddress) return '0';
      
      const balance = await provider.getBalance(targetAddress);
      return ethers.utils.formatEther(balance);
    } catch (error) {
      console.error('Failed to get MON balance:', error);
      return '0';
    }
  }, [provider, account]);

  // Listen for account changes
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        setAccount(accounts[0]);
      }
    };

    const handleChainChanged = (chainId: string) => {
      setChainId(parseInt(chainId, 16));
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [disconnectWallet]);

  // Auto-connect if previously connected
  useEffect(() => {
    const checkConnection = async () => {
      if (!isMetaMaskAvailable) return;

      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          await connectWallet();
        }
      } catch (error) {
        console.error('Failed to check connection:', error);
      }
    };

    checkConnection();
  }, [isMetaMaskAvailable, connectWallet]);

  const isMonadTestnet = chainId === 10143;
  const isWrongNetwork = chainId && chainId !== 10143;

  return {
    account,
    provider,
    signer,
    chainId,
    isConnecting,
    isConnected: !!account,
    isMetaMaskAvailable,
    isMonadTestnet,
    isWrongNetwork,
    connectWallet,
    disconnectWallet,
    switchToMonad,
    getMonBalance,
    networkConfig: kuruService.getNetworkConfig()
  };
};
