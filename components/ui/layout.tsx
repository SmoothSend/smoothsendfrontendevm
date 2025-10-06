import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  ariaLabelledBy?: string
  ariaLabel?: string
}

export function Section({ children, className, id, ariaLabelledBy, ariaLabel }: SectionProps) {
  return (
    <section
      className={cn("relative z-10 section-spacing container-spacing", className)}
      id={id}
      aria-labelledby={ariaLabelledBy}
      aria-label={ariaLabel}
    >
      {children}
    </section>
  )
}

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
  titleClassName?: string
  subtitleClassName?: string
  id?: string
}

export function SectionHeader({ 
  title, 
  subtitle, 
  className, 
  titleClassName, 
  subtitleClassName, 
  id 
}: SectionHeaderProps) {
  return (
    <header className={cn("text-center text-spacing", className)}>
      <h2
        id={id}
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-balance leading-tight",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("text-lg md:text-xl text-gray-300 max-w-3xl mx-auto text-pretty mt-4 leading-relaxed", subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </header>
  )
}

interface ContainerProps {
  children: ReactNode
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl" | "7xl"
}

export function Container({ children, className, maxWidth = "6xl" }: ContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
  }

  return (
    <div className={cn(`${maxWidthClasses[maxWidth]} mx-auto content-spacing`, className)}>
      {children}
    </div>
  )
}