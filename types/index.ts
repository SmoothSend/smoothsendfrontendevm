// Global type definitions for the AVAX frontend application

// Common component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// API Response types
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
}

// Navigation types
export interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType;
}

// Protocol stats types
export interface ProtocolStats {
  totalValueLocked: string;
  totalTransactions: number;
  activeUsers: number;
  volume24h: string;
}

// Swap related types
export interface SwapToken {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  balance?: string;
}

export interface SwapQuote {
  inputAmount: string;
  outputAmount: string;
  priceImpact: string;
  route: string[];
  estimatedGas: string;
}

// Theme and UI types
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'warning' | 'info';
}