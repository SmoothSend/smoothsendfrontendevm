import { Section, SectionHeader, Container } from "@/components/ui/layout"
import { StatsCard } from "@/components/ui/content-cards"

const statsData = [
  {
    value: "0%",
    label: "Gas fees for users",
    ariaLabel: "Zero percent gas fees",
  },
  {
    value: "0.25%",
    label: "Relayer fee (in token)",
    ariaLabel: "0.25 percent relayer fee deducted from sent amount",
  },
  {
    value: "2-5 sec",
    label: "Transaction speed",
    ariaLabel: "Two to five seconds",
  },
  {
    value: "4 chains",
    label: "Aptos · Arbitrum · Base · Avalanche",
    ariaLabel: "Four supported blockchains",
  },
]

export function StatsSection() {
  return (
    <Section ariaLabelledBy="stats-heading" className="py-0">
      <Container className="max-w-7xl">
        <div className="text-center mb-12">
          <SectionHeader
            id="stats-heading"
            title="The Future of Crypto Transfers"
            subtitle="Send USDC & USDT without needing ETH or AVAX. SmoothSend's ERC-4337 paymaster and Aptos sponsored transactions handle the gas — users pay a tiny fee in the stablecoin they're already sending."
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-16" role="list" aria-label="Gasless transfer benefits">
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              value={stat.value}
              label={stat.label}
              ariaLabel={stat.ariaLabel}
            />
          ))}
        </div>

        {/* Benefits + Technical section */}
        <div className="bg-gradient-to-br from-primary/40 to-accent/40 backdrop-blur-sm rounded-3xl border border-primary/20 overflow-hidden">
          <div className="p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Why Gasless Transfers Matter
                </h2>
                <div className="space-y-6 text-gray-300">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-lg leading-relaxed">
                      <strong className="text-primary font-semibold">Accessibility:</strong> Users don&apos;t need to hold ETH, AVAX, or APT just to send USDC
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-lg leading-relaxed">
                      <strong className="text-accent font-semibold">Cost Efficiency:</strong> Pay only the transfer amount plus a predictable 0.25% fee
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-lg leading-relaxed">
                      <strong className="text-accent font-semibold">Better UX:</strong> Simplified workflow for your dApp users — just sign, transfer done
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-lg leading-relaxed">
                      <strong className="text-primary font-semibold">Non-Custodial:</strong> Maintain full control with cryptographic signatures — we never hold funds
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  How It Works Technically
                </h2>
                <div className="space-y-6 text-gray-300">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-lg leading-relaxed">
                      <strong className="text-primary font-semibold">ERC-4337 Account Abstraction:</strong> Industry-standard UserOperation flow — no custom wallet needed
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-lg leading-relaxed">
                      <strong className="text-accent font-semibold">ERC-2612 Permit:</strong> Token allowance granted via signature — no on-chain approval transaction required
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-lg leading-relaxed">
                      <strong className="text-accent font-semibold">Paymaster Relayer:</strong> SmoothSend&apos;s infrastructure submits the UserOperation and pays gas costs
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-lg leading-relaxed">
                      <strong className="text-primary font-semibold">Instant Settlement:</strong> Transaction confirmed on-chain in 2-5 seconds across all supported chains
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
