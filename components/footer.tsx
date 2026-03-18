import Link from "next/link"
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
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary via-accent to-primary shadow-lg"></div>
              <h3 className="text-2xl font-bold text-white">SmoothSend</h3>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed">
              Gasless stablecoin payments via ERC-4337 account abstraction and Aptos sponsored transactions.
              Send USDC &amp; USDT on Arbitrum, Base, Avalanche &amp; Aptos — no ETH or APT required.
            </p>
            <div className="flex items-center gap-3 text-primary">
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
                  <span className="text-gray-400">Base, Arbitrum &amp; Avalanche (EVM)</span>
                </li>
                <li>
                  <a
                    href="https://aptos.smoothsend.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    Aptos dApp
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
                <li>
                  <a
                    href="https://docs.smoothsend.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    Documentation
                    <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 space-y-6 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-gray-400 text-lg">© {new Date().getFullYear()} SmoothSend Labs</p>
            <div className="flex items-center gap-3 text-sm text-primary bg-primary/20 px-4 py-2 rounded-full border border-primary/20">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="font-medium">Proof of Concept</span>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-4 text-sm">
              <Link
                href="/terms"
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                Terms of Service
              </Link>
              <span className="text-gray-700">·</span>
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              Multi-chain ERC-4337 account abstraction infrastructure
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
