import React, { useState, useEffect } from 'react';

const GlitchWord = ({ original = 'echt', glitch = 'fake' }) => {
  const [showGlitch, setShowGlitch] = useState(false);

  useEffect(() => {
    let isActive = true;

    const loop = () => {
      if (!isActive) return;
      // Random delay between 2s and 5s
      const delay = Math.random() * 3000 + 2000;

      setTimeout(() => {
        if (isActive) triggerGlitch();
      }, delay);
    };

    const triggerGlitch = async () => {
      // Glitch Sequence: FAKE (short) -> ECHT -> FAKE (LONG) -> ECHT

      // Short flicker entry
      setShowGlitch(true);
      await wait(50 + Math.random() * 50);

      if (!isActive) return;
      setShowGlitch(false);
      await wait(50 + Math.random() * 50);

      // MAIN VISIBILITY: Hold "FAKE" for 1.5 - 2.5 seconds
      if (!isActive) return;
      setShowGlitch(true);

      // Increased duration significantly
      await wait(1800 + Math.random() * 1000);

      if (!isActive) return;
      setShowGlitch(false);

      // Accessing loop via simple recursion of logic
      loop();
    };

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    loop();

    return () => {
      isActive = false;
    };
  }, [original, glitch]);

  return (
    <span style={{ display: 'inline-block', position: 'relative' }}>
      {/* Layout Placeholder */}
      <span style={{ visibility: showGlitch ? 'hidden' : 'visible' }}>
        {original}
      </span>

      {/* Glitch Container */}
      {showGlitch && (
        <>
          <style>
            {`
            @keyframes glitch {
              2%, 64% { transform: translate(2px,0) skew(0deg); }
              4%, 60% { transform: translate(-2px,0) skew(0deg); }
              62% { transform: translate(0,0) skew(5deg); }
            }
            @keyframes glitchTop {
              2%, 64% { transform: translate(2px,-2px); }
              4%, 60% { transform: translate(-2px,2px); }
              62% { transform: translate(13px,-1px) skew(-13deg); }
            }
            @keyframes glitchBotom {
              2%, 64% { transform: translate(-2px,0); }
              4%, 60% { transform: translate(-2px,0); }
              62% { transform: translate(-22px,5px) skew(21deg); }
            }
          `}
          </style>

          {/* Main Glitch Text */}
          <span
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              color: '#ff0055',
              fontWeight: 900,
              zIndex: 2,
              animation: 'glitch 1s linear infinite',
            }}
          >
            {glitch}
          </span>

          {/* Slice 1 (Top) - mimics div:before */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              color: '#ff0055',
              fontWeight: 900,
              zIndex: 1,
              animation: 'glitchTop 1s linear infinite',
              clipPath: 'polygon(0 0, 100% 0, 100% 33%, 0 33%)',
              WebkitClipPath: 'polygon(0 0, 100% 0, 100% 33%, 0 33%)',
            }}
          >
            {glitch}
          </span>

          {/* Slice 2 (Bottom) - mimics div:after */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              color: '#ff0055',
              fontWeight: 900,
              zIndex: 3,
              animation: 'glitchBotom 1.5s linear infinite',
              clipPath: 'polygon(0 67%, 100% 67%, 100% 100%, 0 100%)',
              WebkitClipPath: 'polygon(0 67%, 100% 67%, 100% 100%, 0 100%)',
            }}
          >
            {glitch}
          </span>
        </>
      )}
    </span>
  );
};

export default GlitchWord;
