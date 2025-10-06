import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GradientBackgroundProps {
  variant?: "primary" | "secondary" | "accent"
  className?: string
}

export function GradientBackground({ variant = "primary", className }: GradientBackgroundProps) {
  const variants = {
    primary: "radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.05) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.03) 0%, transparent 40%), radial-gradient(circle at 60% 80%, rgba(5, 150, 105, 0.02) 0%, transparent 35%), linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(10, 10, 10, 0.9) 100%)",
    secondary: "radial-gradient(circle at 30% 70%, rgba(6, 182, 212, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.04) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.03) 0%, transparent 40%), linear-gradient(135deg, rgba(5, 5, 15, 0.9) 0%, rgba(0, 0, 0, 0.95) 100%)",
    accent: "radial-gradient(circle at 40% 60%, rgba(34, 197, 94, 0.06) 0%, transparent 45%), radial-gradient(circle at 60% 40%, rgba(5, 150, 105, 0.04) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.03) 0%, transparent 35%), linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(5, 10, 5, 0.95) 100%)"
  }

  return (
    <div 
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{ background: variants[variant] }}
      aria-hidden="true"
      suppressHydrationWarning
    />
  )
}

interface NoiseTextureProps {
  intensity?: "light" | "medium" | "heavy"
  className?: string
}

export function NoiseTexture({ intensity = "medium", className }: NoiseTextureProps) {
  const intensities = {
    light: "opacity-10",
    medium: "opacity-15", 
    heavy: "opacity-25"
  }

  // Simplified pattern for better Firefox compatibility
  const simplePattern = `data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='noise' patternUnits='userSpaceOnUse' width='60' height='60'%3E%3Crect width='60' height='60' fill='%23000000' opacity='0.05'/%3E%3Ccircle cx='15' cy='15' r='1' fill='%23ffffff' opacity='0.1'/%3E%3Ccircle cx='45' cy='35' r='0.5' fill='%23ffffff' opacity='0.15'/%3E%3Ccircle cx='25' cy='45' r='1.5' fill='%23000000' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23noise)'/%3E%3C/svg%3E`;

  return (
    <div 
      className={cn("absolute inset-0 pointer-events-none z-1 mix-blend-overlay", intensities[intensity], className)}
      style={{
        backgroundImage: `url("${simplePattern}")`,
        backgroundSize: "60px 60px",
        backgroundRepeat: "repeat"
      }}
      aria-hidden="true"
      suppressHydrationWarning
    />
  )
}

interface FloatingElementProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}

export function FloatingElement({ children, className, delay = 0, duration = 6 }: FloatingElementProps) {
  return (
    <div
      className={cn("animate-float", className)}
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }}
      suppressHydrationWarning
    >
      {children}
    </div>
  )
}