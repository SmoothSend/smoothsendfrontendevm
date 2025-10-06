import React from 'react';
import { NETWORKS } from '../constants';

interface NetworkSelectorProps {
  selectedChain: keyof typeof NETWORKS;
  onChainChange: (chain: keyof typeof NETWORKS) => void;
}

export const NetworkSelector: React.FC<NetworkSelectorProps> = ({
  selectedChain,
  onChainChange,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>
        Network
      </label>
      <select
        value={selectedChain}
        onChange={(e) => onChainChange(e.target.value as keyof typeof NETWORKS)}
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
        {Object.entries(NETWORKS).map(([key, network]) => (
          <option key={key} value={key} disabled={!network.enabled}>
            {network.name} {!network.enabled && '(Coming Soon)'}
          </option>
        ))}
      </select>
      <div style={{ fontSize: '12px', color: '#6b7280' }}>
        Fee: {NETWORKS[selectedChain].feePercent}% • Chain ID: {NETWORKS[selectedChain].chainId}
      </div>
    </div>
  );
};

export default NetworkSelector;
