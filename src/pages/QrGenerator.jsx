import React, { useState } from 'react';
import { QrCode, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import SEO from '../components/SEO';

const QrGenerator = () => {
  const [input, setInput] = useState('https://ironclaw.ca');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fgColor, setFgColor] = useState('#000000');

  const downloadQR = () => {
    const svg = document.getElementById('qr-code-svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'ironclaw-qr.png';
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '8rem 1.5rem 4rem', minHeight: '80vh' }}>
      <SEO title="QR Code Generator | Iron Claw" description="Generate high-resolution QR codes instantly in the browser." />
      
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: '#00ffcc', fontSize: '2.5rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>QR Generator</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Instantly render high-resolution QR codes for any URL or text.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Text or URL</label>
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ width: '100%', height: '100px', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-color)', color: '#fff', padding: '1rem', borderRadius: '0.5rem', outline: 'none', resize: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '2rem' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Foreground</label>
              <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} style={{ width: '60px', height: '40px', cursor: 'pointer', border: 'none', padding: 0 }} />
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Background</label>
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ width: '60px', height: '40px', cursor: 'pointer', border: 'none', padding: 0 }} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ padding: '2rem', background: bgColor, borderRadius: '1rem', boxShadow: '0 10px 40px rgba(0,255,204,0.1)' }}>
            <QRCodeSVG 
              id="qr-code-svg"
              value={input || ' '} 
              size={256} 
              bgColor={bgColor} 
              fgColor={fgColor} 
              level="H" 
              includeMargin={false}
            />
          </div>
          
          <button className="btn btn-primary" onClick={downloadQR} style={{ marginTop: '2rem', background: '#00ffcc', color: '#000', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Download size={18} /> Download PNG
          </button>
        </div>

      </div>
    </div>
  );
};

export default QrGenerator;
