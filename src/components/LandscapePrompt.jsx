import React, { useEffect, useState } from 'react';

const LandscapePrompt = () => {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Check if mobile (width < 768px typically) and height > width
      const isMobile = window.innerWidth < 768;
      const portrait = window.innerHeight > window.innerWidth;
      setIsPortrait(isMobile && portrait);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  if (!isPortrait) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#121212',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          fontSize: '4rem',
          marginBottom: '1rem',
          animation: 'rotate 2s infinite ease-in-out',
        }}
      >
        📱
      </div>
      <h2 style={{ marginBottom: '0.5rem' }}>Please Rotate Your Device</h2>
      <p style={{ color: '#aaa', maxWidth: '300px' }}>
        This presentation is best viewed in landscape mode.
      </p>
      <style>{`
                @keyframes rotate {
                    0%, 10% { transform: rotate(0deg); }
                    40%, 60% { transform: rotate(90deg); }
                    90%, 100% { transform: rotate(0deg); }
                }
            `}</style>
    </div>
  );
};

export default LandscapePrompt;
