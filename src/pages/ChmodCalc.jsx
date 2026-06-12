import React, { useState, useEffect } from 'react';
import { TerminalSquare, CheckCircle, Copy } from 'lucide-react';
import SEO from '../components/SEO';

const ChmodCalc = () => {
  const [perms, setPerms] = useState({
    owner: { read: true, write: true, execute: true },
    group: { read: true, write: false, execute: true },
    public: { read: true, write: false, execute: true }
  });

  const [numMode, setNumMode] = useState('755');
  const [strMode, setStrMode] = useState('-rwxr-xr-x');
  const [copied, setCopied] = useState(false);

  const calculate = (p) => {
    let u = (p.owner.read ? 4 : 0) + (p.owner.write ? 2 : 0) + (p.owner.execute ? 1 : 0);
    let g = (p.group.read ? 4 : 0) + (p.group.write ? 2 : 0) + (p.group.execute ? 1 : 0);
    let o = (p.public.read ? 4 : 0) + (p.public.write ? 2 : 0) + (p.public.execute ? 1 : 0);
    setNumMode(`${u}${g}${o}`);

    const s = (val) => {
      return (val.read ? 'r' : '-') + (val.write ? 'w' : '-') + (val.execute ? 'x' : '-');
    };
    setStrMode(`-${s(p.owner)}${s(p.group)}${s(p.public)}`);
  };

  const handleCheckbox = (entity, type) => {
    const newPerms = { ...perms, [entity]: { ...perms[entity], [type]: !perms[entity][type] } };
    setPerms(newPerms);
    calculate(newPerms);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`chmod ${numMode}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const CheckGroup = ({ title, entity }) => (
    <div style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h3 style={{ marginTop: 0, color: 'var(--text-primary)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>{title}</h3>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', color: '#00ff88' }}>
        <input type="checkbox" checked={perms[entity].read} onChange={() => handleCheckbox(entity, 'read')} style={{ width: '18px', height: '18px' }} />
        Read (4)
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', color: '#ffb300' }}>
        <input type="checkbox" checked={perms[entity].write} onChange={() => handleCheckbox(entity, 'write')} style={{ width: '18px', height: '18px' }} />
        Write (2)
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', color: '#ff2a2a' }}>
        <input type="checkbox" checked={perms[entity].execute} onChange={() => handleCheckbox(entity, 'execute')} style={{ width: '18px', height: '18px' }} />
        Execute (1)
      </label>
    </div>
  );

  return (
    <div className="container animate-fade-in" style={{ padding: '8rem 1.5rem 4rem', minHeight: '80vh' }}>
      <SEO title="Chmod Calculator | Iron Claw" description="Visual Linux/Unix file permissions calculator." />
      
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: '#ffb300', fontSize: '2.5rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Chmod Calculator</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Visually calculate Linux/Unix file permissions and generate the command.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <CheckGroup title="Owner" entity="owner" />
        <CheckGroup title="Group" entity="group" />
        <CheckGroup title="Public" entity="public" />
      </div>

      <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', position: 'relative' }}>
        <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', marginTop: 0 }}>Permissions Output</h3>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Numeric</div>
            <div style={{ fontSize: '3rem', fontFamily: 'monospace', color: '#00ff88', fontWeight: 'bold' }}>{numMode}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Symbolic</div>
            <div style={{ fontSize: '3rem', fontFamily: 'monospace', color: '#00b3ff', fontWeight: 'bold' }}>{strMode}</div>
          </div>
        </div>
        
        <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(0,0,0,0.8)', padding: '1rem 2rem', borderRadius: '4px', border: '1px solid #ffb300', gap: '1rem' }}>
          <TerminalSquare size={20} color="#ffb300" />
          <code style={{ fontSize: '1.5rem', color: '#ffb300', fontFamily: 'monospace' }}>chmod {numMode} file.txt</code>
          <button onClick={copyToClipboard} style={{ background: 'transparent', border: 'none', color: copied ? '#00ff88' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '1rem' }}>
            {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChmodCalc;
