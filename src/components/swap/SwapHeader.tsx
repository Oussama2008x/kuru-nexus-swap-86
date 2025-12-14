import React from 'react'
import { Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SwapHeaderProps {
  title?: string
  slippage?: string
  onSettingsClick?: () => void
  className?: string
}

export function SwapHeader({
  title = 'Swap',
  slippage,
  onSettingsClick,
  className,
}: SwapHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        {slippage && (
          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
            {slippage}% slippage
          </span>
        )}
      </div>
      {onSettingsClick && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onSettingsClick}
          className="hover:bg-muted/50 rounded-xl"
        >
          <Settings className="w-5 h-5" />
        </Button>
      )}
    </div>
  )
}
