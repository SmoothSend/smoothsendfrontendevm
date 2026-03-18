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
      <label className="text-sm font-medium text-gray-300">
        Network
      </label>
      <select
        value={selectedChain}
        onChange={(e) => onChainChange(e.target.value as keyof typeof NETWORKS)}
        className="w-full px-4 py-3 rounded-lg phantom-input bg-black/40 text-white appearance-none cursor-pointer"
      >
        {Object.entries(NETWORKS).map(([key, network]) => (
          <option key={key} value={key} disabled={!network.enabled}>
            {network.name} {!network.enabled && '(Coming Soon)'}
          </option>
        ))}
      </select>
      <div className="text-xs text-gray-400">
        Fee: {NETWORKS[selectedChain].feePercent}% • Chain ID: {NETWORKS[selectedChain].chainId}
      </div>
    </div>
  );
};

export default NetworkSelector;
