import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, RotateCcw, ChevronDown, Settings, Info, ArrowDownUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ConnectButton, useActiveAccount, useSwitchActiveWalletChain } from "thirdweb/react";
import { client, wallets, SUPPORTED_NETWORKS } from '@/lib/thirdweb';
import { useToast } from '@/hooks/use-toast';
import { useNetwork } from '@/contexts/NetworkContext';
import { TOKENS } from '@/lib/contracts';
import { TOKENS_ETHEREUM } from '@/lib/contracts-ethereum';
import ethLogo from '@/assets/tokens/eth.png';
import usdcLogo from '@/assets/tokens/usdc.png';
import wbtcLogo from '@/assets/tokens/wbtc.png';
import wethLogo from '@/assets/tokens/weth.png';
import bitcoinLogo from '@/assets/tokens/bitcoin.png';
import monadLogo from '@/assets/networks/monad.png';
import ethereumLogo from '@/assets/networks/ethereum.png';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// Token logo mapping
const getTokenLogo = (symbol: string) => {
  const logoMap: Record<string, string> = {
    'WBTC': wbtcLogo,
    'BTC': bitcoinLogo,
    'ETH': ethLogo,
    'WETH': wethLogo,
    'USDC': usdcLogo,
    'USDT': usdcLogo,
    'MON': monadLogo,
  };
  return logoMap[symbol];
};

