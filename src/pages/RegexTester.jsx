import React, { useState, useEffect } from 'react';
import { SearchCode, AlertTriangle } from 'lucide-react';
import SEO from '../components/SEO';

const RegexTester = () => {
  const [pattern, setPattern] = useState('[A-Z][a-z]+');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('Welcome to Iron Claw. Here we test Regular Expressions.');
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const [highlightedHtml, setHighlightedHtml] = useState('');

  useEffect(() => {
    try {
      if (!pattern) {
        setMatches([]);
        setHighlightedHtml(escapeHtml(text));
        setError(null);
        return;
      }

      const regex = new RegExp(pattern, flags);
      
      // Find matches
      let found = [];
      let match;
      if (flags.includes('g')) {
        // Prevent infinite loops on empty match patterns like ^ or .* with g flag if not handled
        if (new RegExp(pattern, flags).exec('') !== null) {
          throw new Error("Pattern matches empty string infinitely.");
        }
        while ((match = regex.exec(text)) !== null) {
          found.push(match);
        }
      } else {
        match = regex.exec(text);
        if (match) found.push(match);
      }
      setMatches(found);
      
      // Generate Highlighted HTML
      if (found.length > 0) {
        let html = '';
        let lastIndex = 0;
        
        if (flags.includes('g')) {
           const safeRegex = new RegExp(pattern, flags);
           let m;
           while ((m = safeRegex.exec(text)) !== null) {
             html += escapeHtml(text.substring(lastIndex, m.index));
             html += `<mark style="background: rgba(255, 215, 0, 0.4); color: #ffd700; border-radius: 2px; padding: 0 2px;">${escapeHtml(m[0])}</mark>`;
             lastIndex = m.index + m[0].length;
           }
           html += escapeHtml(text.substring(lastIndex));
        } else {
           html = escapeHtml(text.substring(0, found[0].index)) + 
                  `<mark style="background: rgba(255, 215, 0, 0.4); color: #ffd700; border-radius: 2px; padding: 0 2px;">${escapeHtml(found[0][0])}</mark>` + 
                  escapeHtml(text.substring(found[0].index + found[0][0].length));
        }
        setHighlightedHtml(html.replace(/\n/g, '<br/>'));
      } else {
        setHighlightedHtml(escapeHtml(text).replace(/\n/g, '<br/>'));
      }

      setError(null);
    } catch (err) {
      setError(err.message);
      setMatches([]);
      setHighlightedHtml(escapeHtml(text).replace(/\n/g, '<br/>'));
    }
  }, [pattern, flags, text]);

  const escapeHtml = (str) => {
    return str.replace(/[&<>'"]/g, 
      tag => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;'
        }[tag])
    );
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '8rem 1.5rem 4rem', minHeight: '80vh' }}>
      <SEO title="Regex Tester | Iron Claw" description="Test regular expressions interactively." />
      
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: '#ffd700', fontSize: '2.5rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Regex Tester</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Instantly test and visualize JavaScript regular expressions.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Pattern Input */}
        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.5rem 1rem' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem', paddingRight: '0.5rem' }}>/</span>
          <input 
            type="text" 
            value={pattern} 
            onChange={(e) => setPattern(e.target.value)} 
            placeholder="pattern"
            style={{ flexGrow: 1, background: 'transparent', border: 'none', color: '#ffd700', fontSize: '1.2rem', outline: 'none', fontFamily: 'monospace' }}
          />
          <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>/</span>
          <input 
            type="text" 
            value={flags} 
            onChange={(e) => setFlags(e.target.value)} 
            placeholder="flags"
            style={{ width: '60px', background: 'transparent', border: 'none', color: '#00b3ff', fontSize: '1.2rem', outline: 'none', fontFamily: 'monospace' }}
          />
        </div>

        {error && (
          <div style={{ padding: '1rem', background: 'rgba(255, 42, 42, 0.1)', borderLeft: '4px solid #ff2a2a', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ff8a8a' }}>
            <AlertTriangle size={20} />
            <strong>Regex Error:</strong> {error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Test Text */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Test String</label>
            <div style={{ position: 'relative', height: '400px' }}>
              {/* Highlight Overlay */}
              <div 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.5', color: 'transparent', pointerEvents: 'none', wordBreak: 'break-all', overflowY: 'auto' }}
                dangerouslySetInnerHTML={{ __html: highlightedHtml }}
              />
              {/* Actual Textarea */}
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '1rem', color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.5', resize: 'none', outline: 'none', wordBreak: 'break-all', opacity: 0.8 }}
                spellCheck="false"
              />
            </div>
          </div>

          {/* Results */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Matches ({matches.length})</label>
            <div className="glass-panel" style={{ flexGrow: 1, height: '400px', overflowY: 'auto', padding: '1rem', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}>
              {matches.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No matches found.</div>
              ) : (
                matches.map((match, i) => (
                  <div key={i} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Match {i + 1}:</span>
                      <strong style={{ color: '#ffd700', fontFamily: 'monospace' }}>{match[0]}</strong>
                    </div>
                    {match.length > 1 && (
                      <div style={{ paddingLeft: '1rem', fontSize: '0.9rem' }}>
                        {match.slice(1).map((group, g) => (
                          <div key={g} style={{ color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                            Group {g + 1}: <span style={{ color: '#00b3ff' }}>{group}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegexTester;
