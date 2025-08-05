import React from 'react';
import { ChevronDown } from 'lucide-react';
import ethIcon from '@/assets/tokens/eth.png';
import usdcIcon from '@/assets/tokens/usdc.png';
import wbtcIcon from '@/assets/tokens/wbtc.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI: string;
  balance?: string;
}

interface TokenSelectorProps {
  selectedToken: Token | null;
  onTokenSelect: (token: Token) => void;
  tokens: Token[];
}

export const TokenSelector: React.FC<TokenSelectorProps> = ({
  selectedToken,
  onTokenSelect,
  tokens,
}) => {
  // If no token is selected, show a placeholder
  if (!selectedToken) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="h-8 px-2 gap-1 hover:bg-muted/50 rounded-lg"
          >
            <Avatar className="w-5 h-5">
              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                ?
              </AvatarFallback>
            </Avatar>
            <span className="font-semibold text-sm">Select Token</span>
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          className="w-56 p-2 bg-card/95 backdrop-blur-sm border-border/50"
          align="end"
        >
          {tokens.map((token) => (
            <DropdownMenuItem
              key={token.address}
              onClick={() => onTokenSelect(token)}
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/50 rounded-lg"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={token.logoURI} alt={token.symbol} />
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {token.symbol.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold text-sm">{token.symbol}</div>
                <div className="text-xs text-muted-foreground">{token.name}</div>
              </div>
              {token.balance && (
                <div className="text-xs text-muted-foreground text-right">
                  {token.balance}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-8 px-2 gap-1 hover:bg-muted/50 rounded-lg"
        >
          <Avatar className="w-5 h-5">
            <AvatarImage src={selectedToken.logoURI} alt={selectedToken.symbol} />
            <AvatarFallback className="text-xs bg-primary/10 text-primary">
              {selectedToken.symbol.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold text-sm">{selectedToken.symbol}</span>
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-56 p-2 bg-card/95 backdrop-blur-sm border-border/50"
        align="end"
      >
        {tokens.map((token) => (
          <DropdownMenuItem
            key={token.address}
            onClick={() => onTokenSelect(token)}
            className="flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/50 rounded-lg"
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src={token.logoURI} alt={token.symbol} />
              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                {token.symbol.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-semibold text-sm">{token.symbol}</div>
              <div className="text-xs text-muted-foreground">{token.name}</div>
            </div>
            {token.balance && (
              <div className="text-xs text-muted-foreground text-right">
                {token.balance}
              </div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};