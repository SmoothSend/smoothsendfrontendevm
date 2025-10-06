import { Section, Container } from "@/components/ui/layout"
import { StatsCard } from "@/components/ui/content-cards"

export function ProtocolStats() {
  const protocolStats = [
    {
      value: "100%",
      label: "Uptime reliability", 
      ariaLabel: "One hundred percent uptime"
    },
    {
      value: "<2 sec",
      label: "Average confirmation",
      ariaLabel: "Less than 2 seconds" 
    },
    {
      value: "0 ETH", 
      label: "Gas Required",
      ariaLabel: "Zero ETH required"
    },
    {
      value: "24/7",
      label: "Relayer availability",
      ariaLabel: "24 7 availability"
    }
  ]

  return (
    <Section className="py-0">
      <Container maxWidth="4xl">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div 
            className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" 
            aria-hidden="true"
          ></div>
          <span className="text-emerald-300/80 font-medium">
            Gasless Transfer Network stats
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8" role="list" aria-label="Network statistics">
          {protocolStats.map((stat, index) => (
            <StatsCard
              key={index}
              value={stat.value}
              label={stat.label}
              ariaLabel={stat.ariaLabel}
              className={index === 3 ? "md:col-span-2 lg:col-span-1" : ""}
              valueClassName={index === 2 ? "text-emerald-400" : ""}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}