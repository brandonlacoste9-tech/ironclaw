import { Play, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="hero-background"></div>
      <div className="hero-particles"></div>
      
      <div className="container hero-container">
        <div className="hero-content animate-fade-in">
          <span className="hero-badge glass-panel">www.ironclaw.ca</span>
          <h1 className="hero-title" style={{ textTransform: 'uppercase', letterSpacing: '-1px' }}>
            HACKER <span style={{ 
              background: 'linear-gradient(135deg, #00ff88, #00b3ff)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 20px rgba(0, 255, 136, 0.4))'
            }}>CORE</span>
          </h1>

          <p className="hero-subtitle">
            ACCESS OVER 500+ ESSENTIAL DEVELOPER UTILITIES. BUILD ANYWHERE. DEPLOY EVERYWHERE. OPEN SOURCE. INSTANT ACCESS.
          </p>
          
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })} style={{ background: 'linear-gradient(135deg, #00ff88, #00b3ff)', border: 'none', color: '#000', fontWeight: 'bold' }}>
              <Play size={20} fill="currentColor" />
              JOIN THE CORE.
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>
              View Utilities
              <ArrowRight size={20} />
            </button>
          </div>
          
          <div className="hero-stats glass-panel">
            <div className="stat-item">
              <span className="stat-value" style={{ color: '#00ff88' }}>100%</span>
              <span className="stat-label">Local Execution</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value" style={{ color: '#00b3ff' }}>0ms</span>
              <span className="stat-label">API Latency</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value" style={{ color: '#8d99ae' }}>Free</span>
              <span className="stat-label">Forever</span>
            </div>
          </div>
        </div>
        
        <div className="hero-visual animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {/* Decorative elements */}
          <div className="glow-orb orb-1"></div>
          <div className="glow-orb orb-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
