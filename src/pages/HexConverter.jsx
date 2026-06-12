import React, { useState, useEffect } from 'react';
import { Binary } from 'lucide-react';
import SEO from '../components/SEO';

const HexConverter = () => {
  const [text, setText] = useState('Iron Claw');
  const [hex, setHex] = useState('');
  const [binary, setBinary] = useState('');

  const textToHex = (str) => {
    return Array.from(str).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
  };

  const textToBinary = (str) => {
    return Array.from(str).map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
  };

  const hexToText = (hexStr) => {
    try {
      const clean = hexStr.replace(/\s/g, '');
      let str = '';
      for (let i = 0; i < clean.length; i += 2) {
        str += String.fromCharCode(parseInt(clean.substr(i, 2), 16));
      }
      return str;
    } catch (e) {
      return '';
    }
  };

  const binaryToText = (binStr) => {
    try {
      const clean = binStr.replace(/\s/g, '');
      let str = '';
      for (let i = 0; i < clean.length; i += 8) {
        str += String.fromCharCode(parseInt(clean.substr(i, 8), 2));
      }
      return str;
    } catch (e) {
      return '';
    }
  };

  const handleTextChange = (e) => {
    const val = e.target.value;
    setText(val);
    setHex(textToHex(val));
    setBinary(textToBinary(val));
  };

  const handleHexChange = (e) => {
    const val = e.target.value;
    setHex(val);
    const decoded = hexToText(val);
    setText(decoded);
    setBinary(textToBinary(decoded));
  };

  const handleBinaryChange = (e) => {
    const val = e.target.value;
    setBinary(val);
    const decoded = binaryToText(val);
    setText(decoded);
    setHex(textToHex(decoded));
  };

  useEffect(() => {
    // Initial generation
    setHex(textToHex(text));
    setBinary(textToBinary(text));
  }, []);

  const inputStyle = { width: '100%', height: '200px', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '1rem', fontFamily: 'monospace', fontSize: '14px', resize: 'vertical', outline: 'none' };

  return (
    <div className="container animate-fade-in" style={{ padding: '8rem 1.5rem 4rem', minHeight: '80vh' }}>
      <SEO title="Hex & Binary Converter | Iron Claw" description="Convert ASCII text back and forth to Hexadecimal and Binary." />
      
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: '#00ff88', fontSize: '2.5rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Text / Hex / Binary Converter</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Bi-directional converter. Edit any box and the others will instantly update.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '0.5rem', color: '#fff', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>ASCII Text</label>
          <textarea value={text} onChange={handleTextChange} style={{ ...inputStyle, color: '#fff' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '0.5rem', color: '#00b3ff', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Hexadecimal</label>
          <textarea value={hex} onChange={handleHexChange} style={{ ...inputStyle, color: '#00b3ff' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '0.5rem', color: '#00ff88', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Binary</label>
          <textarea value={binary} onChange={handleBinaryChange} style={{ ...inputStyle, color: '#00ff88' }} />
        </div>

      </div>
    </div>
  );
};

export default HexConverter;
