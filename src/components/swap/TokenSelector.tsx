import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from 'lucide-react';
import { TOKENS } from '@/lib/contracts';
import { getAllTokenPrices, getTokenPrice } from '@/lib/tokenPrices';

interface TokenSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectToken: (token: typeof TOKENS[0]) => void;
  selectedToken?: typeof TOKENS[0];
}

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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Token</DialogTitle>
          <DialogDescription>Choose a token from the list below.</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search tokens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Token List */}
          <ScrollArea className="h-80">
            <div className="space-y-1">
              {filteredTokens.map((token) => {
                const price = getTokenPrice(token.symbol);
                const isSelected = selectedToken?.symbol === token.symbol;
                
                return (
                  <div
                    key={token.symbol}
                    onClick={() => handleTokenSelect(token)}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-primary/10 border border-primary/20'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-sm font-bold">
                        {token.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{token.symbol}</div>
                        <div className="text-sm text-muted-foreground">{token.name}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-medium">{formatPrice(price)}</div>
                      <div className="text-sm text-muted-foreground">
                        {token.decimals} dec
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
  );
};