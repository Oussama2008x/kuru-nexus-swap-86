import React, { useState, useEffect, useCallback } from 'react'
import { TradingButton } from '@/components/ui/trading-button'
import { ConnectButton, useActiveAccount } from 'thirdweb/react'
import { client, wallets, monadTestnet } from '@/lib/thirdweb'
import { useToast } from '@/hooks/use-toast'
import { useUniswapSwap } from '@/hooks/useUniswapSwap'
import { useTokenBalance } from '@/hooks/useTokenBalance'
import { TOKENS, CONTRACTS } from '@/lib/contracts'
import { ethers } from 'ethers'
import { calculateTokenAmount, getTokenPrice } from '@/lib/tokenPrices'
import { TokenSelector } from './TokenSelector'
import { SwapSettings } from './SwapSettings'
import { CurrencyInputPanel } from './CurrencyInputPanel'
import { SwapHeader } from './SwapHeader'
import { SwapDetails } from './SwapDetails'
import { SwapArrowButton } from './SwapArrowButton'

// Custom hook for MON (native token) balance
const useNativeBalance = () => {
  const [balance, setBalance] = useState('0')
  const [isLoading, setIsLoading] = useState(false)
  const account = useActiveAccount()

  const fetchBalance = async () => {
    if (!account?.address) return
    
    setIsLoading(true)
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask not found')
      }
      const provider = new ethers.BrowserProvider(window.ethereum)
      const balanceWei = await provider.getBalance(account.address)
      const formattedBalance = ethers.formatEther(balanceWei)
      setBalance(formattedBalance)
    } catch (error) {
      console.error('Error fetching MON balance:', error)
      setBalance('0')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBalance()
  }, [account?.address])

  return { balance, isLoading, refetch: fetchBalance }
}

