import { useState, useCallback } from 'react'
import { ethers } from 'ethers'
import { V2_ROUTER_ADDRESS } from '@/lib/luxfi/constants/addresses'
import { SupportedChainId } from '@/lib/luxfi/constants/chains'
import { UNISWAP_V2_ROUTER_ABI } from '@/lib/luxfi/abi'
import { useActiveAccount } from 'thirdweb/react'

export interface TradeCallbackParams {
  fromTokenAddress: string
  toTokenAddress: string
  amountIn: string
  amountOutMin: string
  path: string[]
  deadline?: number
}

export function useTradeCallback(chainId: SupportedChainId = SupportedChainId.MAINNET) {
  const account = useActiveAccount()
  const [isLoading, setIsLoading] = useState(false)

  const getRouterAddress = useCallback(() => {
    return V2_ROUTER_ADDRESS[chainId] || V2_ROUTER_ADDRESS[SupportedChainId.MAINNET]
  }, [chainId])

  const executeSwap = useCallback(
    async ({
      fromTokenAddress,
      toTokenAddress,
      amountIn,
      amountOutMin,
      path,
      deadline = Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes
    }: TradeCallbackParams) => {
      if (!account?.address) {
        throw new Error('Wallet not connected')
      }

      if (!window.ethereum) {
        throw new Error('No ethereum provider found')
      }

      setIsLoading(true)

      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const routerAddress = getRouterAddress()
        
        const router = new ethers.Contract(
          routerAddress,
          UNISWAP_V2_ROUTER_ABI,
          signer
        )

        const isNativeInput = fromTokenAddress === ethers.ZeroAddress
        const isNativeOutput = toTokenAddress === ethers.ZeroAddress

        let tx

        if (isNativeInput) {
          // ETH -> Token
          tx = await router.swapExactETHForTokens(
            amountOutMin,
            path,
            account.address,
            deadline,
            { value: amountIn }
          )
        } else if (isNativeOutput) {
          // Token -> ETH
          tx = await router.swapExactTokensForETH(
            amountIn,
            amountOutMin,
            path,
            account.address,
            deadline
          )
        } else {
          // Token -> Token
          tx = await router.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            account.address,
            deadline
          )
        }

        const receipt = await tx.wait()
        return { success: true, hash: receipt.hash }
      } catch (error: any) {
        console.error('Swap execution error:', error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [account, getRouterAddress]
  )

  const getQuote = useCallback(
    async (amountIn: string, path: string[]): Promise<string[]> => {
      if (!window.ethereum) {
        throw new Error('No ethereum provider found')
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const routerAddress = getRouterAddress()
        
        const router = new ethers.Contract(
          routerAddress,
          UNISWAP_V2_ROUTER_ABI,
          provider
        )

        const amounts = await router.getAmountsOut(amountIn, path)
        return amounts.map((a: bigint) => a.toString())
      } catch (error) {
        console.error('Quote error:', error)
        throw error
      }
    },
    [getRouterAddress]
  )

  return {
    executeSwap,
    getQuote,
    isLoading,
    routerAddress: getRouterAddress(),
  }
}
