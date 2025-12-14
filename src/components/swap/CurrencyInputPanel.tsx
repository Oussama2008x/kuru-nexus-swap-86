import React, { useCallback, useMemo } from 'react'
import { Currency, CurrencyAmount, Percent, Token } from '@uniswap/sdk-core'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronDown, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton?: boolean
  label?: string
  onCurrencySelect?: () => void
  currency?: {
    symbol: string
    name?: string
    decimals: number
    address?: string
  }
  balance?: string
  fiatValue?: string
  priceImpact?: Percent
  hideInput?: boolean
  locked?: boolean
  loading?: boolean
  disabled?: boolean
  className?: string
  id?: string
}

export function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton = true,
  label,
  onCurrencySelect,
  currency,
  balance,
  fiatValue,
  priceImpact,
  hideInput = false,
  locked = false,
  loading = false,
  disabled = false,
  className,
  id,
}: CurrencyInputPanelProps) {
  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.replace(/,/g, '.')
      // Only allow valid number input
      if (val === '' || /^[0-9]*\.?[0-9]*$/.test(val)) {
        onUserInput(val)
      }
    },
    [onUserInput]
  )

  const handleMaxClick = useCallback(() => {
    if (onMax) {
      onMax()
    }
  }, [onMax])

  const priceImpactClassName = useMemo(() => {
    if (!priceImpact) return ''
    const impact = parseFloat(priceImpact.toFixed(2))
    if (impact > 5) return 'text-destructive'
    if (impact > 3) return 'text-orange-500'
    return 'text-muted-foreground'
  }, [priceImpact])

  return (
    <div
      id={id}
      className={cn(
        'relative rounded-2xl bg-card border border-border p-4 transition-all',
        'hover:border-border/80 focus-within:border-primary/50',
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
    >
      {locked && (
        <div className="absolute inset-0 rounded-2xl bg-background/80 flex items-center justify-center z-10">
          <Lock className="w-5 h-5 text-muted-foreground" />
        </div>
      )}

      {/* Header Row */}
      <div className="flex items-center justify-between mb-2">
        {label && (
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
        )}
        {balance && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Balance: {parseFloat(balance).toFixed(6)}</span>
            {showMaxButton && onMax && parseFloat(balance) > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMaxClick}
                className="h-5 px-2 text-xs font-semibold text-primary hover:text-primary/80 hover:bg-primary/10"
              >
                MAX
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Input Row */}
      <div className="flex items-center justify-between gap-3">
        {/* Currency Selector */}
        <Button
          variant="ghost"
          onClick={onCurrencySelect}
          disabled={disabled}
          className={cn(
            'flex items-center gap-2 px-3 py-2 h-auto rounded-xl',
            'hover:bg-muted/50 transition-colors',
            !currency && 'bg-primary text-primary-foreground hover:bg-primary/90'
          )}
        >
          {currency ? (
            <>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {currency.symbol.slice(0, 2)}
                </span>
              </div>
              <span className="text-lg font-semibold">{currency.symbol}</span>
            </>
          ) : (
            <span className="font-semibold">Select token</span>
          )}
          <ChevronDown className="w-4 h-4" />
        </Button>

        {/* Input */}
        {!hideInput && (
          <div className="flex-1 text-right">
            <Input
              type="text"
              inputMode="decimal"
              autoComplete="off"
              autoCorrect="off"
              pattern="^[0-9]*[.,]?[0-9]*$"
              placeholder="0"
              value={value}
              onChange={handleInput}
              disabled={disabled || loading}
              className={cn(
                'text-right text-2xl font-semibold bg-transparent border-none p-0 h-auto',
                'focus-visible:ring-0 focus-visible:ring-offset-0',
                loading && 'animate-pulse'
              )}
            />
            {fiatValue && (
              <div className={cn('text-xs mt-1', priceImpactClassName || 'text-muted-foreground')}>
                ${fiatValue}
                {priceImpact && (
                  <span className="ml-1">({priceImpact.toFixed(2)}%)</span>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Percentage Buttons */}
      {showMaxButton && balance && parseFloat(balance) > 0 && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-border">
          {[25, 50, 75, 100].map((percent) => (
            <Button
              key={percent}
              variant="outline"
              size="sm"
              onClick={() => {
                const amount = (parseFloat(balance) * percent) / 100
                onUserInput(amount.toString())
              }}
              disabled={disabled}
              className="flex-1 h-7 text-xs font-medium hover:bg-primary/10 hover:text-primary hover:border-primary/50"
            >
              {percent === 100 ? 'MAX' : `${percent}%`}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
