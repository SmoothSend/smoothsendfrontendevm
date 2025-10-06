"use client"

import { useState, useEffect } from 'react'
import { getRelayerEndpoint } from '@/constants'

interface RelayerStatusProps {
  className?: string
}

export function RelayerStatus({ className = '' }: RelayerStatusProps) {
  const [isOnline, setIsOnline] = useState<boolean | null>(null)
  const [lastCheck, setLastCheck] = useState<Date>(new Date())

  const checkRelayerStatus = async () => {
    try {
      const endpoint = getRelayerEndpoint('/health')
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

      const response = await fetch(endpoint, {
        signal: controller.signal,
        cache: 'no-store'
      })
      
      clearTimeout(timeoutId)
      
      if (response.ok) {
        setIsOnline(true)
      } else {
        setIsOnline(false)
      }
    } catch (error) {
      // Relayer is offline or unreachable
      setIsOnline(false)
    }
    
    setLastCheck(new Date())
  }

  // Check status on mount and every 30 seconds
  useEffect(() => {
    checkRelayerStatus()
    
    const interval = setInterval(() => {
      checkRelayerStatus()
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  if (isOnline === null) {
    // Loading state
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="relative">
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
        </div>
        <span className="text-xs text-gray-400 hidden sm:inline">Checking...</span>
      </div>
    )
  }

  return (
    <div 
      className={`flex items-center gap-2 ${className}`}
      title={`Relayer ${isOnline ? 'Online' : 'Offline'} - Last checked: ${lastCheck.toLocaleTimeString()}`}
    >
      <div className="relative">
        {/* Pulsing ring animation when online */}
        {isOnline && (
          <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75"></div>
        )}
        {/* Status dot */}
        <div 
          className={`relative w-2 h-2 rounded-full ${
            isOnline 
              ? 'bg-emerald-400 shadow-lg shadow-emerald-500/50' 
              : 'bg-red-400 shadow-lg shadow-red-500/50'
          }`}
        ></div>
      </div>
      <span className={`text-xs hidden sm:inline ${
        isOnline ? 'text-emerald-400' : 'text-red-400'
      }`}>
        {isOnline ? 'Online' : 'Offline'}
      </span>
    </div>
  )
}
