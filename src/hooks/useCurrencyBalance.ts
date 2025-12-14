import { useState, useEffect, useCallback, useMemo } from 'react'
import { ethers } from 'ethers'
import { Currency, Token, CurrencyAmount } from '@uniswap/sdk-core'
import { useActiveAccount } from 'thirdweb/react'
import { ERC20_ABI } from '@/lib/luxfi/abi'

export function useCurrencyBalance(
  currency: Currency | undefined
): CurrencyAmount<Currency> | undefined {
  const account = useActiveAccount()
  const [balance, setBalance] = useState<CurrencyAmount<Currency> | undefined>()

  useEffect(() => {
    if (!account?.address || !currency) {
      setBalance(undefined)
      return
    }

    const fetchBalance = async () => {
      try {
        if (!window.ethereum) return

        const provider = new ethers.BrowserProvider(window.ethereum)

        if (currency.isNative) {
          const balanceWei = await provider.getBalance(account.address)
          setBalance(CurrencyAmount.fromRawAmount(currency, balanceWei.toString()))
        } else if (currency.isToken) {
          const token = currency as Token
          const contract = new ethers.Contract(token.address, ERC20_ABI, provider)
          const balanceRaw = await contract.balanceOf(account.address)
          setBalance(CurrencyAmount.fromRawAmount(currency, balanceRaw.toString()))
        }
      } catch (error) {
        console.error('Error fetching balance:', error)
        setBalance(undefined)
      }
    }

    fetchBalance()
  }, [account?.address, currency])

  return balance
}

export function useNativeCurrencyBalance(): string {
  const account = useActiveAccount()
  const [balance, setBalance] = useState('0')

  const fetchBalance = useCallback(async () => {
    if (!account?.address || !window.ethereum) return

    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const balanceWei = await provider.getBalance(account.address)
      setBalance(ethers.formatEther(balanceWei))
    } catch (error) {
      console.error('Error fetching native balance:', error)
      setBalance('0')
    }
  }, [account?.address])

  useEffect(() => {
    fetchBalance()
  }, [fetchBalance])

  return balance
}

export function useTokenBalances(
  tokens: Token[]
): Record<string, CurrencyAmount<Token>> {
  const account = useActiveAccount()
  const [balances, setBalances] = useState<Record<string, CurrencyAmount<Token>>>({})

  useEffect(() => {
    if (!account?.address || !window.ethereum || tokens.length === 0) {
      setBalances({})
      return
    }

    const fetchBalances = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const newBalances: Record<string, CurrencyAmount<Token>> = {}

        await Promise.all(
          tokens.map(async (token) => {
            try {
              const contract = new ethers.Contract(token.address, ERC20_ABI, provider)
              const balanceRaw = await contract.balanceOf(account.address)
              newBalances[token.address] = CurrencyAmount.fromRawAmount(token, balanceRaw.toString())
            } catch (error) {
              console.error(`Error fetching balance for ${token.symbol}:`, error)
            }
          })
        )

        setBalances(newBalances)
      } catch (error) {
        console.error('Error fetching token balances:', error)
      }
    }

    fetchBalances()
  }, [account?.address, tokens])

  return balances
}
