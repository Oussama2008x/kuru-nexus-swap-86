import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowDownUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SwapArrowButtonProps {
  onClick: () => void
  disabled?: boolean
  className?: string
}

export function SwapArrowButton({
  onClick,
  disabled = false,
  className,
}: SwapArrowButtonProps) {
  return (
    <div className={cn('flex justify-center -my-2 relative z-10', className)}>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        disabled={disabled}
        className={cn(
          'rounded-full bg-card border-4 border-background',
          'hover:bg-muted/50 h-10 w-10 transition-all',
          'hover:scale-110 active:scale-95'
        )}
      >
        <ArrowDownUp className="w-4 h-4 text-primary" />
      </Button>
    </div>
  )
}
