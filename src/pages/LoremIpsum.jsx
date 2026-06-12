import React, { useState } from 'react';
import { Type, Copy, Trash2, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

const words = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"];

const LoremIpsum = () => {
  const [paragraphs, setParagraphs] = useState(3);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const generateLorem = () => {
    let result = [];
    const pCount = Math.min(Math.max(1, paragraphs), 100);
    
    for (let i = 0; i < pCount; i++) {
      let p = [];
      const wordCount = Math.floor(Math.random() * 30) + 20; // 20-50 words
      for (let w = 0; w < wordCount; w++) {
        p.push(words[Math.floor(Math.random() * words.length)]);
      }
      p[0] = p[0].charAt(0).toUpperCase() + p[0].slice(1);
      result.push(p.join(' ') + '.');
    }
    
    // Always start first paragraph with Lorem ipsum
    if (result.length > 0) {
      result[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + result[0].substring(result[0].indexOf(' ') + 1);
    }

    setOutput(result.join('\n\n'));
  };

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  // Generate on mount
  React.useEffect(() => {
    generateLorem();
  }, []);

  return (
    <div className="container animate-fade-in" style={{ padding: '8rem 1.5rem 4rem', minHeight: '80vh' }}>
      <SEO title="Lorem Ipsum Generator | Iron Claw" description="Instantly generate dummy text for your designs." />
      
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: '#ff8a8a', fontSize: '2.5rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Lorem Ipsum</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Instantly generate placeholder text for mockups and UI designs.</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Paragraphs</label>
        <input 
          type="number" 
          value={paragraphs} 
          onChange={(e) => setParagraphs(Number(e.target.value))}
          min="1" 
          max="100"
          style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px', width: '100px' }}
        />
        <button className="btn btn-primary" onClick={generateLorem} style={{ background: '#ff8a8a', color: '#000', border: 'none', fontWeight: 'bold' }}>
          Generate Text
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Generated Output</label>
          <button onClick={copyToClipboard} style={{ background: 'transparent', border: 'none', color: copied ? '#ff8a8a' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
            {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
            {copied ? 'Copied All!' : 'Copy All'}
          </button>
        </div>
        <textarea 
          value={output}
          readOnly
          style={{ 
            width: '100%', 
            height: '400px', 
            background: 'rgba(255,138,138,0.05)', 
            border: '1px solid var(--border-color)', 
            borderRadius: '0.5rem', 
            padding: '1rem', 
            color: '#ff8a8a',
            fontFamily: 'monospace',
            fontSize: '14px',
            lineHeight: '1.6',
            resize: 'vertical',
            outline: 'none',
            whiteSpace: 'pre-wrap'
          }}
        />
      </div>
    </div>
  );
};

export default LoremIpsum;
