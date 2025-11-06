import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, RotateCcw, ChevronDown, Settings, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client, wallets } from '@/lib/thirdweb';
import { useToast } from '@/hooks/use-toast';
import ethLogo from '@/assets/tokens/eth.png';
import usdcLogo from '@/assets/tokens/usdc.png';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Pool = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [token1, setToken1] = useState('ETH');
  const [token2, setToken2] = useState('');
  const [token1Amount, setToken1Amount] = useState('');
  const [token2Amount, setToken2Amount] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [slippage, setSlippage] = useState('2.50');
  const [deadline, setDeadline] = useState('30');
  const account = useActiveAccount();
  const { toast } = useToast();

  const handleReset = () => {
    setCurrentStep(1);
    setToken1('ETH');
    setToken2('');
    setToken1Amount('');
    setToken2Amount('');
  };

  const handleContinue = () => {
    if (token1 && token2) {
      setCurrentStep(2);
    }
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
            className="flex items-center gap-2 bg-card border-border hover:bg-muted"
            onClick={handleReset}
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
          
          <Button 
            variant="outline"
            className="flex items-center gap-2 bg-card border-border hover:bg-muted"
          >
            v2 position
            <ChevronDown className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="ml-auto bg-card border-border hover:bg-muted"
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
              <button className="w-full bg-muted hover:bg-muted/80 rounded-xl p-4 flex items-center justify-between transition-colors">
                <div className="flex items-center gap-3">
                  <img src={ethLogo} alt="ETH" className="w-8 h-8 rounded-full" />
                  <span className="font-semibold text-lg">ETH</span>
                </div>
                <ChevronDown className="w-5 h-5" />
              </button>

              <button className="w-full bg-white hover:bg-gray-50 rounded-xl p-4 flex items-center justify-between transition-colors">
                <span className="text-muted-foreground">Choose token</span>
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
              className="w-full bg-muted hover:bg-muted/80 text-foreground font-semibold py-6 rounded-xl"
              onClick={handleContinue}
              disabled={!token2}
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
                    <img src={ethLogo} alt="ETH" className="w-10 h-10 rounded-full" />
                    <img src={usdcLogo} alt="USDT" className="w-10 h-10 rounded-full -ml-2" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">ETH / USDT</div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="bg-muted px-2 py-0.5 rounded">v2</span>
                      <span>0.3%</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
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
                      <img src={ethLogo} alt="ETH" className="w-6 h-6 rounded-full" />
                      <span className="font-semibold">ETH</span>
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
                      <img src={usdcLogo} alt="USDT" className="w-6 h-6 rounded-full" />
                      <span className="font-semibold">USDT</span>
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
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 rounded-xl text-lg"
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
              className="w-full bg-muted hover:bg-muted/80 text-foreground font-semibold py-6 rounded-xl"
              onClick={() => setSettingsOpen(false)}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Pool;