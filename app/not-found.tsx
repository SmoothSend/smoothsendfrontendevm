"use client"

import Link from "next/link"
import { Home, ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center gradient-mesh noise-bg relative">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-gradient-to-br from-teal-500/10 to-green-500/5 blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="text-center space-y-8 max-w-2xl mx-auto px-6 relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-12">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-green-500 shadow-lg"></div>
          <span className="text-xl font-bold text-white">SmoothSend</span>
        </div>
        
        {/* 404 Number */}
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 bg-clip-text text-transparent leading-none">
            404
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto"></div>
        </div>
        
        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Page not found
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-lg mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to trading!
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button asChild className="btn-primary group">
            <Link href="/" className="flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Go home</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="btn-secondary group">
            <Link href="/#explore" className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Explore tokens</span>
            </Link>
          </Button>
        </div>
        
        {/* Help Text */}
        <div className="pt-8 text-center">
          <p className="text-gray-400 text-sm">
            Need help? Contact our{" "}
            <a 
              href="mailto:support@smoothsend.com" 
              className="text-emerald-400 hover:text-emerald-300 transition-colors focus-visible-emerald underline"
            >
              support team
            </a>
          </p>
        </div>
        
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-emerald-400 transition-colors focus-visible-emerald"
          aria-label="Go back to previous page"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Go back</span>
        </Button>
      </div>
    </div>
  )
}