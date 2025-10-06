import { ExternalLink, Globe } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm py-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* About Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-green-500 shadow-lg"></div>
              <h3 className="text-2xl font-bold text-white">SmoothSend</h3>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed">
              Gasless transfers powered by decentralized microservices hosted on Akash Network. 
              Experience truly decentralized infrastructure on the blockchain.
            </p>
            <div className="flex items-center gap-3 text-emerald-400">
              <Globe className="w-5 h-5" />
              <span className="font-medium">Powered by Akash Network</span>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg">Networks</h4>
              <ul className="space-y-3">
                <li>
                  <span className="text-gray-400">Base, Arbitrum & Avalanche (Testnets)</span>
                </li>
                <li>
                  <a
                    href="https://www.smoothsend.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-2 group"
                  >
                    Aptos Network
                    <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg">Connect</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://x.com/smoothsend"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    Follow on X
                    <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/smoothsend"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    GitHub
                    <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar with improved spacing */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 space-y-6 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-gray-400 text-lg">© 2025 SmoothSend Labs</p>
            <div className="flex items-center gap-3 text-sm text-emerald-400 bg-emerald-950/20 px-4 py-2 rounded-full border border-emerald-500/20">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="font-medium">Proof of Concept</span>
            </div>
          </div>
          
          <div className="text-center md:text-right space-y-1">
            <p className="text-sm text-gray-500">
              Multi-chain microservice architecture
            </p>
            <p className="text-sm text-gray-500">
              Decentralized relayers on blockchain infrastructure
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
