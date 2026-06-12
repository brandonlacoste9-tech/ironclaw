import React, { useState } from 'react';
import { Key, Copy, CheckCircle, RefreshCw } from 'lucide-react';
import SEO from '../components/SEO';

const RsaGenerator = () => {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [keySize, setKeySize] = useState(2048);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedPub, setCopiedPub] = useState(false);
  const [copiedPriv, setCopiedPriv] = useState(false);

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const formatPEM = (b64, type) => {
    const lines = b64.match(/.{1,64}/g).join('\n');
    return `-----BEGIN ${type}-----\n${lines}\n-----END ${type}-----`;
  };

  const generateKeys = async () => {
    setIsGenerating(true);
    try {
      const keyPair = await window.crypto.subtle.generateKey(
        {
          name: "RSA-OAEP",
          modulusLength: keySize,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
      );

      const pubBuffer = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
      const privBuffer = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

      setPublicKey(formatPEM(arrayBufferToBase64(pubBuffer), 'PUBLIC KEY'));
      setPrivateKey(formatPEM(arrayBufferToBase64(privBuffer), 'PRIVATE KEY'));
    } catch (err) {
      console.error(err);
    }
    setIsGenerating(false);
  };

  const copyKey = async (key, type) => {
    if (!key) return;
    try {
      await navigator.clipboard.writeText(key);
      if (type === 'pub') {
        setCopiedPub(true);
        setTimeout(() => setCopiedPub(false), 2000);
      } else {
        setCopiedPriv(true);
        setTimeout(() => setCopiedPriv(false), 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '8rem 1.5rem 4rem', minHeight: '80vh' }}>
      <SEO title="RSA Keypair Generator | Iron Claw" description="Generate secure RSA public and private keys in your browser." />
      
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: '#ff00ff', fontSize: '2.5rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>RSA Key Generator</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Generate cryptographically secure public & private keypairs natively in your browser.</p>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Key Size (Bits)</label>
          <select 
            value={keySize} 
            onChange={(e) => setKeySize(Number(e.target.value))}
            style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px', outline: 'none' }}
          >
            <option value={1024}>1024 bit (Fast, Less Secure)</option>
            <option value={2048}>2048 bit (Standard)</option>
            <option value={4096}>4096 bit (Highly Secure, Slower)</option>
          </select>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={generateKeys} 
          disabled={isGenerating}
          style={{ background: '#ff00ff', color: '#fff', border: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem' }}
        >
          {isGenerating ? <RefreshCw className="animate-spin" size={18} /> : <Key size={18} />}
          {isGenerating ? 'Generating...' : 'Generate New Keypair'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ color: '#00ffcc', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Public Key</label>
            <button onClick={() => copyKey(publicKey, 'pub')} style={{ background: 'transparent', border: 'none', color: copiedPub ? '#00ffcc' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
              {copiedPub ? <CheckCircle size={14} /> : <Copy size={14} />} {copiedPub ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea 
            value={publicKey}
            readOnly
            placeholder='Public key will appear here...'
            style={{ 
              width: '100%', height: '400px', background: 'rgba(0,255,204,0.05)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '1rem', color: '#00ffcc', fontFamily: 'monospace', fontSize: '13px', resize: 'vertical', outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ color: '#ff2a2a', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Private Key</label>
            <button onClick={() => copyKey(privateKey, 'priv')} style={{ background: 'transparent', border: 'none', color: copiedPriv ? '#ff2a2a' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
              {copiedPriv ? <CheckCircle size={14} /> : <Copy size={14} />} {copiedPriv ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea 
            value={privateKey}
            readOnly
            placeholder='Private key will appear here...'
            style={{ 
              width: '100%', height: '400px', background: 'rgba(255,42,42,0.05)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '1rem', color: '#ff8a8a', fontFamily: 'monospace', fontSize: '13px', resize: 'vertical', outline: 'none'
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default RsaGenerator;
