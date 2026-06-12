import React, { useState } from 'react';
import { Fingerprint, Copy, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import SEO from '../components/SEO';

const HashGenerator = () => {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({ sha1: '', sha256: '', sha512: '' });
  const [copied, setCopied] = useState('');

  const generateHash = async (text, algorithm) => {
    const msgBuffer = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm, msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleInputChange = async (e) => {
    const val = e.target.value;
    setInput(val);
    
    if (!val) {
      setHashes({ sha1: '', sha256: '', sha512: '' });
      return;
    }

    try {
      const [sha1, sha256, sha512] = await Promise.all([
        generateHash(val, 'SHA-1'),
        generateHash(val, 'SHA-256'),
        generateHash(val, 'SHA-512')
      ]);
      setHashes({ sha1, sha256, sha512 });
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = async (text, id) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '8rem 1.5rem 4rem', minHeight: '80vh' }}>
      <SEO title="Hash Generator | Iron Claw" description="Instantly generate secure SHA-256, SHA-512, and SHA-1 hashes directly in your browser." />
      
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: '#ff4d4d', fontSize: '2.5rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Hash Generator</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Instantly generate cryptographic hashes. The data never leaves your computer.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Input String</label>
          <textarea 
            value={input}
            onChange={handleInputChange}
            placeholder='Type or paste string to hash...'
            style={{ 
              width: '100%', 
              height: '150px', 
              background: 'rgba(0,0,0,0.6)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '0.5rem', 
              padding: '1rem', 
              color: 'var(--text-primary)',
              fontFamily: 'monospace',
              fontSize: '14px',
              resize: 'vertical',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[
            { id: 'sha256', name: 'SHA-256', val: hashes.sha256, color: '#00ff88' },
            { id: 'sha512', name: 'SHA-512', val: hashes.sha512, color: '#00b3ff' },
            { id: 'sha1', name: 'SHA-1', val: hashes.sha1, color: '#ff2a2a' }
          ].map(hash => (
            <div key={hash.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ color: hash.color, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{hash.name}</label>
                <button onClick={() => copyToClipboard(hash.val, hash.id)} style={{ background: 'transparent', border: 'none', color: copied === hash.id ? hash.color : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                  {copied === hash.id ? <CheckCircle size={14} /> : <Copy size={14} />}
                  {copied === hash.id ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <input 
                value={hash.val}
                readOnly
                placeholder='Hash will appear here...'
                style={{ 
                  width: '100%', 
                  background: 'rgba(0,0,0,0.4)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '0.5rem', 
                  padding: '1rem', 
                  color: hash.color,
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HashGenerator;
