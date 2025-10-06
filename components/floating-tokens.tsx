'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Token {
  id: number
  name: string
  symbol: string
  iconUrl: string
  size: number
  top: string
  left?: string
  right?: string
  moveRange: number // How much the token moves up/down on scroll (in pixels)
}

const cryptoTokens: Token[] = [
  // USDC tokens (4 instances)
  {
    id: 1,
    name: 'USD Coin',
    symbol: 'USDC',
    iconUrl: '/usd-coin-usdc-logo.svg',
    size: 60,
    top: '10%',
    left: '10%',
    moveRange: 40,
  },
  {
    id: 2,
    name: 'USD Coin',
    symbol: 'USDC',
    iconUrl: '/usd-coin-usdc-logo.svg',
    size: 45,
    top: '65%',
    left: '50%',
    moveRange: 30,
  },
  {
    id: 3,
    name: 'USD Coin',
    symbol: 'USDC',
    iconUrl: '/usd-coin-usdc-logo.svg',
    size: 42,
    top: '25%',
    left: '30%',
    moveRange: 35,
  },
  {
    id: 4,
    name: 'USD Coin',
    symbol: 'USDC',
    iconUrl: '/usd-coin-usdc-logo.svg',
    size: 38,
    top: '80%',
    right: '20%',
    moveRange: 25,
  },
  
  // Avalanche tokens (4 instances)
  {
    id: 5,
    name: 'Avalanche',
    symbol: 'AVAX',
    iconUrl: '/avalanche-avax-logo.svg',
    size: 70,
    top: '60%',
    left: '5%',
    moveRange: 50,
  },
  {
    id: 6,
    name: 'Avalanche',
    symbol: 'AVAX',
    iconUrl: '/avalanche-avax-logo.svg',
    size: 50,
    top: '75%',
    left: '70%',
    moveRange: 35,
  },
  {
    id: 7,
    name: 'Avalanche',
    symbol: 'AVAX',
    iconUrl: '/avalanche-avax-logo.svg',
    size: 38,
    top: '45%',
    right: '25%',
    moveRange: 30,
  },
  {
    id: 8,
    name: 'Avalanche',
    symbol: 'AVAX',
    iconUrl: '/avalanche-avax-logo.svg',
    size: 55,
    top: '5%',
    left: '85%',
    moveRange: 40,
  },

  // PayPal USD tokens (3 instances)
  {
    id: 9,
    name: 'PayPal USD',
    symbol: 'PYUSD',
    iconUrl: '/paypal-usd-pyusd-logo.svg',
    size: 55,
    top: '70%',
    right: '10%',
    moveRange: 45,
  },
  {
    id: 10,
    name: 'PayPal USD',
    symbol: 'PYUSD',
    iconUrl: '/paypal-usd-pyusd-logo.svg',
    size: 48,
    top: '30%',
    left: '25%',
    moveRange: 35,
  },
  {
    id: 11,
    name: 'PayPal USD',
    symbol: 'PYUSD',
    iconUrl: '/paypal-usd-pyusd-logo.svg',
    size: 41,
    top: '50%',
    left: '20%',
    moveRange: 30,
  },

  // Ethereum tokens (3 instances)
  {
    id: 12,
    name: 'Ethereum',
    symbol: 'ETH',
    iconUrl: '/ethereum-eth-logo.svg',
    size: 48,
    top: '20%',
    right: '15%',
    moveRange: 38,
  },
  {
    id: 13,
    name: 'Ethereum',
    symbol: 'ETH',
    iconUrl: '/ethereum-eth-logo.svg',
    size: 35,
    top: '90%',
    left: '15%',
    moveRange: 28,
  },
  {
    id: 14,
    name: 'Ethereum',
    symbol: 'ETH',
    iconUrl: '/ethereum-eth-logo.svg',
    size: 52,
    top: '35%',
    left: '65%',
    moveRange: 42,
  },

  // Arbitrum tokens (3 instances)
  {
    id: 15,
    name: 'Arbitrum',
    symbol: 'ARB',
    iconUrl: '/arbitrum-arb-logo.svg',
    size: 46,
    top: '15%',
    left: '55%',
    moveRange: 36,
  },
  {
    id: 16,
    name: 'Arbitrum',
    symbol: 'ARB',
    iconUrl: '/arbitrum-arb-logo.svg',
    size: 52,
    top: '85%',
    left: '40%',
    moveRange: 40,
  },
  {
    id: 17,
    name: 'Arbitrum',
    symbol: 'ARB',
    iconUrl: '/arbitrum-arb-logo.svg',
    size: 40,
    top: '40%',
    right: '8%',
    moveRange: 32,
  },

  // Base tokens (3 instances)
  {
    id: 18,
    name: 'Base',
    symbol: 'BASE',
    iconUrl: '/base-logo.svg',
    size: 50,
    top: '12%',
    left: '75%',
    moveRange: 38,
  },
  {
    id: 19,
    name: 'Base',
    symbol: 'BASE',
    iconUrl: '/base-logo.svg',
    size: 44,
    top: '55%',
    left: '60%',
    moveRange: 34,
  },
  {
    id: 20,
    name: 'Base',
    symbol: 'BASE',
    iconUrl: '/base-logo.svg',
    size: 48,
    top: '92%',
    right: '12%',
    moveRange: 36,
  },
]

export function FloatingTokens() {
  const containerRef = useRef<HTMLDivElement>(null)
  const tokensRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    // Create GSAP animations for each token
    tokensRef.current.forEach((tokenEl, index) => {
      if (!tokenEl) return
      
      const token = cryptoTokens[index]
      
      // Create a gentle floating animation (non-scroll based)
      gsap.to(tokenEl, {
        y: `+=${token.moveRange / 2}`,
        duration: 3 + (index % 3), // Varying durations for each token
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: index * 0.2, // Stagger the animations
      })

      // Create scroll-based parallax movement
      gsap.to(tokenEl, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: `+=${token.moveRange}`, // Move based on scroll
        ease: 'none',
      })
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="floating-tokens-scroll" 
      role="img" 
      aria-label="Decorative floating cryptocurrency tokens including USDC, Avalanche, PayPal USD, Ethereum, Arbitrum, and Base logos"
    >
      {cryptoTokens.map((token, index) => (
        <div
          key={token.id}
          ref={(el) => {
            tokensRef.current[index] = el
          }}
          className="token-scroll"
          style={{
            width: `${token.size}px`,
            height: `${token.size}px`,
            top: token.top,
            left: token.left,
            right: token.right,
            backgroundImage: `url('${token.iconUrl}')`,
          }}
          title={`${token.name} (${token.symbol})`}
          aria-label={`Decorative ${token.name} token`}
        />
      ))}
    </div>
  )
}