const Pool = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [token1, setToken1] = useState<any>(null);
  const [token2, setToken2] = useState<any>(null);
  const [token1Amount, setToken1Amount] = useState('');
  const [token2Amount, setToken2Amount] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [slippage, setSlippage] = useState('2.50');
  const [deadline, setDeadline] = useState('30');
  const [tokenSelectorOpen, setTokenSelectorOpen] = useState(false);
  const [selectingTokenNumber, setSelectingTokenNumber] = useState<1 | 2>(1);
  const [networkSwitcherOpen, setNetworkSwitcherOpen] = useState(false);
  
  const account = useActiveAccount();
  const { toast } = useToast();
  const { currentNetwork, setCurrentNetwork } = useNetwork();
  const switchChain = useSwitchActiveWalletChain();

  // Get tokens based on selected network
  const networkTokens = currentNetwork === 'MONAD' ? TOKENS : TOKENS_ETHEREUM;
  const allTokens = currentNetwork === 'MONAD' 
    ? [
        { name: "MONAD", symbol: "MON", decimals: 18, address: "0x0000000000000000000000000000000000000000" },
        ...networkTokens
      ]
    : [
        { name: "Ethereum", symbol: "ETH", decimals: 18, address: "0x0000000000000000000000000000000000000000" },
        ...networkTokens
      ];

  const networkInfo = {
    MONAD: { name: 'Monad Testnet', logo: monadLogo },
    ETHEREUM: { name: 'Ethereum Mainnet', logo: ethereumLogo },
  };

  const handleReset = () => {
    setCurrentStep(1);
    setToken1(null);
    setToken2(null);
    setToken1Amount('');
    setToken2Amount('');
  };

  const handleContinue = () => {
    if (token1 && token2) {
      setCurrentStep(2);
    } else {
      toast({
        title: "Select Both Tokens",
        description: "Please select both tokens to continue",
        variant: "destructive",
      });
    }
  };

  const handleNetworkSwitch = async (network: typeof currentNetwork) => {
    if (network === currentNetwork) return;

    try {
      if (account) {
        await switchChain(SUPPORTED_NETWORKS[network]);
      }
      setCurrentNetwork(network);
      // Reset tokens when switching networks
      setToken1(null);
      setToken2(null);
      toast({
        title: "Network Switched",
        description: `Switched to ${networkInfo[network].name}`,
      });
    } catch (error: any) {
      console.error('Network switch error:', error);
      toast({
        title: "Switch Failed",
        description: error.message || "Failed to switch network",
        variant: "destructive",
      });
    }
  };

  const handleTokenSelect = (token: any) => {
    if (selectingTokenNumber === 1) {
      setToken1(token);
    } else {
      setToken2(token);
    }
    setTokenSelectorOpen(false);
  };

  const openTokenSelector = (tokenNumber: 1 | 2) => {
    setSelectingTokenNumber(tokenNumber);
    setTokenSelectorOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">
            Your positions
          </Link>
          <ChevronLeft className="w-4 h-4 rotate-180" />
          <span className="text-foreground">New position</span>
        </div>

        {/* Page Title */}
        <h1 className="text-4xl font-bold mb-6">New position</h1>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mb-8">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 bg-card border-border hover:bg-muted transition-all hover:scale-105"
            onClick={handleReset}
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
          
          <Button 
            variant="outline"
            className="flex items-center gap-2 bg-card border-border hover:bg-muted transition-all hover:scale-105"
            onClick={() => setNetworkSwitcherOpen(true)}
          >
            <img 
              src={networkInfo[currentNetwork].logo} 
              alt={networkInfo[currentNetwork].name}
              className="w-5 h-5 rounded-full"
            />
            {networkInfo[currentNetwork].name}
            <ChevronDown className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="ml-auto bg-card border-border hover:bg-muted transition-all hover:scale-105"
            onClick={() => setSettingsOpen(true)}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {/* Step Indicator */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold ${
              currentStep === 1 ? 'bg-muted text-foreground' : 'bg-card text-muted-foreground border border-border'
            }`}>
              1
            </div>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Step 1 of 2</div>
              <div className="font-medium">Select token pair and fees</div>
            </div>
          </div>
        </div>

        {/* Step 1: Select Token Pair */}
        {currentStep === 1 && (
          <div className="bg-card border border-border rounded-2xl p-6 mb-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Select pair</h3>
              <p className="text-sm text-muted-foreground">
                Choose the tokens you want to provide liquidity for. You can select tokens on all supported networks.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <button 
                onClick={() => openTokenSelector(1)}
                className="w-full bg-muted hover:bg-muted/80 rounded-xl p-4 flex items-center justify-between transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {token1 ? (
                  <div className="flex items-center gap-3">
                    {getTokenLogo(token1.symbol) ? (
                      <img src={getTokenLogo(token1.symbol)} alt={token1.symbol} className="w-8 h-8 rounded-full" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-xs font-bold">
                        {token1.symbol.slice(0, 2)}
                      </div>
                    )}
                    <span className="font-semibold text-lg">{token1.symbol}</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">Choose token</span>
                )}
                <ChevronDown className="w-5 h-5" />
              </button>

              <div className="flex justify-center -my-1">
                <div className="w-10 h-10 rounded-full bg-muted border-4 border-background flex items-center justify-center">
                  <ArrowDownUp className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              <button 
                onClick={() => openTokenSelector(2)}
                className="w-full bg-muted hover:bg-muted/80 rounded-xl p-4 flex items-center justify-between transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {token2 ? (
                  <div className="flex items-center gap-3">
                    {getTokenLogo(token2.symbol) ? (
                      <img src={getTokenLogo(token2.symbol)} alt={token2.symbol} className="w-8 h-8 rounded-full" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-xs font-bold">
                        {token2.symbol.slice(0, 2)}
                      </div>
                    )}
                    <span className="font-semibold text-lg">{token2.symbol}</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">Choose token</span>
                )}
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Fee tier</h3>
              <p className="text-sm text-muted-foreground">
                The amount earned providing liquidity. All v2 pools have fixed 0.3% fees. For more options, provide liquidity on v4.
              </p>
            </div>

            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              onClick={handleContinue}
              disabled={!token1 || !token2}
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Enter Deposit Amounts */}
        {currentStep === 2 && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold bg-muted text-foreground">
                2
              </div>
              <div className="flex-1">
                <div className="text-sm text-muted-foreground">Step 2 of 2</div>
                <div className="font-medium">Enter deposit amounts</div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 mb-6">
              {/* Token Pair Info */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    {getTokenLogo(token1?.symbol) ? (
                      <img src={getTokenLogo(token1.symbol)} alt={token1.symbol} className="w-10 h-10 rounded-full" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-sm font-bold">
                        {token1?.symbol.slice(0, 2)}
                      </div>
                    )}
                    {getTokenLogo(token2?.symbol) ? (
                      <img src={getTokenLogo(token2.symbol)} alt={token2.symbol} className="w-10 h-10 rounded-full -ml-2" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-sm font-bold -ml-2">
                        {token2?.symbol.slice(0, 2)}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{token1?.symbol} / {token2?.symbol}</div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="bg-muted px-2 py-0.5 rounded">v2</span>
                      <span>0.3%</span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 transition-all hover:scale-105"
                  onClick={() => setCurrentStep(1)}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit
                </Button>
              </div>

              <div className="mb-4">
                <div className="text-sm text-muted-foreground mb-1">Current price</div>
                <div className="font-semibold text-2xl">3,317.27 ETH/USDT <span className="text-muted-foreground text-base">($3,316.05)</span></div>
              </div>
            </div>

            {/* Deposit Tokens */}
            <div className="bg-card border border-border rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-semibold mb-2">Deposit tokens</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Specify the token amounts for your liquidity contribution.
              </p>

              <div className="space-y-3">
                {/* ETH Input */}
                <div className="bg-muted rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Input
                      type="text"
                      placeholder="0"
                      className="text-4xl font-semibold bg-transparent border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                      value={token1Amount}
                      onChange={(e) => setToken1Amount(e.target.value)}
                    />
                    <div className="flex items-center gap-2 bg-background px-3 py-2 rounded-lg">
                      {getTokenLogo(token1?.symbol) ? (
                        <img src={getTokenLogo(token1.symbol)} alt={token1.symbol} className="w-6 h-6 rounded-full" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-[10px] font-bold">
                          {token1?.symbol.slice(0, 2)}
                        </div>
                      )}
                      <span className="font-semibold">{token1?.symbol}</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">$0</div>
                </div>

                {/* USDT Input */}
                <div className="bg-muted rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Input
                      type="text"
                      placeholder="0"
                      className="text-4xl font-semibold bg-transparent border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                      value={token2Amount}
                      onChange={(e) => setToken2Amount(e.target.value)}
                    />
                    <div className="flex items-center gap-2 bg-background px-3 py-2 rounded-lg">
                      {getTokenLogo(token2?.symbol) ? (
                        <img src={getTokenLogo(token2.symbol)} alt={token2.symbol} className="w-6 h-6 rounded-full" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-[10px] font-bold">
                          {token2?.symbol.slice(0, 2)}
                        </div>
                      )}
                      <span className="font-semibold">{token2?.symbol}</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">$0</div>
                </div>
              </div>
            </div>

            {/* Connect Wallet Button */}
            {!account ? (
              <ConnectButton
                client={client}
                connectButton={{ 
                  label: "Connect wallet",
                  className: "w-full !bg-primary !text-primary-foreground hover:!bg-primary/90 !font-semibold !py-6 !rounded-xl !text-lg"
                }}
                connectModal={{
                  privacyPolicyUrl: "https://kerdium.vercel.app/about",
                  size: "compact",
                  termsOfServiceUrl: "https://kerdium.vercel.app/faq",
                  title: "KERDIUM FINANCE",
                }}
                wallets={wallets}
              />
            ) : (
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                disabled={!token1Amount || !token2Amount}
              >
                Add Liquidity
              </Button>
            )}
          </>
        )}
      </main>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Swap settings</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 pt-6">
            {/* Max Slippage */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-medium">Max slippage</span>
                <Info className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-3 bg-muted rounded-xl p-3">
                <span className="text-primary font-semibold px-3 py-1.5 bg-primary/10 rounded-lg">Auto</span>
                <Input
                  type="text"
                  value={slippage}
                  onChange={(e) => setSlippage(e.target.value)}
                  className="bg-transparent border-0 text-right text-lg font-semibold focus-visible:ring-0"
                />
                <span className="font-semibold">%</span>
              </div>
            </div>

            {/* Transaction Deadline */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-medium">Tx. deadline</span>
                <Info className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-3 bg-muted rounded-xl p-3">
                <Input
                  type="text"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="bg-transparent border-0 text-right text-lg font-semibold focus-visible:ring-0"
                />
                <span className="font-semibold">minutes</span>
              </div>
            </div>

            {/* Save Button */}
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => setSettingsOpen(false)}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Token Selector Dialog */}
      <Dialog open={tokenSelectorOpen} onOpenChange={setTokenSelectorOpen}>
        <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-sm p-0">
          <DialogHeader className="border-b pb-4 px-6 pt-6">
            <DialogTitle>Select Token</DialogTitle>
          </DialogHeader>
          
          <div className="px-6 pb-6">
            {/* Popular Tokens */}
            <div className="flex gap-2 flex-wrap mb-4">
              {['ETH', 'USDC', 'USDT', 'WBTC', 'WETH', 'MON'].map((symbol) => {
                const token = allTokens.find(t => t.symbol === symbol);
                if (!token) return null;
                const logo = getTokenLogo(symbol);
                
                return (
                  <Badge
                    key={symbol}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary/10 transition-all hover:scale-105 px-3 py-2 gap-2"
                    onClick={() => handleTokenSelect(token)}
                  >
                    {logo ? (
                      <img src={logo} alt={symbol} className="w-4 h-4 rounded-full" />
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-[8px] font-bold">
                        {symbol.slice(0, 2)}
                      </div>
                    )}
                    <span className="text-sm font-medium">{symbol}</span>
                  </Badge>
                );
              })}
            </div>

            {/* Token List */}
            <ScrollArea className="h-80">
              <div className="space-y-1">
                {allTokens.map((token) => {
                  const logo = getTokenLogo(token.symbol);
                  
                  return (
                    <div
                      key={token.symbol}
                      onClick={() => handleTokenSelect(token)}
                      className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all hover:bg-muted/50 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <div className="flex items-center space-x-3">
                        {logo ? (
                          <img src={logo} alt={token.symbol} className="w-10 h-10 rounded-full" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-sm font-bold">
                            {token.symbol.slice(0, 2)}
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-foreground">{token.name}</div>
                          <div className="text-sm text-muted-foreground">{token.symbol}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      {/* Network Switcher Dialog */}
      <Dialog open={networkSwitcherOpen} onOpenChange={setNetworkSwitcherOpen}>
        <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>Select Network</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-3">
            {(Object.keys(networkInfo) as Array<keyof typeof networkInfo>).map((network) => {
              const info = networkInfo[network];
              const isSelected = currentNetwork === network;
              
              return (
                <button
                  key={network}
                  onClick={() => {
                    handleNetworkSwitch(network);
                    setNetworkSwitcherOpen(false);
                  }}
                  className={`w-full p-4 rounded-xl flex items-center justify-between transition-all hover:scale-[1.02] active:scale-[0.98] ${
                    isSelected 
                      ? 'bg-primary/10 border-2 border-primary' 
                      : 'bg-muted hover:bg-muted/80 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={info.logo} 
                      alt={info.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="text-left">
                      <div className="font-semibold">{info.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {SUPPORTED_NETWORKS[network].id}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Pool;