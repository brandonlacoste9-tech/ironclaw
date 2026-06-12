import React, { useState } from 'react';
import { Lock, Copy, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import SEO from '../components/SEO';

const JwtInspector = () => {
  const [input, setInput] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [error, setError] = useState(null);

  const handleDecode = (token) => {
    setInput(token);
    try {
      if (!token.trim()) {
        setHeader('');
        setPayload('');
        setError(null);
        return;
      }
      
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('JWT must have 3 parts (header, payload, signature).');
      }

      const decodedHeader = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const decodedPayload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));

      setHeader(JSON.stringify(decodedHeader, null, 2));
      setPayload(JSON.stringify(decodedPayload, null, 2));
      setError(null);
    } catch (err) {
      setHeader('');
      setPayload('');
      setError(err.message);
    }
  };

  const clearAll = () => {
    setInput('');
    setHeader('');
    setPayload('');
    setError(null);
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '8rem 1.5rem 4rem', minHeight: '80vh' }}>
      <SEO title="JWT Inspector | Iron Claw" description="Securely inspect and decode JSON Web Tokens directly in your browser." />
      
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: '#ff2a2a', fontSize: '2.5rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>JWT Inspector</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Paste a JSON Web Token below to inspect its header and payload contents.</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button className="btn btn-outline" onClick={clearAll} style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
          <Trash2 size={16} /> Clear Token
        </button>
      </div>

      {error && (
        <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(255, 42, 42, 0.1)', borderLeft: '4px solid #ff2a2a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ff8a8a' }}>
          <AlertTriangle size={20} />
          <strong>Invalid Token:</strong> {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Encoded JWT</label>
          <textarea 
            value={input}
            onChange={(e) => handleDecode(e.target.value)}
            placeholder='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            style={{ 
              width: '100%', 
              height: '400px', 
              background: 'rgba(0,0,0,0.6)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '0.5rem', 
              padding: '1rem', 
              color: 'var(--text-primary)',
              fontFamily: 'monospace',
              fontSize: '14px',
              resize: 'vertical',
              outline: 'none',
              wordBreak: 'break-all'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: '0.5rem', color: '#ff2a2a', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Header (Algorithm & Type)</label>
            <textarea 
              value={header}
              readOnly
              style={{ 
                width: '100%', 
                height: '100px', 
                background: 'rgba(255,42,42,0.05)', 
                border: '1px solid var(--border-color)', 
                borderRadius: '0.5rem', 
                padding: '1rem', 
                color: '#ff2a2a',
                fontFamily: 'monospace',
                fontSize: '14px',
                resize: 'none',
                outline: 'none'
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <label style={{ marginBottom: '0.5rem', color: '#00b3ff', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Payload (Data)</label>
            <textarea 
              value={payload}
              readOnly
              style={{ 
                width: '100%', 
                height: '260px', 
                background: 'rgba(0,179,255,0.05)', 
                border: '1px solid var(--border-color)', 
                borderRadius: '0.5rem', 
                padding: '1rem', 
                color: '#00b3ff',
                fontFamily: 'monospace',
                fontSize: '14px',
                resize: 'none',
                outline: 'none'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JwtInspector;
