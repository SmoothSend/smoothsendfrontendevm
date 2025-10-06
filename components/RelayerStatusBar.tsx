"use client"

import React, { useEffect, useState } from 'react';
import { RELAYER_STATUS, API_CONFIG, RELAYER_LIMITS } from '../constants';

interface RelayerHealthResponse {
  status: 'healthy' | 'degraded' | 'down';
  uptime: number;
  activeChains: number;
  lastCheck: string;
  limits: {
    maxSingleTransaction: string;
    maxDailyVolume: string;
  };
}

export const RelayerStatusBar: React.FC = () => {
  const [status, setStatus] = useState<'ONLINE' | 'OFFLINE' | 'CHECKING'>('CHECKING');
  const [healthData, setHealthData] = useState<RelayerHealthResponse | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    checkRelayerStatus();
    const interval = setInterval(checkRelayerStatus, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const checkRelayerStatus = async () => {
    try {
      const baseUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost'
        ? 'http://localhost:3000'
        : API_CONFIG.RELAYER_URL;
      
      const response = await fetch(`${baseUrl}${API_CONFIG.BASE_PATH}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });

      if (response.ok) {
        const data = await response.json();
        setHealthData(data.data);
        setStatus('ONLINE');
      } else {
        setStatus('OFFLINE');
      }
    } catch (error) {
      console.error('Relayer health check failed:', error);
      setStatus('OFFLINE');
    }
  };

  const statusConfig = RELAYER_STATUS[status];

  return (
    <div
      style={{
        backgroundColor: statusConfig.bgColor,
        borderBottom: `2px solid ${statusConfig.color}`,
        padding: '8px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '14px',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span
          style={{
            fontSize: '18px',
            color: statusConfig.color,
            animation: status === 'CHECKING' ? 'spin 1s linear infinite' : 'none',
          }}
        >
          {statusConfig.icon}
        </span>
        <span style={{ color: statusConfig.color }}>
          {statusConfig.label}
        </span>
        
        {status === 'ONLINE' && healthData && (
          <span style={{ color: '#6b7280', fontSize: '13px', marginLeft: '8px' }}>
            • {healthData.activeChains} chains active
            {isExpanded && ` • Uptime: ${Math.floor(healthData.uptime / 1000)}s`}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {status === 'ONLINE' && !isExpanded && (
          <span style={{ color: '#6b7280', fontSize: '13px' }}>
            Max: ${RELAYER_LIMITS.MAX_SINGLE_TRANSACTION_USD.toLocaleString()} per tx
          </span>
        )}
        
        {isExpanded && status === 'ONLINE' && healthData && (
          <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: '#6b7280' }}>
            <div>
              <strong>Single TX:</strong> ${RELAYER_LIMITS.MAX_SINGLE_TRANSACTION_USD.toLocaleString()}
            </div>
            <div>
              <strong>Daily Volume:</strong> ${RELAYER_LIMITS.MAX_DAILY_VOLUME_USD.toLocaleString()}
            </div>
            <div>
              <strong>Fee:</strong> 0.25%
            </div>
          </div>
        )}

        <span style={{ fontSize: '12px', color: '#9ca3af' }}>
          {isExpanded ? '▲' : '▼'}
        </span>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default RelayerStatusBar;
