import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Web3Provider } from "@/contexts/web3-context";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

// JSON-LD structured data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.smoothsend.xyz/#organization",
  "name": "SmoothSend",
  "url": "https://www.smoothsend.xyz",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.smoothsend.xyz/smoothsendlogo.png",
    "width": 512,
    "height": 512,
  },
  "description": "Gasless stablecoin payment protocol for Web3 developers. Send USDC/USDT on Aptos, Arbitrum, Base, and Avalanche without native gas tokens.",
  "sameAs": [
    "https://github.com/smoothsend",
    "https://x.com/smoothsend",
    "https://www.npmjs.com/package/@smoothsend/sdk",
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "technical support",
    "url": "https://docs.smoothsend.xyz",
  },
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.smoothsend.xyz/#website",
  "name": "SmoothSend",
  "url": "https://www.smoothsend.xyz",
  "publisher": { "@id": "https://www.smoothsend.xyz/#organization" },
  "inLanguage": "en-US",
}

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://www.smoothsend.xyz/#sdk",
  "name": "@smoothsend/sdk",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Node.js, Browser",
  "url": "https://www.npmjs.com/package/@smoothsend/sdk",
  "description": "JavaScript/TypeScript SDK for gasless stablecoin payments on Aptos, Avalanche, Base, and Arbitrum. Supports ERC-4337 account abstraction and Aptos sponsored transactions.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free to integrate. Small fee deducted from token amount per transaction. Testnet is free.",
  },
  "featureList": [
    "True gasless transactions — users pay fees in the token they send",
    "Multi-chain: Aptos, Avalanche C-Chain, Base, Arbitrum",
    "ERC-4337 account abstraction for EVM chains",
    "USDC and USDT support",
    "React wallet adapter integration",
    "Full TypeScript types",
  ],
  "author": { "@id": "https://www.smoothsend.xyz/#organization" },
}

export const metadata: Metadata = {
  title: "SmoothSend — Gasless USDC & USDT Transfers on Aptos, Arbitrum, Base & Avalanche",
  description: "Send USDC & USDT without gas fees on Base, Arbitrum, Avalanche, and Aptos. ERC-4337 account abstraction and Aptos sponsored transactions. Pay a small fee in the token you send — no ETH or APT needed.",
  authors: [{ name: "SmoothSend" }],
  creator: "SmoothSend",
  publisher: "SmoothSend",
  alternates: {
    canonical: "https://www.smoothsend.xyz",
  },
  openGraph: {
    title: "SmoothSend — Gasless USDC & USDT Transfers",
    description: "Send stablecoins without gas fees on Aptos, Arbitrum, Base, and Avalanche. No ETH or APT required — our relayer handles transaction costs via ERC-4337 account abstraction.",
    url: "https://www.smoothsend.xyz",
    siteName: "SmoothSend",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.smoothsend.xyz/og-image.png",
        width: 1200,
        height: 630,
        alt: "SmoothSend — Gasless Stablecoin Payments for Web3 Developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmoothSend — Gasless USDC & USDT Transfers",
    description: "Send USDC without gas fees on Aptos, Arbitrum, Base & Avalanche. ERC-4337 account abstraction — no ETH required.",
    creator: "@smoothsend",
    images: ["https://www.smoothsend.xyz/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://va.vercel-insights.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="skip-to-content sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
