"use client"

import { ReactNode } from "react"

interface ClientOnlyProps {
  children: ReactNode
  fallback?: ReactNode
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  return (
    <div suppressHydrationWarning>
      {children}
    </div>
  )
}

// Wrapper for Lucide icons to prevent hydration issues with browser extensions
interface IconWrapperProps {
  children: ReactNode
  className?: string
}

export function IconWrapper({ children, className }: IconWrapperProps) {
  return (
    <span className={className} suppressHydrationWarning>
      {children}
    </span>
  )
}