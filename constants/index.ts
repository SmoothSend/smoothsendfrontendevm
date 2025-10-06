// App-wide constants for SmoothSend Gasless Relayer Frontend

// Relayer API Configuration
export const API_CONFIG = {
  RELAYER_URL: process.env.NEXT_PUBLIC_RELAYER_URL || 'http://localhost:3000',
  BASE_PATH: '/api/v1/relayer',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
} as const;

// Supported Networks Configuration
export const NETWORKS = {
  BASE_SEPOLIA: {
    chainId: 84532,
    chainIdHex: '0x14a34',
    name: 'Base Sepolia',
    shortName: 'Base',
  rpcUrl: process.env.NEXT_PUBLIC_BASE_TESTNET_RPC_URL || 'https://sepolia.base.org',
    explorerUrl: 'https://sepolia.basescan.org',
    nativeToken: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    gaslessContract: '0x2A1f1F4Ea6EBF033F11C2ad0081e20b15Caf5887',
    feePercent: 0.25,
    enabled: true,
  },
  ARBITRUM_SEPOLIA: {
    chainId: 421614,
    chainIdHex: '0x66eee',
    name: 'Arbitrum Sepolia',
    shortName: 'Arbitrum',
  rpcUrl: process.env.NEXT_PUBLIC_ARBITRUM_TESTNET_RPC_URL || 'https://sepolia-rollup.arbitrum.io/rpc',
    explorerUrl: 'https://sepolia.arbiscan.io',
    nativeToken: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    gaslessContract: '0x7c7444d4afbF49f38Fc1E55Eb4216Cc0f5A0a5b8',
    feePercent: 0.25,
    enabled: true,
  },
  AVALANCHE_FUJI: {
    chainId: 43113,
    chainIdHex: '0xa869',
    name: 'Avalanche Fuji',
    shortName: 'Avalanche',
  rpcUrl: process.env.NEXT_PUBLIC_AVALANCHE_TESTNET_RPC_URL || 'https://api.avax-test.network/ext/bc/C/rpc',
    explorerUrl: 'https://testnet.snowtrace.io',
    nativeToken: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    gaslessContract: '0x04633C9C3D6710E89968517f92e0135c1d077778',
    feePercent: 0.25,
    enabled: true,
  },
} as const;

// Token Configuration by Chain
export const TOKENS = {
  BASE_SEPOLIA: {
    USDC: {
      address: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      logo: '/tokens/usdc.svg',
      coingeckoId: 'usd-coin',
    },
  },
  ARBITRUM_SEPOLIA: {
    USDC: {
      address: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      logo: '/tokens/usdc.svg',
      coingeckoId: 'usd-coin',
    },
    PYUSD: {
      address: '0x637A1259C6afd7E3AdF63993cA7E58BB438aB1B1',
      symbol: 'PYUSD',
      name: 'PayPal USD',
      decimals: 6,
      logo: '/tokens/pyusd.svg',
      coingeckoId: 'paypal-usd',
    },
  },
  AVALANCHE_FUJI: {
    USDC: {
      address: '0x5425890298aed601595a70AB815c96711a31Bc65',
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      logo: '/tokens/usdc.svg',
      coingeckoId: 'usd-coin',
    },
  },
} as const;

// Relayer Safety Limits
export const RELAYER_LIMITS = {
  MAX_SINGLE_TRANSACTION_USD: 1000,
  MAX_DAILY_VOLUME_USD: 10000,
  MAX_USER_DAILY_USD: 1000,
  MIN_FEE_USD: 0.10,
} as const;

// UI Constants
export const UI_CONFIG = {
  MAX_WIDTH: '1200px',
  HEADER_HEIGHT: '70px',
  SIDEBAR_WIDTH: '256px',
  ANIMATION_DURATION: 200,
  DEBOUNCE_DELAY: 300,
  RELAYER_STATUS_HEIGHT: '40px',
} as const;

// Route Paths
export const ROUTES = {
  HOME: '/',
  TRANSFER: '/transfer',
  TRANSACTIONS: '/transactions',
  ANALYTICS: '/analytics',
  DOCS: '/docs',
  ABOUT: '/about',
} as const;

// Feature Flags
export const FEATURES = {
  DARK_MODE: true,
  ANALYTICS: true,
  NOTIFICATIONS: true,
  RELAYER_STATUS: true,
  MULTI_TOKEN: true,
  BETA_MODE: true,
} as const;

// Default Values
export const DEFAULTS = {
  DEFAULT_CHAIN: 'BASE_SEPOLIA' as keyof typeof NETWORKS,
  DEFAULT_TOKEN: 'USDC',
  REFRESH_INTERVAL: 10000, // 10 seconds
  TRANSACTION_DEADLINE_MINUTES: 20,
} as const;

// Relayer Status
export const RELAYER_STATUS = {
  ONLINE: {
    label: 'Relayer Online',
    color: '#10b981',
    bgColor: '#d1fae5',
    icon: '✓',
  },
  OFFLINE: {
    label: 'Relayer Offline',
    color: '#ef4444',
    bgColor: '#fee2e2',
    icon: '✗',
  },
  CHECKING: {
    label: 'Checking Status...',
    color: '#f59e0b',
    bgColor: '#fef3c7',
    icon: '⟳',
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INSUFFICIENT_BALANCE: 'Insufficient balance for this transaction.',
  TRANSACTION_FAILED: 'Transaction failed. Please try again.',
  WALLET_NOT_CONNECTED: 'Please connect your wallet first.',
  RELAYER_OFFLINE: 'Relayer is currently offline. Please try again later.',
  AMOUNT_TOO_HIGH: 'Amount exceeds maximum transaction limit.',
  UNSUPPORTED_TOKEN: 'Token not supported on this network.',
  INVALID_RECIPIENT: 'Invalid recipient address.',
  FEE_CALCULATION_FAILED: 'Failed to calculate fee. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  TRANSFER_INITIATED: 'Transfer initiated successfully!',
  TRANSFER_CONFIRMED: 'Transfer confirmed on blockchain!',
  WALLET_CONNECTED: 'Wallet connected successfully.',
} as const;

// Helper functions
export const getNetworkById = (chainId: number) => {
  return Object.values(NETWORKS).find(network => network.chainId === chainId);
};

export const getTokensByChain = (chainKey: keyof typeof NETWORKS) => {
  return TOKENS[chainKey] || {};
};

export const getRelayerEndpoint = (path: string) => {
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.hostname === 'localhost'
      ? 'http://localhost:3000'
      : (process?.env?.NEXT_PUBLIC_RELAYER_URL || 'http://localhost:3000')
    : 'http://localhost:3000';
  
  return `${baseUrl}${API_CONFIG.BASE_PATH}${path}`;
};

export const formatTokenAmount = (amount: string, decimals: number): string => {
  const num = parseFloat(amount);
  if (isNaN(num)) return '0';
  return (num / Math.pow(10, decimals)).toFixed(decimals === 6 ? 2 : 4);
};

export const parseTokenAmount = (amount: string, decimals: number): string => {
  const num = parseFloat(amount);
  if (isNaN(num)) return '0';
  return Math.floor(num * Math.pow(10, decimals)).toString();
};