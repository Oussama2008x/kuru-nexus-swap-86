import { useState, useCallback, useMemo } from 'react'
import { Currency, Token, CurrencyAmount, Percent, TradeType } from '@uniswap/sdk-core'
import { SupportedChainId } from '@/lib/luxfi/constants/chains'
import { nativeOnChain, WRAPPED_NATIVE_CURRENCY } from '@/lib/luxfi/constants/tokens'

export enum Field {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT',
}

export interface SwapState {
  readonly independentField: Field
  readonly typedValue: string
  readonly [Field.INPUT]: {
    readonly currencyId: string | undefined
  }
  readonly [Field.OUTPUT]: {
    readonly currencyId: string | undefined
  }
  readonly recipient: string | null
}

const initialState: SwapState = {
  independentField: Field.INPUT,
  typedValue: '',
  [Field.INPUT]: {
    currencyId: undefined,
  },
  [Field.OUTPUT]: {
    currencyId: undefined,
  },
  recipient: null,
}

export function useSwapState() {
  const [state, setState] = useState<SwapState>(initialState)

  const onUserInput = useCallback((field: Field, typedValue: string) => {
    setState((prev) => ({
      ...prev,
      independentField: field,
      typedValue,
    }))
  }, [])

  const onCurrencySelection = useCallback((field: Field, currencyId: string) => {
    setState((prev) => ({
      ...prev,
      [field]: { currencyId },
    }))
  }, [])

  const onSwitchTokens = useCallback(() => {
    setState((prev) => ({
      ...prev,
      independentField: prev.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT,
      [Field.INPUT]: { currencyId: prev[Field.OUTPUT].currencyId },
      [Field.OUTPUT]: { currencyId: prev[Field.INPUT].currencyId },
    }))
  }, [])

  const onChangeRecipient = useCallback((recipient: string | null) => {
    setState((prev) => ({
      ...prev,
      recipient,
    }))
  }, [])

  const resetSwapState = useCallback(() => {
    setState(initialState)
  }, [])

  return {
    ...state,
    onUserInput,
    onCurrencySelection,
    onSwitchTokens,
    onChangeRecipient,
    resetSwapState,
  }
}

// Helper to get currency for a chain
export function useCurrencyFromId(
  currencyId: string | undefined,
  chainId: SupportedChainId = SupportedChainId.MAINNET
): Currency | undefined {
  return useMemo(() => {
    if (!currencyId) return undefined
    
    // Handle native currency
    if (currencyId === 'ETH' || currencyId === 'NATIVE') {
      return nativeOnChain(chainId)
    }
    
    // Handle wrapped native
    const wrapped = WRAPPED_NATIVE_CURRENCY[chainId]
    if (wrapped && currencyId.toLowerCase() === wrapped.address.toLowerCase()) {
      return wrapped
    }
    
    return undefined
  }, [currencyId, chainId])
}

// Default slippage tolerance
export const DEFAULT_SLIPPAGE = new Percent(50, 10_000) // 0.5%
export const MAX_SLIPPAGE = new Percent(50, 100) // 50%

export function useSlippageTolerance(userSlippage?: string): Percent {
  return useMemo(() => {
    if (!userSlippage) return DEFAULT_SLIPPAGE
    
    const parsed = parseFloat(userSlippage)
    if (isNaN(parsed) || parsed < 0 || parsed > 50) {
      return DEFAULT_SLIPPAGE
    }
    
    return new Percent(Math.floor(parsed * 100), 10_000)
  }, [userSlippage])
}
