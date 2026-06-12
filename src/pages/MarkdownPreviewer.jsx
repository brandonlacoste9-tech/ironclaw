import React, { useState } from 'react';
import { FileText, Copy, Trash2, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

// Extremely basic markdown to HTML parser for demo purposes
// (Normally you'd use a robust library like marked or react-markdown)
const parseMarkdown = (md) => {
  if (!md) return '';
  let html = md
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2' target='_blank'>$1</a>")
    .replace(/`(.*?)`/gim, '<code style="background: rgba(0,0,0,0.3); padding: 2px 4px; border-radius: 3px;">$1</code>')
    .replace(/^\> (.*$)/gim, '<blockquote style="border-left: 3px solid #ff00ff; padding-left: 10px; margin-left: 0; color: #aaa;">$1</blockquote>')
    .replace(/\n$/gim, '<br />');

  // Wrap loose text in paragraphs
  html = html.split('\n\n').map(p => {
    if (p.startsWith('<h') || p.startsWith('<blockquote') || p.trim() === '') return p;
    return `<p style="margin-bottom: 1rem;">${p}</p>`;
  }).join('\n');

  return html;
};

const MarkdownPreviewer = () => {
  const [input, setInput] = useState('# Hello Iron Claw\n\nType some **Markdown** here and watch it render instantly on the right.\n\n### Features\n- Blazing fast\n- No APIs\n- Local execution\n\n> "Hacker Core utilities to the moon!"\n\n`const ironClaw = true;`');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (!input) return;
    try {
      await navigator.clipboard.writeText(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '8rem 1.5rem 4rem', minHeight: '80vh' }}>
      <SEO title="Markdown Previewer | Iron Claw" description="Write raw markdown and preview the rendered HTML instantly." />
      
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: '#ff00ff', fontSize: '2.5rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Markdown Previewer</h1>
        <p style={{ color: 'var(--text-secondary)' }}>A dual-pane editor to instantly write and preview Markdown.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Raw Markdown</label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setInput('')} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                <Trash2 size={14} /> Clear
              </button>
              <button onClick={copyToClipboard} style={{ background: 'transparent', border: 'none', color: copied ? '#ff00ff' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                {copied ? <CheckCircle size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
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
          <label style={{ marginBottom: '0.5rem', color: '#ff00ff', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Live Preview</label>
          <div 
            style={{ 
              width: '100%', 
              height: '500px', 
              background: 'rgba(255,0,255,0.05)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '0.5rem', 
              padding: '1.5rem', 
              color: '#fff',
              overflowY: 'auto',
              fontFamily: 'system-ui, sans-serif'
            }}
            dangerouslySetInnerHTML={{ __html: parseMarkdown(input) }}
          />
        </div>
      </div>
    </div>
  );
};

export default MarkdownPreviewer;
