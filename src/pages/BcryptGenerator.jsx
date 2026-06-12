import React, { useState } from 'react';
import { Lock, Copy, CheckCircle, ShieldCheck, ShieldAlert } from 'lucide-react';
import bcrypt from 'bcryptjs';
import SEO from '../components/SEO';

const BcryptGenerator = () => {
  const [input, setInput] = useState('');
  const [saltRounds, setSaltRounds] = useState(10);
  const [hash, setHash] = useState('');
  const [isHashing, setIsHashing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Verifier state
  const [verifyPlain, setVerifyPlain] = useState('');
  const [verifyHash, setVerifyHash] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);

  const generateHash = () => {
    if (!input) return;
    setIsHashing(true);
    // Use setTimeout to allow UI to render spinner (bcrypt is synchronous/blocking in browser usually without workers)
    setTimeout(() => {
      try {
        const salt = bcrypt.genSaltSync(saltRounds);
        const result = bcrypt.hashSync(input, salt);
        setHash(result);
      } catch (err) {
        console.error(err);
      }
      setIsHashing(false);
    }, 10);
  };

  const handleVerify = () => {
    if (!verifyPlain || !verifyHash) return;
    try {
      const match = bcrypt.compareSync(verifyPlain, verifyHash);
      setVerifyResult(match);
    } catch (err) {
      setVerifyResult(false);
    }
  };

  const copyToClipboard = async () => {
    if (!hash) return;
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '8rem 1.5rem 4rem', minHeight: '80vh' }}>
      <SEO title="Bcrypt Hash Generator | Iron Claw" description="Generate and verify bcrypt hashes in your browser." />
      
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: '#00ff88', fontSize: '2.5rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Bcrypt Tool</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Generate and verify secure bcrypt password hashes.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        
        {/* Generator */}
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1rem' }}>
          <h3 style={{ color: '#00ff88', marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock size={20} /> Hash Generator
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Plain Text String</label>
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Enter password..."
              style={{ width: '100%', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.75rem', borderRadius: '4px', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Salt Rounds: {saltRounds}</label>
            <input 
              type="range" 
              min="4" 
              max="15" 
              value={saltRounds} 
              onChange={(e) => setSaltRounds(Number(e.target.value))} 
              style={{ width: '100%' }}
            />
            <small style={{ color: 'var(--text-muted)' }}>Higher is more secure but slower.</small>
          </div>

          <button className="btn btn-primary" onClick={generateHash} disabled={isHashing} style={{ width: '100%', background: '#00ff88', color: '#000', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            {isHashing ? 'Hashing...' : 'Generate Hash'}
          </button>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Result</label>
              <button onClick={copyToClipboard} style={{ background: 'transparent', border: 'none', color: copied ? '#00ff88' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                {copied ? <CheckCircle size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <textarea 
              value={hash} 
              readOnly 
              placeholder="Hash will appear here..."
              style={{ width: '100%', height: '80px', background: 'rgba(0,255,136,0.05)', border: '1px solid var(--border-color)', color: '#00ff88', padding: '0.75rem', borderRadius: '4px', fontFamily: 'monospace', resize: 'none', outline: 'none', wordBreak: 'break-all' }}
            />
          </div>
        </div>

        {/* Verifier */}
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1rem' }}>
          <h3 style={{ color: '#00b3ff', marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={20} /> Hash Verifier
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Plain Text String</label>
            <input 
              type="text" 
              value={verifyPlain} 
              onChange={(e) => setVerifyPlain(e.target.value)} 
              placeholder="Enter text to check..."
              style={{ width: '100%', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.75rem', borderRadius: '4px', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Bcrypt Hash</label>
            <input 
              type="text" 
              value={verifyHash} 
              onChange={(e) => setVerifyHash(e.target.value)} 
              placeholder="$2a$10$..."
              style={{ width: '100%', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.75rem', borderRadius: '4px', outline: 'none', fontFamily: 'monospace' }}
            />
          </div>

          <button className="btn btn-primary" onClick={handleVerify} style={{ width: '100%', background: '#00b3ff', color: '#000', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Verify Match
          </button>

          {verifyResult !== null && (
            <div style={{ 
              padding: '1rem', 
              borderRadius: '4px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              background: verifyResult ? 'rgba(0,255,136,0.1)' : 'rgba(255,42,42,0.1)',
              borderLeft: `4px solid ${verifyResult ? '#00ff88' : '#ff2a2a'}`,
              color: verifyResult ? '#00ff88' : '#ff8a8a',
              fontWeight: 'bold'
            }}>
              {verifyResult ? <ShieldCheck size={20} /> : <ShieldAlert size={20} />}
              {verifyResult ? 'Match! The password corresponds to the hash.' : 'No Match! The password is incorrect.'}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default BcryptGenerator;
