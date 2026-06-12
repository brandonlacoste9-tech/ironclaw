import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Copy, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

const CssGenerator = () => {
  const [color1, setColor1] = useState('#00ff88');
  const [color2, setColor2] = useState('#00b3ff');
  const [angle, setAngle] = useState(135);
  const [shadowX, setShadowX] = useState(0);
  const [shadowY, setShadowY] = useState(10);
  const [shadowBlur, setShadowBlur] = useState(20);
  const [shadowColor, setShadowColor] = useState('rgba(0, 255, 136, 0.3)');
  
  const [cssCode, setCssCode] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const code = `background: linear-gradient(${angle}deg, ${color1}, ${color2});
box-shadow: ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor};
border-radius: 16px;`;
    setCssCode(code);
  }, [color1, color2, angle, shadowX, shadowY, shadowBlur, shadowColor]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cssCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '8rem 1.5rem 4rem', minHeight: '80vh' }}>
      <SEO title="CSS Generator | Iron Claw" description="Visually generate CSS gradients and box-shadows." />
      
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: '#8d99ae', fontSize: '2.5rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>CSS Generator</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Visually generate complex gradients and glowing box-shadows.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        {/* Controls */}
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1rem' }}>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Gradient Settings</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Color 1</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} style={{ width: '50px', height: '40px', padding: 0, border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
              <input type="text" value={color1} onChange={(e) => setColor1(e.target.value)} style={{ flexGrow: 1, background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.5rem', borderRadius: '4px' }} />
            </div>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Color 2</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} style={{ width: '50px', height: '40px', padding: 0, border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
              <input type="text" value={color2} onChange={(e) => setColor2(e.target.value)} style={{ flexGrow: 1, background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.5rem', borderRadius: '4px' }} />
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
              <span>Angle</span> <span>{angle}°</span>
            </label>
            <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(e.target.value)} style={{ width: '100%' }} />
          </div>

          <h3 style={{ marginTop: '2rem', marginBottom: '1.5rem', color: 'var(--text-primary)', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>Shadow Settings</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
              <span>Blur Radius</span> <span>{shadowBlur}px</span>
            </label>
            <input type="range" min="0" max="100" value={shadowBlur} onChange={(e) => setShadowBlur(e.target.value)} style={{ width: '100%' }} />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Shadow Color (RGBA)</label>
            <input type="text" value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.5rem', borderRadius: '4px' }} />
          </div>
        </div>

        {/* Preview & Code */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ 
            height: '250px', 
            width: '100%', 
            background: `linear-gradient(${angle}deg, ${color1}, ${color2})`,
            boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor}`,
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
          }}>
            Preview
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.8)', padding: '0.5rem 1rem', borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem', border: '1px solid var(--border-color)', borderBottom: 'none' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'monospace' }}>CSS Code</span>
              <button onClick={copyToClipboard} style={{ background: 'transparent', border: 'none', color: copied ? '#00ff88' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <textarea 
              value={cssCode}
              readOnly
              style={{ 
                width: '100%', 
                height: '150px', 
                background: 'rgba(0,0,0,0.6)', 
                border: '1px solid var(--border-color)', 
                borderBottomLeftRadius: '0.5rem', 
                borderBottomRightRadius: '0.5rem', 
                padding: '1rem', 
                color: 'var(--text-primary)',
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

export default CssGenerator;
