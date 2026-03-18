"use client"

import { GradientBackground, NoiseTexture, FloatingElement } from "./ui/background-effects"

export function FloatingBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" suppressHydrationWarning>
      {/* Base gradient backgrounds with better layering */}
      <GradientBackground variant="primary" />
      <NoiseTexture intensity="medium" />
      
      {/* Floating geometric elements with improved distribution */}
      <FloatingElement delay={0} duration={8} className="absolute top-20 left-[10%]">
        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-primary/60 to-accent/40 blur-sm" />
      </FloatingElement>
      
      <FloatingElement delay={2} duration={12} className="absolute top-32 right-[15%]">
        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-accent/50 to-primary/30 blur-sm" />
      </FloatingElement>
      
      <FloatingElement delay={1} duration={10} className="absolute top-48 left-[20%]">
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary/40 to-primary/60 blur-sm" />
      </FloatingElement>
      
      <FloatingElement delay={3} duration={14} className="absolute top-64 right-[25%]">
        <div className="w-1 h-1 rounded-full bg-gradient-to-br from-accent/70 to-primary/50 blur-sm" />
      </FloatingElement>
      
      <FloatingElement delay={4} duration={9} className="absolute bottom-64 left-[30%]">
        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-primary/50 to-accent/40 blur-sm" />
      </FloatingElement>
      
      <FloatingElement delay={1.5} duration={11} className="absolute bottom-48 right-[35%]">
        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-primary/60 to-accent/30 blur-sm" />
      </FloatingElement>
      
      <FloatingElement delay={2.5} duration={13} className="absolute bottom-32 left-[40%]">
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-accent/40 to-primary/50 blur-sm" />
      </FloatingElement>
      
      <FloatingElement delay={0.5} duration={7} className="absolute bottom-20 right-[20%]">
        <div className="w-1 h-1 rounded-full bg-gradient-to-br from-primary/80 to-primary/40 blur-sm" />
      </FloatingElement>

      {/* Larger ambient floating elements */}
      <FloatingElement delay={5} duration={16} className="absolute top-1/4 left-[5%]">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-md" />
      </FloatingElement>
      
      <FloatingElement delay={7} duration={20} className="absolute bottom-1/4 right-[8%]">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent/15 to-primary/20 blur-md" />
      </FloatingElement>
      
      <FloatingElement delay={3} duration={18} className="absolute top-1/3 right-[12%]">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-primary/15 blur-lg" />
      </FloatingElement>

      {/* Subtle corner accents for better balance */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-radial from-primary/5 to-transparent blur-3xl" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-accent/5 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-radial from-primary/5 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-radial from-primary/5 to-transparent blur-3xl" />
    </div>
  )
}
