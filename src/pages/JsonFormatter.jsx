import React, { useState } from 'react';
import { Play, Copy, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import SEO from '../components/SEO';

const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    try {
      if (!input.trim()) {
        setOutput('');
        setError(null);
        return;
      }
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMinify = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '8rem 1.5rem 4rem', minHeight: '80vh' }}>
      <SEO title="JSON Formatter & Validator | Iron Claw" description="Format, validate, and minify massive JSON payloads instantly in the browser. Zero API latency." />
      
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: '#00ff88', fontSize: '2.5rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>JSON Formatter</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Instantly format, validate, or minify your JSON data. Runs entirely in your browser.</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={handleFormat} style={{ background: '#00ff88', color: '#000', border: 'none', fontWeight: 'bold' }}>
          <Play size={16} /> Format JSON
        </button>
        <button className="btn btn-outline" onClick={handleMinify} style={{ borderColor: '#00b3ff', color: '#00b3ff' }}>
          Minify
        </button>
        <button className="btn btn-outline" onClick={clearAll} style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
          <Trash2 size={16} /> Clear
        </button>
      </div>

      {error && (
        <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(255, 42, 42, 0.1)', borderLeft: '4px solid #ff2a2a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ff8a8a' }}>
          <AlertTriangle size={20} />
          <strong>Invalid JSON:</strong> {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Input JSON</label>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your raw JSON here...'
            style={{ 
              width: '100%', 
              height: '500px', 
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

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Output</label>
            <button onClick={copyToClipboard} style={{ background: 'transparent', border: 'none', color: copied ? '#00ff88' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
              {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea 
            value={output}
            readOnly
            placeholder='Formatted JSON will appear here...'
            style={{ 
              width: '100%', 
              height: '500px', 
              background: 'rgba(0,255,136,0.02)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '0.5rem', 
              padding: '1rem', 
              color: '#00ff88',
              fontFamily: 'monospace',
              fontSize: '14px',
              resize: 'vertical',
              outline: 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default JsonFormatter;
