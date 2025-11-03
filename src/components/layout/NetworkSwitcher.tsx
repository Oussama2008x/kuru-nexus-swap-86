import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';
import { useNetwork } from '@/contexts/NetworkContext';
import { NetworkType } from '@/lib/thirdweb';
import monadLogo from '@/assets/logo.png';
import ethereumLogo from '@/assets/networks/ethereum.png';
import { useActiveAccount, useSwitchActiveWalletChain } from 'thirdweb/react';
import { SUPPORTED_NETWORKS } from '@/lib/thirdweb';
import { useToast } from '@/hooks/use-toast';

interface NetworkSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
}

const NETWORK_INFO = {
  MONAD: {
    name: 'Monad Testnet',
    logo: monadLogo,
    color: 'from-purple-500 to-blue-500',
  },
  ETHEREUM: {
    name: 'Ethereum',
    logo: ethereumLogo,
    color: 'from-blue-500 to-blue-600',
  },
} as const;

export const NetworkSwitcher: React.FC<NetworkSwitcherProps> = ({ isOpen, onClose }) => {
  const { currentNetwork, setCurrentNetwork } = useNetwork();
  const account = useActiveAccount();
  const switchChain = useSwitchActiveWalletChain();
  const { toast } = useToast();
  const [isSwitching, setIsSwitching] = useState(false);

  const handleNetworkSelect = async (network: NetworkType) => {
    if (network === currentNetwork) {
      onClose();
      return;
    }

    setIsSwitching(true);
    try {
      // Switch wallet chain if connected
      if (account) {
        await switchChain(SUPPORTED_NETWORKS[network]);
      }
      
      // Update app network state
      setCurrentNetwork(network);
      
      toast({
        title: "Network Switched",
        description: `Switched to ${NETWORK_INFO[network].name}`,
      });
      
      onClose();
    } catch (error: any) {
      console.error('Network switch error:', error);
      toast({
        title: "Switch Failed",
        description: error.message || "Failed to switch network",
        variant: "destructive",
      });
    } finally {
      setIsSwitching(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-sm">
        <DialogHeader className="border-b pb-4">
          <DialogTitle>Select Network</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          {(Object.keys(NETWORK_INFO) as NetworkType[]).map((network) => {
            const info = NETWORK_INFO[network];
            const isSelected = currentNetwork === network;

            return (
              <Button
                key={network}
                variant="ghost"
                onClick={() => handleNetworkSelect(network)}
                disabled={isSwitching}
                className={`w-full justify-between p-4 h-auto ${
                  isSelected ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={info.logo} 
                    alt={info.name} 
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-foreground">{info.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {network === 'ETHEREUM' ? 'Chain ID: 1' : 'Chain ID: 41454'}
                    </div>
                  </div>
                </div>
                
                {isSelected && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </Button>
            );
          })}
        </div>

        {/* Network Status */}
        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <div className="text-xs text-muted-foreground text-center">
            {account ? (
              <>Connected wallet will switch to selected network</>
            ) : (
              <>Connect wallet to use selected network</>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};