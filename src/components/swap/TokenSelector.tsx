import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronDown } from 'lucide-react';
import { TOKENS } from '@/lib/contracts';
import { getAllTokenPrices, getTokenPrice } from '@/lib/tokenPrices';
import bitcoinLogo from '@/assets/tokens/bitcoin.png';
import ethLogo from '@/assets/tokens/eth.png';
import usdcLogo from '@/assets/tokens/usdc.png';
import wbtcLogo from '@/assets/tokens/wbtc.png';
import wethLogo from '@/assets/tokens/weth.png';

interface TokenSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectToken: (token: typeof TOKENS[0]) => void;
  selectedToken?: typeof TOKENS[0];
}

// Token logo mapping
const getTokenLogo = (symbol: string) => {
  const logoMap: Record<string, string> = {
    'WBTC': wbtcLogo,
    'BTC': bitcoinLogo,
    'ETH': ethLogo,
    'WETH': wethLogo,
    'USDC': usdcLogo,
    'USDT': usdcLogo, // Using USDC logo for USDT
  };
  return logoMap[symbol];
};

export const TokenSelector: React.FC<TokenSelectorProps> = ({
  isOpen,
  onClose,
  onSelectToken,
  selectedToken
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const allTokens = [
    // Add native MON token
    { name: "MONAD", symbol: "MON", decimals: 18, address: "0x0000000000000000000000000000000000000000" },
    ...TOKENS
  ];

  // Popular tokens for quick access
  const popularTokens = allTokens.filter(token => 
    ['ETH', 'USDC', 'USDT', 'WBTC', 'WETH'].includes(token.symbol)
  );

  const filteredTokens = allTokens.filter(token =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTokenSelect = (token: typeof TOKENS[0]) => {
    onSelectToken(token);
    onClose();
    setSearchTerm('');
  };

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `$${price.toLocaleString()}`;
    }
    return `$${price.toFixed(4)}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-sm">
        <DialogHeader className="border-b pb-4">
          <DialogTitle>Select Token</DialogTitle>
          <DialogDescription>Choose a token from the list below.</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search Input with Network Selector */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search tokens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" className="gap-2 min-w-[120px]" disabled>
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                M
              </div>
              <span>MONAD</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>

          {/* Popular Tokens */}
          {!searchTerm && popularTokens.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {popularTokens.map((token) => {
                const logo = getTokenLogo(token.symbol);
                return (
                  <Badge
                    key={token.symbol}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary/10 transition-colors px-3 py-2 gap-2"
                    onClick={() => handleTokenSelect(token)}
                  >
                    {logo ? (
                      <img src={logo} alt={token.symbol} className="w-4 h-4 rounded-full" />
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-[8px] font-bold">
                        {token.symbol.slice(0, 2)}
                      </div>
                    )}
                    <span className="text-sm font-medium">{token.symbol}</span>
                  </Badge>
                );
              })}
            </div>
          )}

          {/* Token List Header */}
          {!searchTerm && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground px-1">
              <span>Tokens by 24H volume</span>
            </div>
          )}

          {/* Token List */}
          <ScrollArea className="h-80">
            <div className="space-y-1">
              {filteredTokens.length > 0 ? (
                filteredTokens.map((token) => {
                  const price = getTokenPrice(token.symbol);
                  const isSelected = selectedToken?.symbol === token.symbol;
                  const logo = getTokenLogo(token.symbol);
                  
                  return (
                    <div
                      key={token.symbol}
                      onClick={() => handleTokenSelect(token)}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-primary/10 border border-primary/20'
                          : 'hover:bg-muted/50'
                      }`}
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
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <span>{token.symbol}</span>
                            {token.address && token.address !== "0x0000000000000000000000000000000000000000" && (
                              <span className="text-xs">
                                {token.address.slice(0, 6)}...{token.address.slice(-4)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-medium">{formatPrice(price)}</div>
                        {isSelected && (
                          <div className="text-xs text-primary font-medium">
                            Selected
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No tokens found</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};