import React, { createContext, useContext, useState, useEffect } from 'react';
import { SUPPORTED_NETWORKS, NetworkType } from '@/lib/thirdweb';

interface NetworkContextType {
  currentNetwork: NetworkType;
  setCurrentNetwork: (network: NetworkType) => void;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentNetwork, setCurrentNetwork] = useState<NetworkType>('MONAD');

  // Load network preference from localStorage
  useEffect(() => {
    const savedNetwork = localStorage.getItem('selectedNetwork') as NetworkType;
    if (savedNetwork && SUPPORTED_NETWORKS[savedNetwork]) {
      setCurrentNetwork(savedNetwork);
    }
  }, []);

  // Save network preference to localStorage
  const handleSetNetwork = (network: NetworkType) => {
    setCurrentNetwork(network);
    localStorage.setItem('selectedNetwork', network);
  };

  return (
    <NetworkContext.Provider value={{ currentNetwork, setCurrentNetwork: handleSetNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within NetworkProvider');
  }
  return context;
};