import React, { useState, useEffect } from 'react';
import { Clock, Copy, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

const CronGenerator = () => {
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [day, setDay] = useState('*');
  const [month, setMonth] = useState('*');
  const [weekday, setWeekday] = useState('*');
  
  const [cronString, setCronString] = useState('* * * * *');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCronString(`${minute} ${hour} ${day} ${month} ${weekday}`);
  }, [minute, hour, day, month, weekday]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cronString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const inputStyle = { width: '100%', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-color)', color: '#fff', padding: '0.75rem', borderRadius: '4px', fontSize: '1rem' };

  return (
    <div className="container animate-fade-in" style={{ padding: '8rem 1.5rem 4rem', minHeight: '80vh' }}>
      <SEO title="Cron Generator | Iron Claw" description="Visually build cron job schedule expressions." />
      
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: '#ffb300', fontSize: '2.5rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Cron Generator</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Build cron schedule expressions quickly without having to memorize the syntax.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div>
          <label style={{ display: 'block', color: '#ffb300', marginBottom: '0.5rem', fontWeight: 'bold' }}>Minute</label>
          <input type="text" value={minute} onChange={(e) => setMinute(e.target.value)} style={inputStyle} />
          <small style={{ color: 'var(--text-muted)' }}>0-59, *, */5</small>
        </div>
        <div>
          <label style={{ display: 'block', color: '#ffb300', marginBottom: '0.5rem', fontWeight: 'bold' }}>Hour</label>
          <input type="text" value={hour} onChange={(e) => setHour(e.target.value)} style={inputStyle} />
          <small style={{ color: 'var(--text-muted)' }}>0-23, *, */2</small>
        </div>
        <div>
          <label style={{ display: 'block', color: '#ffb300', marginBottom: '0.5rem', fontWeight: 'bold' }}>Day of Month</label>
          <input type="text" value={day} onChange={(e) => setDay(e.target.value)} style={inputStyle} />
          <small style={{ color: 'var(--text-muted)' }}>1-31, *</small>
        </div>
        <div>
          <label style={{ display: 'block', color: '#ffb300', marginBottom: '0.5rem', fontWeight: 'bold' }}>Month</label>
          <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} style={inputStyle} />
          <small style={{ color: 'var(--text-muted)' }}>1-12, *, JAN-DEC</small>
        </div>
        <div>
          <label style={{ display: 'block', color: '#ffb300', marginBottom: '0.5rem', fontWeight: 'bold' }}>Day of Week</label>
          <input type="text" value={weekday} onChange={(e) => setWeekday(e.target.value)} style={inputStyle} />
          <small style={{ color: 'var(--text-muted)' }}>0-6 (0 is Sunday), *, SUN-SAT</small>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', position: 'relative' }}>
        <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', marginTop: 0 }}>Generated Cron Expression</h3>
        <div style={{ fontSize: '4rem', fontFamily: 'monospace', color: '#ffb300', fontWeight: 'bold', letterSpacing: '4px', textShadow: '0 0 20px rgba(255, 179, 0, 0.3)' }}>
          {cronString}
        </div>
        
        <button className="btn" onClick={copyToClipboard} style={{ marginTop: '2rem', background: 'transparent', border: '1px solid #ffb300', color: '#ffb300' }}>
          {copied ? <CheckCircle size={16} /> : <Copy size={16} />} {copied ? 'Copied to Clipboard!' : 'Copy Expression'}
        </button>
      </div>
    </div>
  );
};

export default CronGenerator;
