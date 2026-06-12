import React, { useState } from 'react';
import { Palette, Copy, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

const ColorConverter = () => {
  const [hex, setHex] = useState('#00ff88');
  const [rgb, setRgb] = useState('rgb(0, 255, 136)');
  const [hsl, setHsl] = useState('hsl(152, 100%, 50%)');
  const [copied, setCopied] = useState('');

  // Simple HEX to RGB
  const hexToRgb = (hexStr) => {
    let r = 0, g = 0, b = 0;
    if (hexStr.length === 4) {
      r = parseInt(hexStr[1] + hexStr[1], 16);
      g = parseInt(hexStr[2] + hexStr[2], 16);
      b = parseInt(hexStr[3] + hexStr[3], 16);
    } else if (hexStr.length === 7) {
      r = parseInt(hexStr.substring(1, 3), 16);
      g = parseInt(hexStr.substring(3, 5), 16);
      b = parseInt(hexStr.substring(5, 7), 16);
    }
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Simple RGB to HSL
  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const handleHexChange = (e) => {
    let val = e.target.value;
    setHex(val);
    if (/^#([0-9A-F]{3}){1,2}$/i.test(val)) {
      const rgbStr = hexToRgb(val);
      setRgb(rgbStr);
      const rgbArr = rgbStr.match(/\d+/g);
      if (rgbArr) setHsl(rgbToHsl(rgbArr[0], rgbArr[1], rgbArr[2]));
    }
  };

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '8rem 1.5rem 4rem', minHeight: '80vh' }}>
      <SEO title="Color Converter | Iron Claw" description="Instantly convert colors between HEX, RGB, and HSL formats." />
      
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: hex, fontSize: '2.5rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Color Converter</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Instantly convert colors between HEX, RGB, and HSL formats.</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start' }}>
        <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>HEX</label>
              <button onClick={() => copyToClipboard(hex, 'hex')} style={{ background: 'transparent', border: 'none', color: copied === 'hex' ? hex : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                {copied === 'hex' ? <CheckCircle size={14} /> : <Copy size={14} />} {copied === 'hex' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <input type="text" value={hex} onChange={handleHexChange} style={{ width: '100%', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '1rem', color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: '16px', outline: 'none' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>RGB</label>
              <button onClick={() => copyToClipboard(rgb, 'rgb')} style={{ background: 'transparent', border: 'none', color: copied === 'rgb' ? hex : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                {copied === 'rgb' ? <CheckCircle size={14} /> : <Copy size={14} />} {copied === 'rgb' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <input type="text" value={rgb} readOnly style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '1rem', color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: '16px', outline: 'none' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>HSL</label>
              <button onClick={() => copyToClipboard(hsl, 'hsl')} style={{ background: 'transparent', border: 'none', color: copied === 'hsl' ? hex : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                {copied === 'hsl' ? <CheckCircle size={14} /> : <Copy size={14} />} {copied === 'hsl' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <input type="text" value={hsl} readOnly style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '1rem', color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: '16px', outline: 'none' }} />
          </div>

        </div>

        <div style={{ 
          flex: '1', 
          minWidth: '300px', 
          height: '300px', 
          background: /^#([0-9A-F]{3}){1,2}$/i.test(hex) ? hex : '#000', 
          borderRadius: '1rem',
          border: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: `0 10px 40px ${/^#([0-9A-F]{3}){1,2}$/i.test(hex) ? hex : 'rgba(0,0,0,0)'}44`
        }}>
          <Palette size={64} color={hsl.match(/\d+/g)?.[2] > 50 ? '#000' : '#fff'} opacity={0.5} />
        </div>
      </div>
    </div>
  );
};

export default ColorConverter;
