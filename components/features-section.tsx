import { Zap, Shield, DollarSign, Clock, Users, CheckCircle } from "lucide-react"
import { Section, SectionHeader, Container } from "@/components/ui/layout"
import { Card } from "@/components/ui/card"

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Zero Gas Fees",
    description: "Send USDC & USDT without needing ETH or AVAX for gas. Our ERC-4337 paymaster relayer covers all transaction costs on your behalf.",
    gradient: "from-primary/20 to-accent/20",
    border: "border-primary/30",
    iconColor: "text-primary",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure Signatures",
    description: "Uses EIP-712 typed signatures and ERC-2612 permit functions for maximum security. Non-custodial — your keys stay with you.",
    gradient: "from-blue-500/20 to-accent/20",
    border: "border-blue-500/30",
    iconColor: "text-blue-400",
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Low Fees",
    description: "Pay only a 0.25% relayer fee deducted from the amount you send. No native gas token required — far cheaper than manual gas management.",
    gradient: "from-primary/20 to-primary/20",
    border: "border-primary/30",
    iconColor: "text-primary",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Instant Transactions",
    description: "Fast execution on Base, Arbitrum & Avalanche via ERC-4337 account abstraction, and Aptos via native sponsored transactions.",
    gradient: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/30",
    iconColor: "text-purple-400",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Developer-Friendly",
    description: "Integrate gasless transfers in minutes with the @smoothsend/sdk. Full TypeScript support, React wallet adapter, and comprehensive docs.",
    gradient: "from-orange-500/20 to-yellow-500/20",
    border: "border-orange-500/30",
    iconColor: "text-orange-400",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Multi-Chain Support",
    description: "One SDK, four chains: Aptos, Avalanche C-Chain, Base (Coinbase L2), and Arbitrum One. Mainnet & testnet supported.",
    gradient: "from-accent/20 to-accent/20",
    border: "border-accent/30",
    iconColor: "text-accent",
  },
]

export function FeaturesSection() {
  return (
    <Section ariaLabelledBy="features-heading" className="bg-gradient-to-b from-transparent to-black/20 py-0">
      <Container className="max-w-7xl">
        <div className="text-center mb-12">
          <SectionHeader
            id="features-heading"
            title="Why Choose Gasless Transfers?"
            subtitle="True gasless payments via ERC-4337 account abstraction and Aptos sponsored transactions — no ETH, no APT, no friction."
          />
        </div>

        {/* Features Grid */}
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

        {/* How It Works Section */}
        <div className="bg-black/20 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden">
          <div className="p-8 md:p-12 lg:p-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">How Gasless Transfers Work</h2>
              <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                SmoothSend uses <strong className="text-primary">ERC-4337 account abstraction</strong> on EVM chains and
                Aptos native sponsored transactions to eliminate gas entirely for end users.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto shadow-lg">
                  1
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white">Connect &amp; Sign</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Connect your wallet and sign two secure messages: an ERC-2612 USDC permit and a transfer authorization. No gas needed.
                  </p>
                </div>
              </div>

              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-accent rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto shadow-lg">
                  2
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white">Paymaster Executes</h3>
                  <p className="text-gray-400 leading-relaxed">
                    The SmoothSend paymaster relayer submits your transaction on-chain, sponsoring all gas fees from its own balance.
                  </p>
                </div>
              </div>

              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto shadow-lg">
                  3
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white">Transfer Complete</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Funds arrive instantly. A 0.25% relayer fee is deducted from your sent amount — no ETH or APT ever required.
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
