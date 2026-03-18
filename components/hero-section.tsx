import { Zap, Shield, DollarSign } from "lucide-react"
import { GaslessTransferWidget } from "./gasless-transfer-widget"
import { Section, Container } from "./ui/layout"
import { HeroButtons } from "./hero-buttons"

export function HeroSection() {
  return (
    <Section
      className="flex flex-col items-center justify-center min-h-screen pt-20 pb-12 md:pt-24 md:pb-16"
      id="main-content"
      ariaLabel="Hero section with main heading and gasless transfer interface"
    >
      <Container className="text-center max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column - Marketing Content */}
          <div className="text-center lg:text-left space-y-8">
            <header className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white" id="main-heading">
                Gasless USDC &amp; USDT
                <br />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  transfers without gas fees.
                </span>
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Send stablecoins across <strong className="text-primary font-semibold">Base, Arbitrum, Avalanche &amp; Aptos</strong> without
                paying gas fees. Our <strong className="text-accent font-semibold">ERC-4337 account abstraction</strong> relayer handles
                transaction costs — pay only a small fee in the token you send.
              </p>
            </header>

            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4">
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-primary/20">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">No Gas Required</span>
              </div>
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-accent/20">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-accent text-sm font-medium">EIP-712 Secure</span>
              </div>
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-primary/20">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">0.25% Fee</span>
              </div>
            </div>

            <HeroButtons />
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
