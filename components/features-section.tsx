"use client"

import { Zap, Shield, DollarSign, Clock, Users, CheckCircle } from "lucide-react"
import { Section, SectionHeader, Container } from "@/components/ui/layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function FeaturesSection() {
  const handleGetStarted = () => {
    const transferWidget = document.getElementById('gasless-transfer-widget')
    if (transferWidget) {
      transferWidget.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLearnMore = () => {
    window.open('https://github.com/smoothsend', '_blank', 'noopener,noreferrer')
  }

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Zero Gas Fees",
      description: "Send USDC & PYUSD without needing ETH/AVAX for gas. Our relayer covers all transaction costs.",
      gradient: "from-emerald-500/20 to-teal-500/20",
      border: "border-emerald-500/30",
      iconColor: "text-emerald-400"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Signatures",
      description: "Uses EIP-712 typed signatures and permit functions for maximum security without gas.",
      gradient: "from-blue-500/20 to-cyan-500/20", 
      border: "border-blue-500/30",
      iconColor: "text-blue-400"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Low Fees",
      description: "Pay only a small USDC fee to the relayer. Much cheaper than gas fees on most networks.",
      gradient: "from-green-500/20 to-emerald-500/20",
      border: "border-green-500/30", 
      iconColor: "text-green-400"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Instant Transactions",
      description: "Fast execution on Base, Arbitrum & Avalanche testnets with transaction confirmation in seconds.",
      gradient: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-500/30",
      iconColor: "text-purple-400"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "User Friendly",
      description: "Simple interface - just connect wallet, enter recipient and amount, then sign two messages.",
      gradient: "from-orange-500/20 to-yellow-500/20",
      border: "border-orange-500/30",
      iconColor: "text-orange-400"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Reliable Service", 
      description: "Robust relayer infrastructure ensures your transactions are processed quickly and reliably.",
      gradient: "from-teal-500/20 to-cyan-500/20",
      border: "border-teal-500/30",
      iconColor: "text-teal-400"
    }
  ]

  return (
    <Section ariaLabelledBy="features-heading" className="bg-gradient-to-b from-transparent to-black/20 py-0">
      <Container className="max-w-7xl">
        {/* Section Header with improved spacing */}
        <div className="text-center mb-12">
          <SectionHeader 
            id="features-heading"
            title="Why Choose Gasless Transfers?"
            subtitle="Experience the future of crypto payments with our innovative gasless transfer system"
          />
        </div>

        {/* Features Grid - Improved spacing and alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`bg-gradient-to-br ${feature.gradient} backdrop-blur-sm border ${feature.border} hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 h-full`}
            >
              <div className="p-8 space-y-6 h-full flex flex-col">
                <div className={`${feature.iconColor} bg-black/20 w-16 h-16 rounded-xl flex items-center justify-center shrink-0`}>
                  {feature.icon}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-base">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* How It Works Section - Enhanced layout */}
        <div className="bg-black/20 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden">
          <div className="p-8 md:p-12 lg:p-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">How Gasless Transfers Work</h3>
              <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Our innovative system eliminates the need for gas fees while maintaining full security and decentralization.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto shadow-lg">
                  1
                </div>
                <div className="space-y-3">
                  <h4 className="text-xl font-semibold text-white">Connect & Sign</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Connect your MetaMask wallet and sign two secure messages: USDC permit and transfer authorization.
                  </p>
                </div>
              </div>

              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto shadow-lg">
                  2
                </div>
                <div className="space-y-3">
                  <h4 className="text-xl font-semibold text-white">Relayer Executes</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Our relayer uses your signatures to execute the transaction on-chain, paying all gas fees for you.
                  </p>
                </div>
              </div>

              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto shadow-lg">
                  3
                </div>
                <div className="space-y-3">
                  <h4 className="text-xl font-semibold text-white">Transfer Complete</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Funds arrive at the destination instantly. You only pay a small USDC fee, no gas required.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
