import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TradingButton } from "@/components/ui/trading-button";

interface SwapSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  slippage: string;
  onSlippageChange: (value: string) => void;
}

export const SwapSettings: React.FC<SwapSettingsProps> = ({
  isOpen,
  onClose,
  slippage,
  onSlippageChange
}) => {
  const quickSlippageOptions = ['0.1', '0.5', '1.0', '2.0'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Swap Settings</DialogTitle>
          <DialogDescription>Adjust slippage tolerance for your swap.</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Slippage Tolerance */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Slippage Tolerance</Label>
            <p className="text-sm text-muted-foreground">
              Your transaction will revert if the price changes unfavorably by more than this percentage.
            </p>
            
            {/* Quick Options */}
            <div className="flex space-x-2">
              {quickSlippageOptions.map((option) => (
                <TradingButton
                  key={option}
                  variant={slippage === option ? "trading" : "outline"}
                  size="sm"
                  onClick={() => onSlippageChange(option)}
                  className="flex-1"
                >
                  {option}%
                </TradingButton>
              ))}
            </div>
            
            {/* Custom Input */}
            <div className="relative">
              <Input
                type="number"
                value={slippage}
                onChange={(e) => onSlippageChange(e.target.value)}
                placeholder="0.5"
                step="0.1"
                min="0.1"
                max="50"
                className="pr-8"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                %
              </span>
            </div>
          </div>

          {/* Warning */}
          {parseFloat(slippage) > 5 && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">
                High slippage tolerance may result in unfavorable trades.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};