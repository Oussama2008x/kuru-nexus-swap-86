import React from 'react';
import { TradingButton } from '@/components/ui/trading-button';

interface PercentageButtonsProps {
  balance: string;
  onAmountSelect: (amount: string) => void;
  disabled?: boolean;
}

export const PercentageButtons: React.FC<PercentageButtonsProps> = ({
  balance,
  onAmountSelect,
  disabled = false,
}) => {
  const calculatePercentage = (percentage: number): string => {
    if (!balance || balance === '0') return '0';
    const balanceNum = parseFloat(balance);
    const result = (balanceNum * percentage / 100).toString();
    return parseFloat(result).toFixed(6);
  };

  const handlePercentageClick = (percentage: number) => {
    const amount = percentage === 100 ? balance : calculatePercentage(percentage);
    onAmountSelect(amount);
  };

  return (
    <div className="flex gap-2 mt-2">
      <TradingButton
        variant="outline"
        size="sm"
        onClick={() => handlePercentageClick(25)}
        disabled={disabled || !balance || balance === '0'}
        className="flex-1 text-xs"
      >
        25%
      </TradingButton>
      <TradingButton
        variant="outline"
        size="sm"
        onClick={() => handlePercentageClick(50)}
        disabled={disabled || !balance || balance === '0'}
        className="flex-1 text-xs"
      >
        50%
      </TradingButton>
      <TradingButton
        variant="outline"
        size="sm"
        onClick={() => handlePercentageClick(100)}
        disabled={disabled || !balance || balance === '0'}
        className="flex-1 text-xs"
      >
        Max
      </TradingButton>
    </div>
  );
};