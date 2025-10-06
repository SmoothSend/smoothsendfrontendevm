"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface StatsCardProps {
  value: string
  label: string
  className?: string
  valueClassName?: string
  labelClassName?: string
  ariaLabel?: string
}

export function StatsCard({ 
  value, 
  label, 
  className, 
  valueClassName, 
  labelClassName, 
  ariaLabel 
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "stats-card text-center shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 hover:scale-105 active:scale-95",
        className
      )}
      role="listitem"
    >
      <div className={cn("stats-number", valueClassName)} aria-label={ariaLabel}>
        {value}
      </div>
      <div className={cn("stats-label", labelClassName)}>{label}</div>
    </div>
  )
}

interface FeatureCardProps {
  icon: ReactNode
  badge: string
  title: string
  description: string
  buttonText: string
  onButtonClick?: () => void
  variant?: "teal" | "emerald" | "green" | "blue" | "purple"
  className?: string
}

export function FeatureCard({
  icon,
  badge,
  title,
  description,
  buttonText,
  onButtonClick,
  variant = "teal",
  className
}: FeatureCardProps) {
  const variantClasses = {
    teal: {
      border: "border-teal-500/30 hover:border-teal-400/40",
      gradient: "from-teal-500/5 to-transparent group-hover:from-teal-500/10",
      iconBg: "from-teal-400 to-emerald-600",
      badgeColor: "text-teal-400",
      titleColor: "text-teal-300",
      descColor: "text-teal-200",
      buttonBorder: "border-teal-400/50",
      buttonText: "text-teal-400 hover:text-teal-300",
      buttonBg: "hover:bg-teal-500/20",
      shadow: "hover:shadow-teal-500/10"
    },
    emerald: {
      border: "border-emerald-500/30 hover:border-emerald-400/40",
      gradient: "from-emerald-500/5 to-transparent group-hover:from-emerald-500/10",
      iconBg: "from-emerald-400 to-green-600",
      badgeColor: "text-emerald-400",
      titleColor: "text-emerald-300",
      descColor: "text-emerald-200",
      buttonBorder: "border-emerald-400/50",
      buttonText: "text-emerald-400 hover:text-emerald-300",
      buttonBg: "hover:bg-emerald-500/20",
      shadow: "hover:shadow-emerald-500/10"
    },
    green: {
      border: "border-green-500/30 hover:border-green-400/40",
      gradient: "from-green-500/5 to-transparent group-hover:from-green-500/10",
      iconBg: "from-green-400 to-emerald-600",
      badgeColor: "text-green-400",
      titleColor: "text-green-300",
      descColor: "text-green-200",
      buttonBorder: "border-green-400/50",
      buttonText: "text-green-400 hover:text-green-300",
      buttonBg: "hover:bg-green-500/20",
      shadow: "hover:shadow-green-500/10"
    },
    blue: {
      border: "border-blue-500/30 hover:border-blue-400/40",
      gradient: "from-blue-500/5 to-transparent group-hover:from-blue-500/10",
      iconBg: "from-blue-400 to-cyan-600",
      badgeColor: "text-blue-400",
      titleColor: "text-blue-300",
      descColor: "text-blue-200",
      buttonBorder: "border-blue-400/50",
      buttonText: "text-blue-400 hover:text-blue-300",
      buttonBg: "hover:bg-blue-500/20",
      shadow: "hover:shadow-blue-500/10"
    },
    purple: {
      border: "border-purple-500/30 hover:border-purple-400/40",
      gradient: "from-purple-500/5 to-transparent group-hover:from-purple-500/10",
      iconBg: "from-purple-400 to-pink-600",
      badgeColor: "text-purple-400",
      titleColor: "text-purple-300",
      descColor: "text-purple-200",
      buttonBorder: "border-purple-400/50",
      buttonText: "text-purple-400 hover:text-purple-300",
      buttonBg: "hover:bg-purple-500/20",
      shadow: "hover:shadow-purple-500/10"
    }
  }

  const colors = variantClasses[variant]

  return (
    <div className={cn(
      `bg-white/5 backdrop-blur-xl border ${colors.border} card-spacing relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${colors.shadow} group hover:scale-[1.02] active:scale-[0.98]`,
      className
    )}>
      <div className={cn(`absolute inset-0 bg-gradient-to-br ${colors.gradient} transition-all duration-300`)}></div>
      <div className="relative z-10 space-y-4 md:space-y-6">
        <div className="flex items-center space-x-3">
          <div
            className={cn(`w-8 h-8 bg-gradient-to-br ${colors.iconBg} rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`)}
            aria-hidden="true"
          >
            {icon}
          </div>
          <span className={cn(`${colors.badgeColor} font-semibold text-sm md:text-base`)}>{badge}</span>
        </div>
        <h3 className={cn(`text-2xl sm:text-3xl font-bold ${colors.titleColor} text-balance`)}>{title}</h3>
        <p className={cn(`${colors.descColor} leading-relaxed text-pretty text-sm md:text-base`)}>
          {description}
        </p>
        <Button
          onClick={onButtonClick}
          variant="outline"
          className={cn(`${colors.buttonBorder} ${colors.buttonText} ${colors.buttonBg} bg-transparent backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:scale-105 focus:ring-2 focus:ring-opacity-50 focus:outline-none active:scale-95`)}
          aria-label={buttonText}
        >
          {buttonText} →
        </Button>
      </div>
    </div>
  )
}