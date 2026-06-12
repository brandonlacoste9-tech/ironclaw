import React, { useState, useEffect } from 'react';
import { Network, AlertTriangle } from 'lucide-react';
import SEO from '../components/SEO';

const SubnetCalc = () => {
  const [ipInput, setIpInput] = useState('192.168.1.0/24');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (!ipInput.trim()) {
        setResults(null);
        setError(null);
        return;
      }

      const parts = ipInput.split('/');
      if (parts.length !== 2) throw new Error("Invalid format. Use IP/CIDR (e.g. 192.168.1.0/24)");
      
      const ip = parts[0];
      const cidr = parseInt(parts[1], 10);
      
      if (cidr < 0 || cidr > 32 || isNaN(cidr)) throw new Error("CIDR must be between 0 and 32");

      const ipParts = ip.split('.').map(Number);
      if (ipParts.length !== 4 || ipParts.some(p => p < 0 || p > 255 || isNaN(p))) {
        throw new Error("Invalid IPv4 address");
      }

      const ipNum = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
      const mask = cidr === 0 ? 0 : ~((1 << (32 - cidr)) - 1);
      
      const networkNum = ipNum & mask;
      const broadcastNum = networkNum | ~mask;

      const numToIp = (num) => [
        (num >>> 24) & 255,
        (num >>> 16) & 255,
        (num >>> 8) & 255,
        num & 255
      ].join('.');

      const usableHosts = cidr === 32 || cidr === 31 ? 0 : (broadcastNum - networkNum - 1);
      const minHost = cidr === 32 || cidr === 31 ? "N/A" : numToIp(networkNum + 1);
      const maxHost = cidr === 32 || cidr === 31 ? "N/A" : numToIp(broadcastNum - 1);

      setResults({
        ip: ip,
        netmask: numToIp(mask),
        network: numToIp(networkNum),
        broadcast: numToIp(broadcastNum),
        minHost,
        maxHost,
        totalHosts: usableHosts
      });
      setError(null);

    } catch (err) {
      setResults(null);
      setError(err.message);
    }
  }, [ipInput]);

  return (
    <div className="container animate-fade-in" style={{ padding: '8rem 1.5rem 4rem', minHeight: '80vh' }}>
      <SEO title="Subnet Calculator | Iron Claw" description="Calculate IPv4 subnet masks, networks, and host ranges." />
      
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: '#00ffcc', fontSize: '2.5rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Subnet Calculator</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Instantly calculate IPv4 Network, Broadcast, and usable Host ranges.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.5rem 1rem' }}>
          <Network size={20} color="var(--text-muted)" style={{ marginRight: '1rem' }} />
          <input 
            type="text" 
            value={ipInput} 
            onChange={(e) => setIpInput(e.target.value)} 
            placeholder="192.168.1.0/24"
            style={{ flexGrow: 1, background: 'transparent', border: 'none', color: '#00ffcc', fontSize: '1.2rem', outline: 'none', fontFamily: 'monospace' }}
          />
        </div>

        {error && (
          <div style={{ padding: '1rem', background: 'rgba(255, 42, 42, 0.1)', borderLeft: '4px solid #ff2a2a', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ff8a8a' }}>
            <AlertTriangle size={20} />
            <strong>Error:</strong> {error}
          </div>
        )}

        {results && (
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>IP Address</span>
              <span style={{ color: '#fff', fontSize: '1.2rem', fontFamily: 'monospace' }}>{results.ip}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Subnet Mask</span>
              <span style={{ color: '#00ffcc', fontSize: '1.2rem', fontFamily: 'monospace' }}>{results.netmask}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Network Address</span>
              <span style={{ color: '#ffb300', fontSize: '1.2rem', fontFamily: 'monospace' }}>{results.network}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Broadcast Address</span>
              <span style={{ color: '#ff2a2a', fontSize: '1.2rem', fontFamily: 'monospace' }}>{results.broadcast}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Min Host</span>
              <span style={{ color: '#00ff88', fontSize: '1.2rem', fontFamily: 'monospace' }}>{results.minHost}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Max Host</span>
              <span style={{ color: '#00ff88', fontSize: '1.2rem', fontFamily: 'monospace' }}>{results.maxHost}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gridColumn: '1 / -1', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Usable Hosts</span>
              <span style={{ color: '#fff', fontSize: '2rem', fontFamily: 'monospace', fontWeight: 'bold' }}>{results.totalHosts.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubnetCalc;