export const SimpleSwapInterface: React.FC = () => {
  const [fromToken, setFromToken] = useState(TOKENS[0])
  const [toToken, setToToken] = useState(TOKENS[1])
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [slippage, setSlippage] = useState('0.5')
  const [showFromTokenSelector, setShowFromTokenSelector] = useState(false)
  const [showToTokenSelector, setShowToTokenSelector] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [routePath, setRoutePath] = useState<string[]>([])
  const [needsApproval, setNeedsApproval] = useState(false)
  const [isCheckingApproval, setIsCheckingApproval] = useState(false)
  const [priceImpact, setPriceImpact] = useState('0.00')
  
  const account = useActiveAccount()
  const { toast } = useToast()
  const { executeSwap, quoteSwap, checkAllowance, approveToken, isLoading } = useUniswapSwap()
  const { balance: fromTokenBalance, isLoading: balanceLoading, refetch: refetchBalance } = useTokenBalance(fromToken.symbol)
  const { balance: monBalance, isLoading: monLoading, refetch: refetchMonBalance } = useNativeBalance()

  const checkApprovalStatus = useCallback(async (token: typeof TOKENS[0], amount: string) => {
    if (!account?.address || !amount || Number(amount) <= 0) {
      setNeedsApproval(false)
      return
    }

    if (token.symbol === 'MON') {
      setNeedsApproval(false)
      return
    }

    setIsCheckingApproval(true)
    try {
      const hasAllowance = await checkAllowance(
        token.address,
        CONTRACTS.router,
        amount,
        token.decimals
      )
      setNeedsApproval(!hasAllowance)
    } catch (error) {
      console.error('Error checking allowance:', error)
      setNeedsApproval(false)
    } finally {
      setIsCheckingApproval(false)
    }
  }, [account?.address, checkAllowance])

  const handleFromAmountChange = useCallback(async (value: string) => {
    setFromAmount(value)
    
    if (value && !isNaN(Number(value)) && Number(value) > 0) {
      await checkApprovalStatus(fromToken, value)
      
      quoteSwap(fromToken.symbol, toToken.symbol, value)
        .then(({ amountOut, path }) => {
          if (amountOut && amountOut !== '0') {
            setToAmount(amountOut)
            setRoutePath(path || [])
            // Calculate price impact
            const inputValue = Number(value) * getTokenPrice(fromToken.symbol)
            const outputValue = Number(amountOut) * getTokenPrice(toToken.symbol)
            const impact = inputValue > 0 ? ((inputValue - outputValue) / inputValue) * 100 : 0
            setPriceImpact(Math.max(0, impact).toFixed(2))
          } else {
            setToAmount('0')
            setRoutePath([])
            setPriceImpact('0.00')
          }
        })
        .catch(() => {
          setToAmount('0')
          setRoutePath([])
          setPriceImpact('0.00')
        })
    } else {
      setToAmount('')
      setRoutePath([])
      setNeedsApproval(false)
      setPriceImpact('0.00')
    }
  }, [fromToken, toToken, checkApprovalStatus, quoteSwap])

  const handleSwapTokens = useCallback(() => {
    const tempToken = fromToken
    const tempAmount = fromAmount
    
    setFromToken(toToken)
    setToToken(tempToken)
    setFromAmount(toAmount)
    setToAmount(tempAmount)
  }, [fromToken, toToken, fromAmount, toAmount])

  const handleApprove = useCallback(async () => {
    if (!account || !fromAmount) return

    try {
      toast({
        title: 'Approving Token',
        description: `Approving ${fromToken.symbol} for trading...`,
      })

      await approveToken(
        fromToken.address,
        CONTRACTS.router,
        fromAmount,
        fromToken.decimals
      )

      toast({
        title: 'Approval Successful',
        description: `${fromToken.symbol} approved successfully!`,
      })

      await checkApprovalStatus(fromToken, fromAmount)
    } catch (error: any) {
      console.error('Approval error:', error)
      toast({
        title: 'Approval Failed',
        description: error.message || 'Failed to approve token',
        variant: 'destructive',
      })
    }
  }, [account, fromAmount, fromToken, approveToken, checkApprovalStatus, toast])

  const handleSwap = useCallback(async () => {
    if (!account) {
      toast({
        title: 'Wallet Required',
        description: 'Please connect your wallet to perform swaps',
        variant: 'destructive'
      })
      return
    }

    if (!fromAmount || !toAmount) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid amount to swap',
        variant: 'destructive'
      })
      return
    }

    const userBalance = fromToken.symbol === 'MON' ? monBalance : fromTokenBalance
    if (parseFloat(fromAmount) > parseFloat(userBalance)) {
      toast({
        title: 'Insufficient Balance',
        description: `You don't have enough ${fromToken.symbol}`,
        variant: 'destructive'
      })
      return
    }

    const result = await executeSwap({
      fromToken: fromToken.symbol,
      toToken: toToken.symbol,
      fromAmount,
      slippage,
    })

    if (result?.success) {
      refetchBalance()
      if (fromToken.symbol === 'MON' || toToken.symbol === 'MON') {
        refetchMonBalance()
      }
      setFromAmount('')
      setToAmount('')
    }
  }, [account, fromAmount, toAmount, fromToken, toToken, monBalance, fromTokenBalance, slippage, executeSwap, refetchBalance, refetchMonBalance, toast])

  const getBalance = useCallback(() => {
    return fromToken.symbol === 'MON' ? monBalance : fromTokenBalance
  }, [fromToken.symbol, monBalance, fromTokenBalance])

  const getFiatValue = useCallback((amount: string, symbol: string) => {
    if (!amount || isNaN(Number(amount))) return '0.00'
    return (Number(amount) * getTokenPrice(symbol)).toFixed(2)
  }, [])

  const minimumReceived = toAmount 
    ? (Number(toAmount) * (1 - Number(slippage) / 100)).toFixed(6)
    : undefined

  return (
    <div className="w-full max-w-md mx-auto">
      <SwapHeader
        title="Swap"
        slippage={slippage}
        onSettingsClick={() => setShowSettings(true)}
      />

      {/* From Panel */}
      <CurrencyInputPanel
        label="From"
        value={fromAmount}
        onUserInput={handleFromAmountChange}
        onMax={() => handleFromAmountChange(getBalance())}
        showMaxButton={!!account}
        onCurrencySelect={() => setShowFromTokenSelector(true)}
        currency={fromToken}
        balance={account ? getBalance() : undefined}
        fiatValue={getFiatValue(fromAmount, fromToken.symbol)}
        loading={balanceLoading || monLoading}
        className="mb-1"
      />

      {/* Swap Arrow */}
      <SwapArrowButton onClick={handleSwapTokens} disabled={isLoading} />

      {/* To Panel */}
      <CurrencyInputPanel
        label="To"
        value={toAmount}
        onUserInput={() => {}}
        showMaxButton={false}
        onCurrencySelect={() => setShowToTokenSelector(true)}
        currency={toToken}
        fiatValue={getFiatValue(toAmount, toToken.symbol)}
        disabled
        className="mt-1"
      />

      {/* Swap Details */}
      {fromAmount && toAmount && (
        <SwapDetails
          inputAmount={fromAmount}
          outputAmount={toAmount}
          inputSymbol={fromToken.symbol}
          outputSymbol={toToken.symbol}
          priceImpact={priceImpact}
          minimumReceived={minimumReceived}
          networkFee="0.50"
          route={routePath}
          slippage={slippage}
          isLoading={isLoading}
          className="mt-4"
        />
      )}

      {/* Action Buttons */}
      <div className="mt-6">
        {account ? (
          <div className="space-y-3">
            {needsApproval && (
              <TradingButton
                variant="outline"
                size="lg"
                onClick={handleApprove}
                disabled={!fromAmount || isLoading || isCheckingApproval}
                className="w-full text-base font-semibold h-14 rounded-2xl border-primary/50 hover:border-primary"
              >
                {isCheckingApproval ? 'Checking...' : `Approve ${fromToken.symbol}`}
              </TradingButton>
            )}
            <TradingButton
              variant="default"
              size="lg"
              onClick={handleSwap}
              disabled={!fromAmount || !toAmount || isLoading || needsApproval}
              className="w-full text-base font-bold h-14 rounded-2xl bg-white hover:bg-white/90 text-black shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              {isLoading ? 'Processing...' : needsApproval ? 'Approve First' : 'Swap'}
            </TradingButton>
          </div>
        ) : (
          <ConnectButton
            client={client}
            connectButton={{ 
              label: 'Connect wallet',
              className: 'w-full h-14 rounded-2xl bg-white hover:bg-white/90 text-black font-bold text-base shadow-lg transition-all duration-200 hover:shadow-xl'
            }}
            connectModal={{
              privacyPolicyUrl: 'https://kerdium.vercel.app/about',
              size: 'compact',
              termsOfServiceUrl: 'https://kerdium.vercel.app/faq',
              title: 'KERDIUM FINANCE',
            }}
            wallets={wallets}
            chain={monadTestnet}
          />
        )}
      </div>

      {/* Token Selectors */}
      <TokenSelector
        isOpen={showFromTokenSelector}
        onClose={() => setShowFromTokenSelector(false)}
        onSelectToken={async (token) => {
          setFromToken(token)
          if (fromAmount) {
            await checkApprovalStatus(token, fromAmount)
            quoteSwap(token.symbol, toToken.symbol, fromAmount)
              .then(({ amountOut, path }) => {
                setToAmount(amountOut || '')
                setRoutePath(path || [])
              })
              .catch(() => {
                setToAmount('')
                setRoutePath([])
              })
          }
        }}
        selectedToken={fromToken}
      />
      
      <TokenSelector
        isOpen={showToTokenSelector}
        onClose={() => setShowToTokenSelector(false)}
        onSelectToken={(token) => {
          setToToken(token)
          if (fromAmount) {
            quoteSwap(fromToken.symbol, token.symbol, fromAmount)
              .then(({ amountOut, path }) => {
                setToAmount(amountOut || '')
                setRoutePath(path || [])
              })
              .catch(() => {
                setToAmount('')
                setRoutePath([])
              })
          }
        }}
        selectedToken={toToken}
      />
      
      {/* Settings Dialog */}
      <SwapSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        slippage={slippage}
        onSlippageChange={setSlippage}
      />
    </div>
  )
}
