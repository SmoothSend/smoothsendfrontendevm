import React from 'react';
import { NETWORKS, TOKENS, getTokensByChain } from '../constants';

interface TokenSelectorProps {
  selectedChain: keyof typeof NETWORKS;
  selectedToken: string;
  onTokenChange: (token: string) => void;
}

export const TokenSelector: React.FC<TokenSelectorProps> = ({
  selectedChain,
  selectedToken,
  onTokenChange,
}) => {
  const availableTokens = getTokensByChain(selectedChain);
  const tokenList = Object.entries(availableTokens);

  if (tokenList.length === 0) {
      <div className="p-3 text-gray-400 text-sm">
        No tokens available on this network
      </div>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label className="text-sm font-medium text-gray-300">
        Token
      </label>
      <select
        value={selectedToken}
        onChange={(e) => onTokenChange(e.target.value)}
        className="w-full px-4 py-3 rounded-lg phantom-input bg-black/40 text-white appearance-none cursor-pointer"
      >
        {tokenList.map(([symbol, token]) => (
          <option key={symbol} value={symbol}>
            {token.name} ({symbol})
          </option>
        ))}
      </select>
      <div className="text-xs text-gray-400">
        {tokenList.find(([s]) => s === selectedToken)?.[1]?.decimals} decimals
      </div>
    </div>
  );
};

export default TokenSelector;
