import { useState, useCallback, useMemo } from 'react'
import { ethers } from 'ethers'
import { Token, Percent } from '@uniswap/sdk-core'
import { useActiveAccount } from 'thirdweb/react'
import { V2_FACTORY_ADDRESSES, V2_ROUTER_ADDRESS } from '@/lib/luxfi/constants/addresses'
import { SupportedChainId } from '@/lib/luxfi/constants/chains'
import { UNISWAP_V2_FACTORY_ABI, UNISWAP_V2_PAIR_ABI, ERC20_ABI } from '@/lib/luxfi/abi'
import { useToast } from './use-toast'

export interface PoolPosition {
  token0: Token
  token1: Token
  pairAddress: string
  liquidity: string
  token0Amount: string
  token1Amount: string
  poolShare: string
}

export function useLiquidityPositions(chainId: SupportedChainId = SupportedChainId.MAINNET) {
  const account = useActiveAccount()
  const [positions, setPositions] = useState<PoolPosition[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const factoryAddress = useMemo(() => {
    return V2_FACTORY_ADDRESSES[chainId] || V2_FACTORY_ADDRESSES[SupportedChainId.MAINNET]
  }, [chainId])

  const routerAddress = useMemo(() => {
    return V2_ROUTER_ADDRESS[chainId] || V2_ROUTER_ADDRESS[SupportedChainId.MAINNET]
  }, [chainId])

  const getPairAddress = useCallback(
    async (token0Address: string, token1Address: string): Promise<string | null> => {
      if (!window.ethereum) return null

      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const factory = new ethers.Contract(factoryAddress, UNISWAP_V2_FACTORY_ABI, provider)
        const pairAddress = await factory.getPair(token0Address, token1Address)
        
        if (pairAddress === ethers.ZeroAddress) {
          return null
        }
        
        return pairAddress
      } catch (error) {
        console.error('Error getting pair address:', error)
        return null
      }
    },
    [factoryAddress]
  )

  const getPoolReserves = useCallback(
    async (pairAddress: string): Promise<{ reserve0: bigint; reserve1: bigint } | null> => {
      if (!window.ethereum) return null

      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const pair = new ethers.Contract(pairAddress, UNISWAP_V2_PAIR_ABI, provider)
        const [reserve0, reserve1] = await pair.getReserves()
        return { reserve0, reserve1 }
      } catch (error) {
        console.error('Error getting reserves:', error)
        return null
      }
    },
    []
  )

  const getLPBalance = useCallback(
    async (pairAddress: string): Promise<string> => {
      if (!window.ethereum || !account?.address) return '0'

      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const pair = new ethers.Contract(pairAddress, UNISWAP_V2_PAIR_ABI, provider)
        const balance = await pair.balanceOf(account.address)
        return ethers.formatEther(balance)
      } catch (error) {
        console.error('Error getting LP balance:', error)
        return '0'
      }
    },
    [account?.address]
  )

  const addLiquidity = useCallback(
    async (
      token0Address: string,
      token1Address: string,
      amount0: string,
      amount1: string,
      slippage: Percent = new Percent(50, 10_000)
    ) => {
      if (!account?.address || !window.ethereum) {
        throw new Error('Wallet not connected')
      }

      setIsLoading(true)

      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()

        const slippageMultiplier = 10000n - BigInt(slippage.numerator.toString())
        const amount0Min = (BigInt(ethers.parseEther(amount0).toString()) * slippageMultiplier) / 10000n
        const amount1Min = (BigInt(ethers.parseEther(amount1).toString()) * slippageMultiplier) / 10000n

        const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes

        // Approve tokens
        const token0Contract = new ethers.Contract(token0Address, ERC20_ABI, signer)
        const token1Contract = new ethers.Contract(token1Address, ERC20_ABI, signer)

        await token0Contract.approve(routerAddress, ethers.parseEther(amount0))
        await token1Contract.approve(routerAddress, ethers.parseEther(amount1))

        const router = new ethers.Contract(
          routerAddress,
          [
            'function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline) returns (uint amountA, uint amountB, uint liquidity)',
          ],
          signer
        )

        const tx = await router.addLiquidity(
          token0Address,
          token1Address,
          ethers.parseEther(amount0),
          ethers.parseEther(amount1),
          amount0Min,
          amount1Min,
          account.address,
          deadline
        )

        const receipt = await tx.wait()
        
        toast({
          title: 'Liquidity Added',
          description: 'Successfully added liquidity to the pool',
        })

        return { success: true, hash: receipt.hash }
      } catch (error: any) {
        console.error('Add liquidity error:', error)
        toast({
          title: 'Add Liquidity Failed',
          description: error.message || 'Failed to add liquidity',
          variant: 'destructive',
        })
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [account?.address, routerAddress, toast]
  )

  const removeLiquidity = useCallback(
    async (
      pairAddress: string,
      token0Address: string,
      token1Address: string,
      liquidityAmount: string,
      slippage: Percent = new Percent(50, 10_000)
    ) => {
      if (!account?.address || !window.ethereum) {
        throw new Error('Wallet not connected')
      }

      setIsLoading(true)

      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()

        const deadline = Math.floor(Date.now() / 1000) + 60 * 20

        // Approve LP tokens
        const pair = new ethers.Contract(pairAddress, UNISWAP_V2_PAIR_ABI, signer)
        await pair.approve(routerAddress, ethers.parseEther(liquidityAmount))

        const router = new ethers.Contract(
          routerAddress,
          [
            'function removeLiquidity(address tokenA, address tokenB, uint liquidity, uint amountAMin, uint amountBMin, address to, uint deadline) returns (uint amountA, uint amountB)',
          ],
          signer
        )

        const tx = await router.removeLiquidity(
          token0Address,
          token1Address,
          ethers.parseEther(liquidityAmount),
          0, // amountAMin - accepting any amount for simplicity
          0, // amountBMin
          account.address,
          deadline
        )

        const receipt = await tx.wait()
        
        toast({
          title: 'Liquidity Removed',
          description: 'Successfully removed liquidity from the pool',
        })

        return { success: true, hash: receipt.hash }
      } catch (error: any) {
        console.error('Remove liquidity error:', error)
        toast({
          title: 'Remove Liquidity Failed',
          description: error.message || 'Failed to remove liquidity',
          variant: 'destructive',
        })
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [account?.address, routerAddress, toast]
  )

  return {
    positions,
    isLoading,
    factoryAddress,
    routerAddress,
    getPairAddress,
    getPoolReserves,
    getLPBalance,
    addLiquidity,
    removeLiquidity,
  }
}
