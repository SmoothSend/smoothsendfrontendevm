"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "./ui/button"

export function HeroButtons() {
  const handleGetStarted = () => {
    const transferWidget = document.getElementById("gasless-transfer-widget")
    if (transferWidget) {
      transferWidget.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
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
        onClick={() => window.open("https://github.com/smoothsend", "_blank", "noopener,noreferrer")}
        className="btn-secondary group flex items-center gap-2 px-8 py-3 text-base font-semibold"
        aria-label="View source code on GitHub"
      >
        View on GitHub
      </Button>
    </div>
  )
}
