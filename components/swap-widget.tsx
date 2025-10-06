"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronDown, ArrowUpDown, TrendingUp, Info } from "lucide-react"

export function SwapWidget() {
  const [sellAmount, setSellAmount] = useState("")
  const [buyAmount, setBuyAmount] = useState("")
  const [isSwapping, setIsSwapping] = useState(false)
  const [sellToken, setSellToken] = useState({ symbol: "ETH", name: "Ethereum" })
  const [buyToken, setBuyToken] = useState({ symbol: "", name: "Select token" })

  const handleSellAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSellAmount(value)
    // Simulate price calculation
    if (value && !isNaN(Number(value))) {
      setBuyAmount((Number(value) * 2000).toString()) // Mock conversion rate
    } else {
      setBuyAmount("")
    }
  }, [])

  const handleSwapTokens = useCallback(() => {
    const tempToken = sellToken
    setSellToken(buyToken.symbol ? buyToken : { symbol: "", name: "Select token" })
    setBuyToken(tempToken)
    const tempAmount = sellAmount
    setSellAmount(buyAmount)
    setBuyAmount(tempAmount)
  }, [sellToken, buyToken, sellAmount, buyAmount])

  const handleSwap = useCallback(async () => {
    if (!sellAmount || !buyToken.symbol) return
    
    setIsSwapping(true)
    // Simulate swap process
    setTimeout(() => {
      setIsSwapping(false)
      // Reset or handle success
    }, 2000)
  }, [sellAmount, buyToken.symbol])

  const estimatedValue = sellAmount ? `≈ $${(Number(sellAmount) * 3000).toLocaleString()}` : "$0"
  const hasValidSwap = sellAmount && buyToken.symbol && Number(sellAmount) > 0

  return (
    <Card
      className="w-full max-w-md mx-auto bg-black/40 backdrop-blur-3xl border border-white/10 shadow-2xl shadow-black/50 relative overflow-hidden hover:border-white/20 transition-all duration-300"
      role="region"
      aria-label="Token swap interface"
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-green-500/20 p-[1px]">
        <div className="w-full h-full rounded-xl bg-black/40 backdrop-blur-xl"></div>
      </div>

      <div className="p-6 space-y-4 relative z-10">
        {/* Sell Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label htmlFor="sell-amount" className="text-sm text-gray-400 font-medium">
              You sell
            </label>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <TrendingUp className="w-3 h-3" />
              <span>Balance: 5.24 ETH</span>
            </div>
          </div>
          
          <div className="group bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-white/10 transition-all duration-200 focus-within:border-emerald-400/50 focus-within:ring-2 focus-within:ring-emerald-400/20">
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <Input
                  id="sell-amount"
                  type="number"
                  placeholder="0"
                  value={sellAmount}
                  onChange={handleSellAmountChange}
                  className="bg-transparent border-none text-2xl font-semibold text-white placeholder-gray-500 focus:outline-none p-0"
                  aria-label="Amount to sell"
                  min="0"
                  step="0.000001"
                />
                <div className="text-sm text-gray-400 mt-1" aria-live="polite">
                  {estimatedValue}
                </div>
              </div>
              
              <Button
                variant="outline"
                className="bg-gradient-to-r from-teal-500 to-emerald-600 border-teal-500/50 text-white hover:from-teal-600 hover:to-emerald-700 backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:scale-105 focus-visible-emerald active:scale-95 px-4 py-2"
                aria-label={`Select token to sell, currently ${sellToken.name}`}
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-5 h-5 rounded-full bg-gradient-to-br from-teal-300 to-emerald-500"
                    aria-hidden="true"
                  ></div>
                  <span className="font-medium">{sellToken.symbol}</span>
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center relative">
          <Button
            size="sm"
            variant="outline"
            onClick={handleSwapTokens}
            className="rounded-full bg-black/30 border-white/10 hover:bg-black/40 backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:scale-110 focus-visible-emerald active:scale-95 w-12 h-12 p-0"
            aria-label="Reverse swap direction"
            disabled={isSwapping}
          >
            <ArrowUpDown className={`w-4 h-4 transition-transform ${isSwapping ? 'animate-spin' : ''}`} />
          </Button>
          
          {/* Swap rate info */}
          {hasValidSwap && (
            <div className="absolute left-16 top-1/2 -translate-y-1/2 flex items-center space-x-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
              <Info className="w-3 h-3" />
              <span>1 ETH ≈ 2000 {buyToken.symbol}</span>
            </div>
          )}
        </div>

        {/* Buy Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label htmlFor="buy-amount" className="text-sm text-gray-400 font-medium">
              You receive
            </label>
            {buyToken.symbol && (
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <TrendingUp className="w-3 h-3" />
                <span>Balance: 0 {buyToken.symbol}</span>
              </div>
            )}
          </div>
          
          <div className="group bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-white/10 transition-all duration-200 focus-within:border-emerald-400/50 focus-within:ring-2 focus-within:ring-emerald-400/20">
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <Input
                  id="buy-amount"
                  type="number"
                  placeholder="0"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  className="bg-transparent border-none text-2xl font-semibold text-white placeholder-gray-500 focus:outline-none p-0"
                  aria-label="Amount to buy"
                  readOnly
                />
                <div className="text-sm text-gray-400 mt-1" aria-live="polite">
                  {buyAmount ? `≈ $${(Number(buyAmount) * 1.5).toLocaleString()}` : "$0"}
                </div>
              </div>
              
              <Button
                className={`backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:scale-105 focus-visible-emerald active:scale-95 px-4 py-2 ${
                  buyToken.symbol 
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white' 
                    : 'bg-white/10 hover:bg-white/15 border border-white/20 text-gray-300'
                }`}
                aria-label={buyToken.symbol ? `Selected token: ${buyToken.name}` : "Select token to buy"}
              >
                <div className="flex items-center space-x-2">
                  {buyToken.symbol ? (
                    <>
                      <div
                        className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-300 to-green-500"
                        aria-hidden="true"
                      ></div>
                      <span className="font-medium">{buyToken.symbol}</span>
                    </>
                  ) : (
                    <span>Select token</span>
                  )}
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Swap Action Button */}
        <Button
          onClick={handleSwap}
          disabled={!hasValidSwap || isSwapping}
          className="w-full bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 hover:from-emerald-600 hover:via-green-700 hover:to-teal-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] focus-visible-emerald active:scale-[0.98] disabled:scale-100"
          aria-label={isSwapping ? "Processing swap..." : hasValidSwap ? `Swap ${sellAmount} ${sellToken.symbol} for ${buyAmount} ${buyToken.symbol}` : "Enter amount and select token to swap"}
        >
          {isSwapping ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Swapping...</span>
            </div>
          ) : hasValidSwap ? (
            `Swap ${sellToken.symbol} → ${buyToken.symbol}`
          ) : buyToken.symbol ? (
            "Enter amount"
          ) : (
            "Select token"
          )}
        </Button>

        {/* Additional Info */}
        {hasValidSwap && (
          <div className="flex justify-between text-xs text-gray-400 pt-2 border-t border-white/5">
            <span>Network fee: ~$2.50</span>
            <span>Price impact: &lt; 0.01%</span>
          </div>
        )}
      </div>
    </Card>
  )
}
