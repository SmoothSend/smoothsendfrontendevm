"use client"

import { useEffect, useState } from 'react'
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react'
import { useWeb3 } from '@/contexts/web3-context'
import { Button } from './ui/button'

export function StatusNotification() {
  const { status, clearStatus } = useWeb3()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (status.message) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [status])

  const handleClose = () => {
    clearStatus()
  }

  if (!isVisible || !status.message) {
    return null
  }

  const getIconAndColors = () => {
    switch (status.type) {
      case 'success':
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          bgColor: 'bg-emerald-950/90',
          borderColor: 'border-emerald-500/50',
          textColor: 'text-emerald-300',
          iconColor: 'text-emerald-400'
        }
      case 'error':
        return {
          icon: <AlertCircle className="w-5 h-5" />,
          bgColor: 'bg-red-950/90',
          borderColor: 'border-red-500/50',
          textColor: 'text-red-300',
          iconColor: 'text-red-400'
        }
      case 'warning':
        return {
          icon: <AlertTriangle className="w-5 h-5" />,
          bgColor: 'bg-yellow-950/90',
          borderColor: 'border-yellow-500/50',
          textColor: 'text-yellow-300',
          iconColor: 'text-yellow-400'
        }
      default:
        return {
          icon: <Info className="w-5 h-5" />,
          bgColor: 'bg-blue-950/90',
          borderColor: 'border-blue-500/50',
          textColor: 'text-blue-300',
          iconColor: 'text-blue-400'
        }
    }
  }

  const { icon, bgColor, borderColor, textColor, iconColor } = getIconAndColors()

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md animate-in slide-in-from-right duration-300">
      <div className={`${bgColor} ${borderColor} backdrop-blur-xl border rounded-xl p-4 shadow-2xl`}>
        <div className="flex items-start gap-3">
          <div className={iconColor}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`${textColor} text-sm leading-relaxed`}>
              {status.message}
            </p>
          </div>
          <Button
            onClick={handleClose}
            variant="ghost"
            size="sm"
            className={`${textColor} hover:bg-white/10 p-1 h-auto`}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}