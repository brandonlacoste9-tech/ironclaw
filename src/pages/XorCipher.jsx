import React, { useState, useEffect } from 'react';
import { ShieldAlert, ArrowRightLeft } from 'lucide-react';
import SEO from '../components/SEO';

const XorCipher = () => {
  const [input, setInput] = useState('Secret Malware Payload');
  const [key, setKey] = useState('IRONCLAW');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('text'); // 'text' or 'hex'

  useEffect(() => {
    if (!input || !key) {
      setOutput('');
      return;
    }

    try {
      let result = '';
      if (mode === 'text') {
        for (let i = 0; i < input.length; i++) {
          const charCode = input.charCodeAt(i) ^ key.charCodeAt(i % key.length);
          // Convert to hex output for safe viewing since XOR often creates unprintable ASCII
          result += charCode.toString(16).padStart(2, '0') + ' ';
        }
      } else {
        // Hex mode: input is hex, output is text
        const hexParts = input.trim().split(/\s+/);
        for (let i = 0; i < hexParts.length; i++) {
          if (hexParts[i]) {
            const charCode = parseInt(hexParts[i], 16) ^ key.charCodeAt(i % key.length);
            result += String.fromCharCode(charCode);
          }
        }
      }
      setOutput(result.trim());
    } catch (e) {
      setOutput('Error processing input.');
    }
  }, [input, key, mode]);

  return (
    <div className="container animate-fade-in" style={{ padding: '8rem 1.5rem 4rem', minHeight: '80vh' }}>
      <SEO title="XOR Cipher | Iron Claw" description="Encrypt and decrypt strings using bitwise XOR operations." />
      
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: '#ff00ff', fontSize: '2.5rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>XOR Cipher Encryptor</h1>
        <p style={{ color: 'var(--text-secondary)' }}>A classic malware analysis tool to encrypt/decrypt payloads using a repeating XOR key.</p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ flexGrow: 1, minWidth: '200px' }}>
          <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>Secret Key (ASCII)</label>
          <input 
            type="text" 
            value={key} 
            onChange={(e) => setKey(e.target.value)} 
            placeholder="Key"
            style={{ width: '100%', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-color)', color: '#ff00ff', padding: '0.75rem', borderRadius: '4px', outline: 'none', fontFamily: 'monospace', fontWeight: 'bold' }}
          />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <button 
            className={`btn ${mode === 'text' ? 'btn-primary' : 'btn-outline'}`} 
            onClick={() => setMode('text')}
            style={mode === 'text' ? { background: '#ff00ff', color: '#fff', border: 'none' } : {}}
          >
            Encrypt (Text → Hex)
          </button>
          <ArrowRightLeft size={20} color="var(--text-muted)" />
          <button 
            className={`btn ${mode === 'hex' ? 'btn-primary' : 'btn-outline'}`} 
            onClick={() => setMode('hex')}
            style={mode === 'hex' ? { background: '#00ffcc', color: '#000', border: 'none' } : {}}
          >
            Decrypt (Hex → Text)
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{mode === 'text' ? 'Input Text' : 'Input Hex (Space Separated)'}</label>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: '100%', height: '300px', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '1rem', color: '#fff', fontFamily: 'monospace', fontSize: '14px', resize: 'vertical', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '0.5rem', color: mode === 'text' ? '#00ffcc' : '#ff00ff', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{mode === 'text' ? 'Encrypted Output (Hex)' : 'Decrypted Output (Text)'}</label>
          <textarea 
            value={output}
            readOnly
            style={{ width: '100%', height: '300px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '1rem', color: mode === 'text' ? '#00ffcc' : '#ff00ff', fontFamily: 'monospace', fontSize: '14px', resize: 'vertical', outline: 'none', wordBreak: 'break-all' }}
          />
        </div>

      </div>
    </div>
  );
};

export default XorCipher;
