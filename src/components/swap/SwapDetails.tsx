import React from 'react'
import { ArrowDown, RefreshCcw, AlertTriangle, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface SwapDetailsProps {
  inputAmount?: string
  outputAmount?: string
  inputSymbol?: string
  outputSymbol?: string
  priceImpact?: string
  minimumReceived?: string
  networkFee?: string
  route?: string[]
  slippage?: string
  isLoading?: boolean
  className?: string
}

export function SwapDetails({
  inputAmount,
  outputAmount,
  inputSymbol,
  outputSymbol,
  priceImpact,
  minimumReceived,
  networkFee,
  route,
  slippage,
  isLoading = false,
  className,
}: SwapDetailsProps) {
  const [expanded, setExpanded] = React.useState(false)

  if (!inputAmount || !outputAmount) {
    return null
  }

  const priceImpactNum = parseFloat(priceImpact || '0')
  const isPriceImpactHigh = priceImpactNum > 3
  const isPriceImpactVeryHigh = priceImpactNum > 5

  const exchangeRate = parseFloat(outputAmount) / parseFloat(inputAmount)

  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-card/50 overflow-hidden transition-all',
        className
      )}
    >
      {/* Summary Row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-2 text-sm">
          {isLoading ? (
            <RefreshCcw className="w-4 h-4 animate-spin text-muted-foreground" />
          ) : (
            <span className="text-foreground">
              1 {inputSymbol} = {exchangeRate.toFixed(6)} {outputSymbol}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isPriceImpactHigh && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <AlertTriangle
                    className={cn(
                      'w-4 h-4',
                      isPriceImpactVeryHigh ? 'text-destructive' : 'text-orange-500'
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>High price impact! Trade may result in significant loss.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <ArrowDown
            className={cn(
              'w-4 h-4 text-muted-foreground transition-transform',
              expanded && 'rotate-180'
            )}
          />
        </div>
      </button>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-border px-4 py-3 space-y-2 text-sm">
          <DetailRow
            label="Minimum received"
            value={`${minimumReceived || outputAmount} ${outputSymbol}`}
            tooltip="The minimum amount you'll receive after slippage"
          />
          <DetailRow
            label="Price impact"
            value={`${priceImpact || '0.00'}%`}
            valueClassName={cn(
              isPriceImpactVeryHigh && 'text-destructive',
              isPriceImpactHigh && !isPriceImpactVeryHigh && 'text-orange-500'
            )}
            tooltip="The difference between market price and estimated price"
          />
          <DetailRow
            label="Liquidity provider fee"
            value="0.30%"
            tooltip="A portion of each trade goes to liquidity providers"
          />
          {networkFee && (
            <DetailRow
              label="Network fee"
              value={`~$${networkFee}`}
              tooltip="Estimated network (gas) fee for this transaction"
            />
          )}
          <DetailRow
            label="Slippage tolerance"
            value={`${slippage || '0.5'}%`}
            tooltip="Your transaction will revert if the price changes more than this"
          />
          {route && route.length > 0 && (
            <DetailRow
              label="Route"
              value={route.join(' → ')}
              tooltip="The path your swap will take through liquidity pools"
            />
          )}
        </div>
      )}
    </div>
  )
}

interface DetailRowProps {
  label: string
  value: string
  tooltip?: string
  valueClassName?: string
}

function DetailRow({ label, value, tooltip, valueClassName }: DetailRowProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1 text-muted-foreground">
        <span>{label}</span>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-3 h-3" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-[200px]">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <span className={cn('text-foreground', valueClassName)}>{value}</span>
    </div>
  )
}
