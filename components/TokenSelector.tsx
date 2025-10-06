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
    return (
      <div style={{ padding: '12px', color: '#9ca3af', fontSize: '14px' }}>
        No tokens available on this network
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>
        Token
      </label>
      <select
        value={selectedToken}
        onChange={(e) => onTokenChange(e.target.value)}
        style={{
          padding: '12px 16px',
          fontSize: '14px',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          backgroundColor: 'white',
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        {tokenList.map(([symbol, token]) => (
          <option key={symbol} value={symbol}>
            {token.name} ({symbol})
          </option>
        ))}
      </select>
      <div style={{ fontSize: '12px', color: '#6b7280' }}>
        {tokenList.find(([s]) => s === selectedToken)?.[1]?.decimals} decimals
      </div>
    </div>
  );
};

export default TokenSelector;
