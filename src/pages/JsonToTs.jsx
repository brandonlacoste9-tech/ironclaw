import React, { useState } from 'react';
import { Braces, Copy, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import SEO from '../components/SEO';

const JsonToTs = () => {
  const [input, setInput] = useState('{\n  "id": 1,\n  "name": "Iron Claw",\n  "isActive": true,\n  "tags": ["developer", "tools"]\n}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const generateTypeScript = (jsonObj, rootName = 'RootInterface') => {
    let interfaces = [];
    
    const getType = (val) => {
      if (val === null) return 'any';
      if (Array.isArray(val)) {
        if (val.length === 0) return 'any[]';
        const itemType = getType(val[0]);
        return itemType.includes(' ') ? `(${itemType})[]` : `${itemType}[]`;
      }
      if (typeof val === 'object') {
        return 'object';
      }
      return typeof val;
    };

    const parseObject = (obj, interfaceName) => {
      let lines = [`export interface ${interfaceName} {`];
      for (const key in obj) {
        let val = obj[key];
        let typeStr = getType(val);
        
        if (typeStr === 'object') {
          const nestedName = key.charAt(0).toUpperCase() + key.slice(1);
          parseObject(val, nestedName);
          typeStr = nestedName;
        } else if (Array.isArray(val) && val.length > 0 && typeof val[0] === 'object' && val[0] !== null) {
          const nestedName = key.charAt(0).toUpperCase() + key.slice(1) + 'Item';
          parseObject(val[0], nestedName);
          typeStr = `${nestedName}[]`;
        }

        const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
        lines.push(`  ${safeKey}: ${typeStr};`);
      }
      lines.push('}');
      interfaces.unshift(lines.join('\n'));
    };

    parseObject(jsonObj, rootName);
    return interfaces.join('\n\n');
  };

  const handleConvert = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
        throw new Error('Input must be a JSON object at the root level.');
      }
      setOutput(generateTypeScript(parsed));
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

  return (
    <div className="container animate-fade-in" style={{ padding: '8rem 1.5rem 4rem', minHeight: '80vh' }}>
      <SEO title="JSON to TypeScript | Iron Claw" description="Instantly convert JSON objects into TypeScript interfaces." />
      
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: '#007acc', fontSize: '2.5rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>JSON to TypeScript</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Paste a JSON response and instantly generate the TypeScript interface definitions.</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={handleConvert} style={{ background: '#007acc', color: '#fff', border: 'none', fontWeight: 'bold' }}>
          <Braces size={16} /> Generate Interface
        </button>
        <button className="btn btn-outline" onClick={() => setInput('')} style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
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
          <label style={{ marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Raw JSON</label>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
            <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>TypeScript Interface</label>
            <button onClick={copyToClipboard} style={{ background: 'transparent', border: 'none', color: copied ? '#007acc' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
              {copied ? <CheckCircle size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea 
            value={output}
            readOnly
            style={{ 
              width: '100%', 
              height: '500px', 
              background: 'rgba(0,122,204,0.05)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '0.5rem', 
              padding: '1rem', 
              color: '#00b3ff',
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

export default JsonToTs;
