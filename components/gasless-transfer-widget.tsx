"use client"

import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Wallet, 
  ArrowRight, 
  TrendingUp, 
  Info, 
  CheckCircle, 
  AlertTriangle,
  Loader2,
  ExternalLink,
  RefreshCw
} from "lucide-react"
import { useWeb3 } from '@/contexts/web3-context'
import { ethers } from 'ethers'
import { 
  NETWORKS, 
  TOKENS, 
  getRelayerEndpoint, 
  formatTokenAmount, 
  parseTokenAmount,
  getTokensByChain,
  getNetworkById,
  DEFAULTS
} from '@/constants'
import { NetworkSelector } from '@/components/NetworkSelector'
import { TokenSelector } from '@/components/TokenSelector'

// Types
interface FeeQuote {
  amount: string
  relayerFee: string
  total: string
  feePercentage: string
}

interface TransferResult {
  success: boolean
  txHash: string
  blockNumber: number
  gasUsed: string
  transferDetails: {
    from: string
    to: string
    amount: string
    relayerFee: string
  }
  explorerUrl: string
  error?: string
  details?: string[]
}

export function GaslessTransferWidget() {
  const {
    provider,
    signer,
    userAddress,
    isConnected,
    isConnecting,
    connectWallet,
    disconnectWallet,
    isTransacting,
    setIsTransacting,
    showStatus
  } = useWeb3()

  // Network and token selection state
  const [selectedChain, setSelectedChain] = useState<keyof typeof NETWORKS>('BASE_SEPOLIA')
  const [selectedToken, setSelectedToken] = useState<string>('USDC')
  
  // Balance state
  const [nativeBalance, setNativeBalance] = useState('0.0000')
  const [tokenBalance, setTokenBalance] = useState('0.000000')
  const [isLoadingBalances, setIsLoadingBalances] = useState(false)

  // Form state
  const [recipientAddress, setRecipientAddress] = useState('0x65De77117Fe7212aA0CfD8b2F97116deC4aAdE47')
  const [transferAmount, setTransferAmount] = useState('')
  const [currentQuote, setCurrentQuote] = useState<FeeQuote | null>(null)
  const [isGettingQuote, setIsGettingQuote] = useState(false)
  const [transferResult, setTransferResult] = useState<TransferResult | null>(null)

  // Get current network and token config
  const currentNetwork = useMemo(() => NETWORKS[selectedChain], [selectedChain])
  const currentTokenConfig = useMemo(() => {
    const tokenConfig = TOKENS[selectedChain][selectedToken as keyof typeof TOKENS[typeof selectedChain]]
    return tokenConfig || null
  }, [selectedToken, selectedChain])

  const availableTokens = useMemo(() => {
    return Object.values(TOKENS[selectedChain])
  }, [selectedChain])

  // Validation
  const isValidRecipient = useMemo(() => {
    if (!recipientAddress) return false
    try {
      return (ethers as any).utils.isAddress(recipientAddress)
    } catch {
      return false
    }
  }, [recipientAddress])

  const isValidAmount = useMemo(() => {
    if (!transferAmount) return false
    const amount = parseFloat(transferAmount)
    return !isNaN(amount) && amount > 0
  }, [transferAmount])

  const hasValidInputs = isValidRecipient && isValidAmount && currentTokenConfig

  // Load balances when wallet connects or chain/token changes
  const loadBalances = useCallback(async () => {
    if (!userAddress || !currentNetwork || !currentTokenConfig) return

    try {
      setIsLoadingBalances(true)

      // Validate token address before making calls
      if (!currentTokenConfig.address || !ethers.utils.isAddress(currentTokenConfig.address)) {
        console.warn('Invalid token address:', currentTokenConfig.address)
        setNativeBalance('0.0000')
        setTokenBalance('0.000000')
        setIsLoadingBalances(false)
        return
      }

      // CRITICAL: Always create fresh provider from window.ethereum to avoid stale network issues
      // This ensures we're always using the current network from MetaMask
      if (!window.ethereum) {
        console.error('MetaMask not available')
        setNativeBalance('0.0000')
        setTokenBalance('0.000000')
        setIsLoadingBalances(false)
        return
      }

      const freshProvider = new ethers.providers.Web3Provider((window as any).ethereum)
      
      // Verify we're on the correct network
      const network = await freshProvider.getNetwork()
      if (network.chainId !== currentNetwork.chainId) {
        // Network mismatch during transition - silently return
        // Balances will reload once network switch completes
        setIsLoadingBalances(false)
        return
      }

      // Get native token balance
      const balance = await freshProvider.getBalance(userAddress)
      const formattedBalance = (ethers as any).utils.formatEther(balance)
      setNativeBalance(parseFloat(formattedBalance).toFixed(4))

      // Get token balance with retry logic and silent error handling
      let retries = 0
      const maxRetries = 2
      
      while (retries <= maxRetries) {
        try {
          const tokenContract = new ethers.Contract(
            currentTokenConfig.address,
            ['function balanceOf(address) view returns (uint256)'],
            freshProvider
          )
          const tokenBal = await tokenContract.balanceOf(userAddress)
          const formattedTokenBalance = formatTokenAmount(tokenBal.toString(), currentTokenConfig.decimals)
          setTokenBalance(formattedTokenBalance)
          break // Success, exit retry loop
          
        } catch (error: any) {
          retries++
          if (retries > maxRetries) {
            // Don't throw - just return silently if all retries failed
            // This prevents CALL_EXCEPTION errors during network transitions
            if (error.code === 'CALL_EXCEPTION') {
              // Expected during network switch - completely silent
              setTokenBalance('0.000000')
              setIsLoadingBalances(false)
              return
            }
            throw error // Re-throw unexpected errors
          }
          // Silent retry - no console log
          await new Promise(resolve => setTimeout(resolve, 500))
        }
      }

    } catch (error: any) {
      // Completely silent error handling during network transitions
      // Only log to console, never show to user
      if (error.code === 'CALL_EXCEPTION' || error.code === 'NETWORK_ERROR') {
        // Expected during network transition - no action needed
        // Balances will reload when transition completes
      } else if (error.code === 'INVALID_ARGUMENT') {
        console.warn('Invalid token configuration:', currentTokenConfig?.symbol)
      } else {
        // Log unexpected errors for debugging
        console.error('Error loading balances:', error.code || error.message)
      }
      
      setNativeBalance('0.0000')
      setTokenBalance('0.000000')
    } finally {
      setIsLoadingBalances(false)
    }
  }, [userAddress, currentNetwork, currentTokenConfig])

  // Load balances when wallet connects or network changes from web3 context
  // This listens to the web3 context's provider updates
  useEffect(() => {
    if (isConnected && userAddress && currentNetwork && currentTokenConfig && provider) {
      // Delay balance loading to ensure provider is fully updated after network switches
      const timer = setTimeout(() => {
        console.log('Loading balances after provider update for', currentNetwork.name, currentTokenConfig.symbol)
        loadBalances()
      }, 800) // Increased to 800ms for better reliability
      
      return () => clearTimeout(timer)
    }
  }, [isConnected, userAddress, provider, loadBalances, currentNetwork, currentTokenConfig])

  // Get transfer quote from relayer
  const getQuote = useCallback(async () => {
    if (!hasValidInputs || !isConnected || !currentTokenConfig || !currentNetwork) return

    try {
      setIsGettingQuote(true)
      showStatus('Getting transfer quote...', 'info')

      const amountWei = parseTokenAmount(transferAmount, currentTokenConfig.decimals)
      
      // New relayer endpoint: /api/v1/relayer/fee/:chainId/:token/:amount
      const endpoint = getRelayerEndpoint(`/fee/${currentNetwork.chainId}/${selectedToken}/${amountWei}`)
      
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to get quote')
      }

      const data = await response.json()
      
      // Calculate fee and total properly
      const amountBN = (ethers as any).BigNumber.from(amountWei)
      const feeBN = data.fee ? (ethers as any).BigNumber.from(data.fee) : amountBN.mul(25).div(10000) // 0.25%
      const totalBN = amountBN.add(feeBN)
      
      // Transform response to match our FeeQuote interface
      const quote: FeeQuote = {
        amount: amountWei,
        relayerFee: feeBN.toString(),
        total: totalBN.toString(),
        feePercentage: data.feePercentage || `${currentNetwork.feePercent}%`
      }
      
      setCurrentQuote(quote)
      showStatus('Quote received! Ready to transfer.', 'success')

    } catch (error: any) {
      console.error('Quote error:', error)
      showStatus(`Quote failed: ${error.message}`, 'error')
      setCurrentQuote(null)
    } finally {
      setIsGettingQuote(false)
    }
  }, [transferAmount, hasValidInputs, isConnected, currentTokenConfig, currentNetwork, selectedChain, selectedToken, showStatus])

  // Execute gasless transfer
  const executeTransfer = useCallback(async () => {
    if (!currentQuote || !hasValidInputs || !isConnected || !signer || !currentTokenConfig || !currentNetwork) return

    // This will hold the signer to use (either current or freshly created after network switch)
    let activeSigner = signer

    try {
      setIsTransacting(true)
      showStatus('Preparing gasless transfer...', 'info')

      // Check if user is on the correct network
      const network = await provider.getNetwork()
      if (network.chainId !== currentNetwork.chainId) {
        showStatus('Please switch to ' + currentNetwork.name + ' in MetaMask', 'warning')
        
        // Try to switch network automatically
        try {
          await (window as any).ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: currentNetwork.chainIdHex }],
          })
          showStatus('Network switched! Waiting for provider update...', 'success')
          // Wait longer for provider to fully update
          await new Promise(resolve => setTimeout(resolve, 2000))
          
          // CRITICAL: Get fresh provider and signer after network switch
          const newProvider = new ethers.providers.Web3Provider((window as any).ethereum)
          activeSigner = newProvider.getSigner()
          
          // Verify we're on the correct network now
          const updatedNetwork = await newProvider.getNetwork()
          if (updatedNetwork.chainId !== currentNetwork.chainId) {
            throw new Error('Network switch failed. Please manually switch to ' + currentNetwork.name)
          }
          
          showStatus('Network confirmed! Continuing transfer...', 'success')
          
        } catch (switchError: any) {
          // Network not added to MetaMask, try to add it
          if (switchError.code === 4902) {
            try {
              await (window as any).ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: currentNetwork.chainIdHex,
                  chainName: currentNetwork.name,
                  nativeCurrency: {
                    name: currentNetwork.nativeToken.name,
                    symbol: currentNetwork.nativeToken.symbol,
                    decimals: currentNetwork.nativeToken.decimals,
                  },
                  rpcUrls: [currentNetwork.rpcUrl],
                  blockExplorerUrls: [currentNetwork.explorerUrl],
                }],
              })
              showStatus('Network added! Please try again.', 'success')
              setIsTransacting(false)
              return
            } catch (addError) {
              throw new Error('Please add ' + currentNetwork.name + ' to MetaMask and try again')
            }
          } else {
            throw new Error('Please switch to ' + currentNetwork.name + ' in MetaMask')
          }
        }
      }

      // Step 1: Get user nonce from contract using RPC provider (not MetaMask)
      // This avoids network mismatch issues
      showStatus('Getting user nonce...', 'info')
      const rpcProvider = new ethers.providers.JsonRpcProvider(currentNetwork.rpcUrl)
      const contractAbi = ['function nonces(address user) view returns (uint256)']
      const contract = new ethers.Contract(currentNetwork.gaslessContract, contractAbi, rpcProvider)
      const nonce = await contract.nonces(userAddress)

      // Step 2: Get token permit nonce (using RPC provider)
      showStatus('Getting token permit nonce...', 'info')
      const tokenContract = new ethers.Contract(currentTokenConfig.address, [
        'function nonces(address owner) view returns (uint256)',
        'function name() view returns (string)'
      ], rpcProvider)
      const permitNonce = await tokenContract.nonces(userAddress)
      const tokenName = await tokenContract.name()

      // Step 3: Generate permit signature
      showStatus('Please sign the token permit in your wallet...', 'info')
      const permitDeadline = Math.floor(Date.now() / 1000) + (60 * DEFAULTS.TRANSACTION_DEADLINE_MINUTES)
      const totalRequired = (ethers as any).BigNumber.from(currentQuote.amount).add(currentQuote.relayerFee)

      // Determine correct permit domain based on token and chain
      let permitDomain
      if (selectedToken === 'USDC') {
        // Base Sepolia USDC uses "USDC" (not "USD Coin") and version "2"
        if (selectedChain === 'BASE_SEPOLIA') {
          permitDomain = {
            name: 'USDC',
            version: '2',
            chainId: currentNetwork.chainId,
            verifyingContract: currentTokenConfig.address
          }
        } 
        // Arbitrum and Avalanche USDC use "USD Coin" and version "2"
        else {
          permitDomain = {
            name: 'USD Coin',
            version: '2',
            chainId: currentNetwork.chainId,
            verifyingContract: currentTokenConfig.address
          }
        }
      } else if (selectedToken === 'PYUSD') {
        // PYUSD uses its actual name from the contract
        permitDomain = {
          name: tokenName,
          version: '1',
          chainId: currentNetwork.chainId,
          verifyingContract: currentTokenConfig.address
        }
      } else {
        // Fallback for other tokens
        permitDomain = {
          name: tokenName,
          version: '1',
          chainId: currentNetwork.chainId,
          verifyingContract: currentTokenConfig.address
        }
      }

      const permitTypedData = {
        domain: permitDomain,
        types: {
          Permit: [
            { name: 'owner', type: 'address' },
            { name: 'spender', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
            { name: 'deadline', type: 'uint256' }
          ]
        },
        primaryType: 'Permit',
        message: {
          owner: userAddress,
          spender: currentNetwork.gaslessContract,
          value: totalRequired.toString(),
          nonce: permitNonce.toString(),
          deadline: permitDeadline.toString()
        }
      }

      const permitSignature = await (activeSigner as any)._signTypedData(
        permitTypedData.domain,
        permitTypedData.types,
        permitTypedData.message
      )

      const permitSig = (ethers as any).utils.splitSignature(permitSignature)

      // Step 4: Generate transfer authorization signature
      showStatus('Please sign the transfer authorization in your wallet...', 'info')
      const transferDeadline = Math.floor(Date.now() / 1000) + (60 * DEFAULTS.TRANSACTION_DEADLINE_MINUTES)

      // CRITICAL: Use "SmoothSend" (not "SmoothSendGasless") to match contract
      const transferTypedData = {
        domain: {
          name: 'SmoothSend',
          version: '1',
          chainId: currentNetwork.chainId,
          verifyingContract: currentNetwork.gaslessContract
        },
        types: {
          Transfer: [
            { name: 'from', type: 'address' },
            { name: 'to', type: 'address' },
            { name: 'token', type: 'address' },
            { name: 'amount', type: 'uint256' },
            { name: 'fee', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
            { name: 'deadline', type: 'uint256' }
          ]
        },
        primaryType: 'Transfer',
        message: {
          from: userAddress,
          to: recipientAddress,
          token: currentTokenConfig.address,
          amount: currentQuote.amount,
          fee: currentQuote.relayerFee,
          nonce: nonce.toString(),  // BigNumber -> string for EIP-712
          deadline: transferDeadline  // Number type for EIP-712
        }
      }

      const transferSignature = await (activeSigner as any)._signTypedData(
        transferTypedData.domain,
        transferTypedData.types,
        transferTypedData.message
      )

      // Step 5: Execute transfer via relayer
      showStatus('Executing gasless transfer... This may take 10-15 seconds.', 'info')

      const relayEndpoint = getRelayerEndpoint('/relay')

      const transferResponse = await fetch(relayEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chainId: currentNetwork.chainId,
          request: {
            from: userAddress,
            to: recipientAddress,
            token: currentTokenConfig.address,
            amount: currentQuote.amount,
            fee: currentQuote.relayerFee,
            nonce: nonce.toString(),
            deadline: transferDeadline.toString()
          },
          permit: {
            value: totalRequired.toString(),
            deadline: permitDeadline.toString(),
            v: permitSig.v,
            r: permitSig.r,
            s: permitSig.s
          },
          signature: transferSignature
        })
      })

      const result = await transferResponse.json()

      if (!result.success) {
        const errorMessage = result.message || result.error || 'Transfer failed'
        throw new Error(errorMessage)
      }

      // Transform relayer response to TransferResult format
      const transformedResult: TransferResult = {
        success: true,
        txHash: result.transactionHash || result.txHash || '',
        blockNumber: result.blockNumber || 0, // Get block number from relayer response
        gasUsed: result.gasUsed || 'N/A',
        transferDetails: {
          from: userAddress || '',
          to: recipientAddress,
          amount: currentQuote.amount,
          relayerFee: currentQuote.relayerFee
        },
        explorerUrl: `${currentNetwork.explorerUrl}/tx/${result.transactionHash || result.txHash}`
      }

      setTransferResult(transformedResult)
      showStatus('🎉 Gasless transfer completed successfully!', 'success')

      // Refresh balances after a short delay
      setTimeout(() => loadBalances(), 2000)

    } catch (error: any) {
      console.error('Transfer error:', error)
      
      // Provide more specific error messages
      let errorMessage = error.message || 'Unknown error occurred'
      
      if (error.code === 'CALL_EXCEPTION') {
        errorMessage = 'Contract call failed. Please ensure you are on the correct network and try again.'
      } else if (error.code === 'NETWORK_ERROR') {
        errorMessage = 'Network error. Please check your connection and try again.'
      } else if (error.code === 4001) {
        errorMessage = 'Transaction rejected by user.'
      } else if (error.message?.includes('user rejected')) {
        errorMessage = 'Signature rejected by user.'
      } else if (error.message?.includes('Invalid signature')) {
        errorMessage = 'Invalid signature. Please ensure you are signing with the correct wallet.'
      }
      
      showStatus(`Transfer failed: ${errorMessage}`, 'error')
      
      // Don't disconnect wallet on error - just reset transaction state
      setIsTransacting(false)
    } finally {
      setIsTransacting(false)
    }
  }, [
    currentQuote, 
    hasValidInputs, 
    isConnected, 
    signer, 
    recipientAddress, 
    userAddress, 
    provider, 
    setIsTransacting, 
    showStatus, 
    loadBalances,
    currentTokenConfig,
    currentNetwork,
    selectedChain,
    selectedToken
  ])

  // Reset form for new transfer
  const resetForm = useCallback(() => {
    setTransferAmount('')
    setCurrentQuote(null)
    setTransferResult(null)
    showStatus('Ready for new transfer', 'info')
  }, [showStatus])

  // Handle network change
  const handleNetworkChange = useCallback(async (chain: keyof typeof NETWORKS) => {
    console.log('Network change requested:', chain)
    
    // Update UI immediately
    setSelectedChain(chain)
    setCurrentQuote(null)
    setTransferAmount('')
    
    const newNetwork = NETWORKS[chain]
    
    // Reset to USDC if current token not available on new network
    const tokens = TOKENS[chain]
    if (!tokens[selectedToken as keyof typeof tokens]) {
      console.log('Token not available on new network, switching to USDC')
      setSelectedToken('USDC')
    }
    
    // If wallet is connected, prompt MetaMask to switch networks
    if (isConnected && window.ethereum) {
      try {
        showStatus(`Switching to ${newNetwork.name}...`, 'info')
        
        // Clear balances while switching
        setNativeBalance('0.0000')
        setTokenBalance('0.000000')
        
        await (window as any).ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: newNetwork.chainIdHex }],
        })
        
        showStatus(`Switched to ${newNetwork.name}`, 'success')
        
        // Balances will be loaded by the useEffect watching provider changes
        
      } catch (switchError: any) {
        // Network not added to MetaMask
        if (switchError.code === 4902) {
          try {
            showStatus(`Adding ${newNetwork.name} to MetaMask...`, 'info')
            
            await (window as any).ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: newNetwork.chainIdHex,
                chainName: newNetwork.name,
                nativeCurrency: {
                  name: newNetwork.nativeToken.name,
                  symbol: newNetwork.nativeToken.symbol,
                  decimals: newNetwork.nativeToken.decimals,
                },
                rpcUrls: [newNetwork.rpcUrl],
                blockExplorerUrls: [newNetwork.explorerUrl],
              }],
            })
            
            showStatus(`Added ${newNetwork.name} to MetaMask`, 'success')
            
          } catch (addError) {
            console.error('Failed to add network:', addError)
            showStatus(`Please add ${newNetwork.name} to MetaMask manually`, 'error')
          }
        } else if (switchError.code === 4001) {
          // User rejected the switch
          console.log('User cancelled network switch')
          showStatus('Network switch cancelled', 'warning')
        } else {
          console.error('Network switch error:', switchError)
          showStatus('Failed to switch network', 'error')
        }
      }
    } else if (!isConnected) {
      // Not connected - just update UI
      showStatus(`Selected ${newNetwork.name}. Connect wallet to continue.`, 'info')
    }
  }, [selectedToken, isConnected, showStatus])

  // Handle token change
  const handleTokenChange = useCallback((tokenSymbol: string) => {
    console.log('Token change requested:', tokenSymbol)
    
    setSelectedToken(tokenSymbol)
    setCurrentQuote(null)
    setTransferAmount('')
    
    // The useEffect watching provider will reload balances automatically
    // Just show a status message
    if (isConnected) {
      showStatus(`Switched to ${tokenSymbol}`, 'info')
    }
  }, [isConnected, showStatus])

  // If transfer was successful, show result
  if (transferResult && currentTokenConfig) {
    return (
      <Card className="w-full max-w-lg mx-auto bg-black/40 backdrop-blur-3xl border-2 border-[#0db059]/40 shadow-2xl shadow-[#0db059]/30">
        <div className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <div className="relative w-16 h-16 mx-auto">
              <CheckCircle className="w-16 h-16 text-[#0db059] mx-auto drop-shadow-[0_0_15px_rgba(13,176,89,0.6)]" />
            </div>
            <h3 className="text-2xl font-bold text-white">Transfer Complete!</h3>
            <p className="text-gray-300">Your gasless {selectedToken} transfer was successful</p>
          </div>

          <div className="space-y-4 bg-[#0db059]/10 rounded-xl p-4 border-2 border-[#0db059]/30">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Amount:</span>
                <p className="text-white font-semibold">
                  {formatTokenAmount(transferResult.transferDetails.amount, currentTokenConfig.decimals)} {selectedToken}
                </p>
              </div>
              <div>
                <span className="text-gray-400">Fee:</span>
                <p className="text-white font-semibold">
                  {formatTokenAmount(transferResult.transferDetails.relayerFee, currentTokenConfig.decimals)} {selectedToken}
                </p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400">To:</span>
                <p className="text-white font-mono text-xs break-all">{transferResult.transferDetails.to}</p>
              </div>
              <div>
                <span className="text-gray-400">Block:</span>
                <p className="text-white">
                  {transferResult.blockNumber > 0 
                    ? transferResult.blockNumber.toLocaleString() 
                    : 'Confirming...'
                  }
                </p>
              </div>
              <div>
                <span className="text-gray-400">Gas:</span>
                <p className="text-white">{transferResult.gasUsed} (paid by relayer)</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => window.open(transferResult.explorerUrl, '_blank')}
              className="flex-1 bg-[#0db059] hover:bg-[#0a9048] text-white flex items-center gap-2 shadow-lg shadow-[#0db059]/30"
            >
              View Transaction
              <ExternalLink className="w-4 h-4" />
            </Button>
            <Button
              onClick={resetForm}
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              New Transfer
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-lg mx-auto bg-black/40 backdrop-blur-3xl border border-white/10 shadow-2xl shadow-black/50 hover:border-emerald-500/30 transition-all duration-300">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Gasless Token Transfer</h2>
          <p className="text-gray-400">Send tokens without paying gas fees</p>
        </div>

        {/* Connection Status */}
        {!isConnected ? (
          <div className="text-center space-y-4">
            <Wallet className="w-12 h-12 text-[#10b981] mx-auto" />
            <div className="space-y-2">
              <p className="text-white font-semibold">Connect Your Wallet</p>
              <p className="text-gray-400 text-sm">Connect MetaMask to start sending tokens without gas fees</p>
            </div>
            <Button
              onClick={connectWallet}
              disabled={isConnecting}
              className="w-full bg-gradient-to-r from-[#10b981] via-[#14b8a6] to-[#06b6d4] hover:from-[#059669] hover:via-[#0f9b8e] hover:to-[#0891b2] text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </>
              )}
            </Button>
          </div>
        ) : (
          <>
            {/* Wallet Info */}
            <div className="bg-black/20 rounded-xl p-4 border border-white/5">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-white font-semibold">Connected Wallet</h3>
                <Button
                  onClick={disconnectWallet}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  Disconnect
                </Button>
              </div>
              <p className="text-gray-300 font-mono text-sm mb-3">{userAddress}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">{currentNetwork?.nativeToken.symbol} Balance:</span>
                  <p className="text-white font-semibold">{nativeBalance} {currentNetwork?.nativeToken.symbol}</p>
                </div>
                <div>
                  <span className="text-gray-400">{selectedToken} Balance:</span>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-semibold">{tokenBalance} {selectedToken}</p>
                    <Button
                      onClick={loadBalances}
                      variant="ghost"
                      size="sm"
                      className="p-1 h-auto text-gray-400 hover:text-white"
                      disabled={isLoadingBalances}
                    >
                      <RefreshCw className={`w-3 h-3 ${isLoadingBalances ? 'animate-spin' : ''}`} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Network and Token Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">Network</label>
                <NetworkSelector
                  selectedChain={selectedChain}
                  onChainChange={handleNetworkChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">Token</label>
                <TokenSelector
                  selectedChain={selectedChain}
                  selectedToken={selectedToken}
                  onTokenChange={handleTokenChange}
                />
              </div>
            </div>

            {/* Transfer Form */}
            <div className="space-y-4">
              {/* Recipient Address */}
              <div className="space-y-2">
                <label htmlFor="recipient" className="text-sm text-gray-400 font-medium">
                  Recipient Address
                </label>
                <div className="relative">
                  <Input
                    id="recipient"
                    type="text"
                    placeholder="0x..."
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    className="bg-black/20 border-white/10 text-white placeholder-gray-500 focus:border-emerald-400/50 focus:ring-emerald-400/20"
                  />
                  {recipientAddress && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {isValidRecipient ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      )}
                    </div>
                  )}
                </div>
                {recipientAddress && !isValidRecipient && (
                  <p className="text-yellow-400 text-xs">Please enter a valid Ethereum address</p>
                )}
              </div>

              {/* Transfer Amount */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="amount" className="text-sm text-gray-400 font-medium">
                    Amount ({selectedToken})
                  </label>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <TrendingUp className="w-3 h-3" />
                    <span>Balance: {tokenBalance} {selectedToken}</span>
                  </div>
                </div>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={transferAmount}
                    onChange={(e) => {
                      setTransferAmount(e.target.value)
                      setCurrentQuote(null) // Clear quote when amount changes
                    }}
                    className="bg-black/20 border-white/10 text-white placeholder-gray-500 focus:border-emerald-400/50 focus:ring-emerald-400/20 text-lg font-semibold"
                    min="0"
                    step={currentTokenConfig?.decimals === 6 ? "0.01" : "0.0001"}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                    {selectedToken}
                  </div>
                </div>
              </div>

              {/* Quote Info */}
              {currentQuote && currentTokenConfig && (
                <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <Info className="w-4 h-4" />
                    Transfer Quote
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Amount:</span>
                      <span className="text-white">
                        {formatTokenAmount(currentQuote.amount, currentTokenConfig.decimals)} {selectedToken}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Relayer Fee ({currentQuote.feePercentage}):</span>
                      <span className="text-white">
                        {formatTokenAmount(currentQuote.relayerFee, currentTokenConfig.decimals)} {selectedToken}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold border-t border-emerald-500/20 pt-1 mt-2">
                      <span className="text-emerald-400">Total Deducted:</span>
                      <span className="text-emerald-400">
                        {formatTokenAmount(currentQuote.total, currentTokenConfig.decimals)} {selectedToken}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={getQuote}
                  disabled={!hasValidInputs || isGettingQuote}
                  className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white"
                >
                  {isGettingQuote ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Getting Quote...
                    </>
                  ) : (
                    'Get Quote'
                  )}
                </Button>

                {currentQuote && (
                  <Button
                    onClick={executeTransfer}
                    disabled={isTransacting}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white"
                  >
                    {isTransacting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Transferring...
                      </>
                    ) : (
                      <>
                        Send {selectedToken}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Info Footer */}
            <div className="bg-blue-950/20 border border-blue-500/20 rounded-xl p-4 text-sm">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-blue-300">
                  <p className="font-semibold mb-1">How it works:</p>
                  <p className="text-blue-200 text-xs">
                    You'll sign two messages: one to approve {selectedToken} spending, and one to authorize the transfer. 
                    Our relayer pays the gas fees and deducts a {currentNetwork?.feePercent}% fee from your {selectedToken}.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
