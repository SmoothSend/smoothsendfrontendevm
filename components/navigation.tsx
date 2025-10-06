"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Wallet } from "lucide-react"
import { useWeb3 } from "@/contexts/web3-context"
import { RelayerStatus } from "@/components/RelayerStatus"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isConnected, isConnecting, userAddress, connectWallet, disconnectWallet } = useWeb3()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleJoinWaitlist = () => {
    window.open('https://forms.gle/your-waitlist-form', '_blank')
  }

  const handleConnectWallet = () => {
    if (isConnected) {
      disconnectWallet()
    } else {
      connectWallet()
    }
  }

  const navItems = [
    { label: "Transfer", href: "#gasless-transfer-widget", description: "Send USDC without gas fees" },
    { label: "Features", href: "#features-heading", description: "Learn about gasless transfers" },
    { label: "Stats", href: "#stats-heading", description: "View network statistics" }
  ]

  return (
    <nav
      className="relative z-20 bg-black/40 backdrop-blur-xl border-b border-white/5 nav-backdrop"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <img 
              src="/smoothsendlogo.png" 
              alt="SmoothSend Logo" 
              className="w-8 h-8 rounded-full shadow-lg"
            />
            <span className="text-xl font-bold text-white">SmoothSend</span>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="text-white hover:text-emerald-400 hover:bg-white/10 transition-all duration-200 hover:shadow-lg hover:scale-105 focus-visible-emerald px-4 py-2"
                  aria-label={item.description}
                  onClick={() => {
                    const element = document.getElementById(item.href.substring(1))
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            
            {/* Relayer Status Indicator */}
            <RelayerStatus className="hidden lg:flex" />

            {/* Connect Button */}
            <Button
              onClick={handleConnectWallet}
              disabled={isConnecting}
              className="bg-gradient-to-r from-[#10b981] via-[#14b8a6] to-[#06b6d4] hover:from-[#059669] hover:via-[#0f9b8e] hover:to-[#0891b2] text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus-visible-emerald active:scale-95 flex items-center gap-2 px-4 py-2"
              aria-label={isConnected ? "Disconnect wallet" : "Connect wallet to start gasless transfers"}
            >
              {isConnecting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Connecting...
                </>
              ) : isConnected ? (
                <>
                  <Wallet className="w-4 h-4" />
                  {userAddress ? `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : 'Connected'}
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  Connect
                </>
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              onClick={toggleMenu}
              className="md:hidden text-white hover:text-emerald-400 transition-colors focus-visible-emerald p-2"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  onClick={() => {
                    const element = document.getElementById(item.href.substring(1))
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                    setIsMenuOpen(false) // Close menu after navigation
                  }}
                  className="text-white hover:text-emerald-400 hover:bg-white/10 justify-start focus-visible-emerald"
                  aria-label={item.description}
                >
                  {item.label}
                </Button>
              ))}

              <Button
                onClick={() => {
                  handleConnectWallet()
                  setIsMenuOpen(false)
                }}
                disabled={isConnecting}
                className="bg-gradient-to-r from-[#10b981] via-[#14b8a6] to-[#06b6d4] hover:from-[#059669] hover:via-[#0f9b8e] hover:to-[#0891b2] text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus-visible-emerald active:scale-95 flex items-center justify-start gap-2 mt-2"
                aria-label={isConnected ? "Disconnect wallet" : "Connect wallet to start gasless transfers"}
              >
                {isConnecting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Connecting...
                  </>
                ) : isConnected ? (
                  <>
                    <Wallet className="w-4 h-4" />
                    {userAddress ? `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : 'Connected'}
                  </>
                ) : (
                  <>
                    <Wallet className="w-4 h-4" />
                    Connect
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
