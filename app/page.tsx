import { Navigation } from "@/components/navigation"
import { GaslessTransferWidget } from "@/components/gasless-transfer-widget"
import { FeaturesSection } from "@/components/features-section"
import { ProtocolStats } from "@/components/protocol-stats"
import { StatsSection } from "@/components/stats-section"
import { Footer } from "@/components/footer"
import { ClientOnly } from "@/components/ui/client-only"
import { StatusNotification } from "@/components/status-notification"

export default function HomePage() {
  return (
    <main className="min-h-screen mesh-gradient flex flex-col relative font-sans text-foreground">
      <div className="relative flex-1 flex flex-col">
        <ClientOnly>
          <StatusNotification />
        </ClientOnly>
        
        <Navigation />
        
        <div className="container mx-auto px-4 py-12 flex-1 flex flex-col items-center justify-center gap-12 max-w-6xl">
          <div className="flex flex-col items-center gap-24 w-full">
            {/* Hero Section: Transfer Card Only */}
            <div className="w-full flex justify-center mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <GaslessTransferWidget />
            </div>

            {/* Info Section: Below the fold */}
            <div className="w-full max-w-6xl space-y-16 text-center animate-in fade-in duration-1000 delay-300">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-foreground">
                  Send Tokens <br />
                  <span className="text-primary drop-shadow-[0_0_15px_rgba(117,149,255,0.4)]">Without Gas Fees</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  Experience the smoothest way to send assets across chains.
                  Pay only a tiny relayer fee in the token you send. No ETH or native tokens required.
                </p>
              </div>

              <div className="py-8">
                <FeaturesSection />
              </div>
              <div className="py-8">
                <StatsSection />
              </div>
              <div className="py-8 bg-black/20 backdrop-blur-sm rounded-3xl border border-white/5">
                <ProtocolStats />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
