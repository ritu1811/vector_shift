import { useEffect } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { useStore } from './store';

function App() {
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-mode' : 'dark-mode';
  }, [theme]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Ambient background orb */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '60vw',
        height: '60vw',
        borderRadius: '50%',
        background: 'var(--accent-gradient)',
        filter: 'blur(120px)',
        opacity: 'var(--orb-opacity)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0,
        animation: 'ambient-pulse 10s ease-in-out infinite alternate',
      }} />

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <PipelineToolbar />
      </div>

      {/* Top right floating theme toggle */}
      <div style={{ position: 'absolute', top: '50px', right: '40px', zIndex: 20 }}>
        <button 
          onClick={toggleTheme}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '48px', height: '48px',
            borderRadius: '50%',
            background: 'var(--bg-panel)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-md), var(--glass-rim)',
            color: 'var(--text-main)',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: 'blur(12px)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
            e.currentTarget.style.background = 'var(--btn-hover)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.background = 'var(--bg-panel)';
            e.currentTarget.style.boxShadow = 'var(--shadow-md), var(--glass-rim)';
          }}
          title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {theme === 'light' ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>
            </svg>
          )}
        </button>
      </div>
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <PipelineUI />
      </div>
      
      <div style={{ position: 'absolute', bottom: '20px', left: 0, width: '100%', display: 'flex', justifyContent: 'center', zIndex: 10 }}>
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
