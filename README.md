# SmoothSend Frontend

Frontend application for SmoothSend Gasless Relayer - enabling gasless token transfers across multiple EVM chains.

## 🎯 Features

- **Gasless Transfers**: Send USDC/PYUSD without needing ETH for gas
- **Multi-Chain Support**: Base Sepolia, Arbitrum Sepolia, Avalanche Fuji
- **Real-Time Relayer Status**: Live status indicator showing relayer health
- **Fee Preview**: See exact fees before sending
- **Transaction History**: Track all your gasless transfers
- **Network Switching**: Easy network and token selection

## 🌐 Supported Networks

### Base Sepolia (Testnet)
- **Chain ID**: 84532
- **Contract**: `0x2A1f1F4Ea6EBF033F11C2ad0081e20b15Caf5887`
- **Tokens**: USDC
- **Fee**: 0.25%

### Arbitrum Sepolia (Testnet)
- **Chain ID**: 421614
- **Contract**: `0x7c7444d4afbF49f38Fc1E55Eb4216Cc0f5A0a5b8`
- **Tokens**: USDC, PYUSD
- **Fee**: 0.25%

### Avalanche Fuji (Testnet)
- **Chain ID**: 43113
- **Contract**: `0x04633C9C3D6710E89968517f92e0135c1d077778`
- **Tokens**: USDC
- **Fee**: 0.25%

## 🚀 Getting Started

### Prerequisites

```bash
Node.js >= 18.x
npm or yarn
```

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file:

```env
# Relayer API URL
NEXT_PUBLIC_RELAYER_URL=http://localhost:3000
```

### Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## 📦 Project Structure

```
frontend/
├── components/
│   ├── RelayerStatusBar.tsx    # Live relayer status indicator
│   ├── NetworkSelector.tsx     # Network selection dropdown
│   └── TokenSelector.tsx       # Token selection dropdown
├── constants/
│   └── index.ts                # Network, token, and API configs
└── app/
    └── page.tsx                # Main page
```

## 🎨 Relayer Status Indicator

The `RelayerStatusBar` component shows real-time relayer health at the top of the page:

**Features:**
- Real-time health check (every 10 seconds)
- Shows active chains count
- Displays transaction limits
- Expandable for more details
- Color-coded status:
  - 🟢 **Green (Online)**: Relayer is healthy and accepting transactions
  - 🔴 **Red (Offline)**: Relayer is not responding
  - 🟡 **Yellow (Checking)**: Currently checking status

## 🔧 Configuration

All network and token configurations are in `constants/index.ts`:

```typescript
import { NETWORKS, TOKENS, RELAYER_LIMITS } from '@/constants';

// Access network details
const baseNetwork = NETWORKS.BASE_SEPOLIA;
console.log(baseNetwork.chainId); // 84532

// Access tokens for a network
const baseTokens = TOKENS.BASE_SEPOLIA;
console.log(baseTokens.USDC.address); // 0x036Cb...

// Access relayer limits
console.log(RELAYER_LIMITS.MAX_SINGLE_TRANSACTION_USD); // 1000
```

## 🔌 Relayer API

The frontend communicates with your relayer backend:

### Health Check
```
GET http://localhost:3000/api/v1/relayer/health
```

### Fee Estimate
```
GET http://localhost:3000/api/v1/relayer/fee/:chainId/:token/:amount
```

### Execute Transfer
```
POST http://localhost:3000/api/v1/relayer/relay
```

## 🔒 Security

- Transaction limits: $1,000 per tx, $10,000 daily
- User signs transactions client-side (EIP-712)
- No private keys transmitted
- Rate limiting enforced by relayer

## Learn More

To learn more about Next.js and the stack:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
