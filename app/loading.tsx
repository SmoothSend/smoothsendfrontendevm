import { LoadingSpinner } from "@/components/ui/loading"

export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center gradient-bg noise-bg">
      <div className="text-center space-y-6">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-accent to-primary shadow-lg glow-emerald"></div>
          <span className="text-2xl font-bold text-white">SmoothSend</span>
        </div>
        
        {/* Loading Spinner */}
        <LoadingSpinner size="lg" color="emerald" />
        
        {/* Loading Text */}
        <div className="space-y-2">
          <p className="text-white text-lg font-semibold">Loading SmoothSend</p>
          <p className="text-gray-400 text-sm">Preparing your trading experience...</p>
        </div>
        
        {/* Loading Bar Animation */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
