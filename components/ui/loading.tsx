import { ReactNode } from "react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: "emerald" | "teal" | "white"
  className?: string
}

export function LoadingSpinner({ size = "md", color = "emerald", className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  }

  const colorClasses = {
    emerald: "border-emerald-500",
    teal: "border-teal-500",
    white: "border-white"
  }

  return (
    <div 
      className={`${sizeClasses[size]} border-2 ${colorClasses[color]}/30 border-t-${colorClasses[color].split('-')[1]}-500 rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

interface LoadingStateProps {
  children: ReactNode
  isLoading: boolean
  loadingText?: string
  className?: string
}

export function LoadingState({ children, isLoading, loadingText = "Loading...", className = "" }: LoadingStateProps) {
  if (isLoading) {
    return (
      <div className={`flex flex-col items-center justify-center space-y-3 py-8 ${className}`}>
        <LoadingSpinner size="lg" />
        <p className="text-gray-400 font-medium">{loadingText}</p>
      </div>
    )
  }

  return <>{children}</>
}

interface SkeletonProps {
  className?: string
  variant?: "text" | "rectangular" | "circular"
}

export function Skeleton({ className = "", variant = "text" }: SkeletonProps) {
  const baseClasses = "animate-pulse bg-gradient-to-r from-gray-800 to-gray-700"
  const variantClasses = {
    text: "h-4 rounded",
    rectangular: "rounded-lg",
    circular: "rounded-full"
  }

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-hidden="true"
    />
  )
}