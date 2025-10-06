"use client"

import { ChevronDown, ArrowRight, Zap, Shield, DollarSign } from "lucide-react"
import { GaslessTransferWidget } from "./gasless-transfer-widget"
import { Section, Container } from "./ui/layout"
import { Button } from "./ui/button"

export function HeroSection() {
  const handleScrollToContent = () => {
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" })
  }

  const handleGetStarted = () => {
    const transferWidget = document.getElementById('gasless-transfer-widget')
    if (transferWidget) {
      transferWidget.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Section 
      className="flex flex-col items-center justify-center min-h-screen pt-20 pb-12 md:pt-24 md:pb-16"
      id="main-content"
      ariaLabel="Hero section with main heading and gasless transfer interface"
    >
      <Container className="text-center max-w-7xl">
        {/* Main Content - Improved spacing hierarchy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Marketing Content */}
          <div className="text-center lg:text-left space-y-8">
            <header className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white" id="main-heading">
                Send crypto
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 bg-clip-text text-transparent">
                  without gas fees.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Transfer USDC & PYUSD across <strong className="text-emerald-400 font-semibold">Base, Arbitrum & Avalanche</strong> without 
                paying gas fees. Our relayer handles the transaction costs for a tiny 0.25% fee.
              </p>
            </header>
            
            {/* Feature highlights with better spacing */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4">
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-emerald-500/20">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300 text-sm font-medium">No Gas Required</span>
              </div>
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-teal-500/20">
                <Shield className="w-4 h-4 text-teal-400" />
                <span className="text-teal-300 text-sm font-medium">Secure Signatures</span>
              </div>
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-green-500/20">
                <DollarSign className="w-4 h-4 text-green-400" />
                <span className="text-green-300 text-sm font-medium">Low Fees</span>
              </div>
            </div>
            
            {/* Call-to-action buttons with improved spacing */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Button
                onClick={handleGetStarted}
                className="btn-primary group flex items-center gap-2 px-8 py-3 text-base font-semibold"
                aria-label="Get started with gasless transfers"
              >
                Start Transfer
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                onClick={() => window.open('https://github.com/smoothsend', '_blank')}
                className="btn-secondary group flex items-center gap-2 px-8 py-3 text-base font-semibold"
                aria-label="View source code"
              >
                View on GitHub
              </Button>
            </div>
          </div>

          {/* Right Column - Transfer Widget */}
          <div className="w-full max-w-md mx-auto" id="gasless-transfer-widget">
            <GaslessTransferWidget />
          </div>
          
        </div>
      </Container>
    </Section>
  )
}
