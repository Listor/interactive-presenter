import React, { useRef, useEffect } from 'react';
import NetworkNode from './NetworkNode';

const Slide = ({ data, isActive }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Handle video playback when slide becomes active/inactive
    if (data.type === 'video' && videoRef.current) {
      if (isActive) {
        videoRef.current.currentTime = 0;
        videoRef.current
          .play()
          .catch((e) => console.log('Autoplay prevented:', e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, data.type]);

  const style = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
  };

  const content =
    data.type === 'video' ? (
      <video
        ref={videoRef}
        src={data.url}
        style={style}
        loop
        muted
        playsInline
      />
    ) : (
      <div>
        <img src={data.url} alt="Background Image" style={style} />

        {data.shim && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />
        )}
        <div className="network-nodes">
          <NetworkNode x="19.45%" y="67.6%" color="#2aa7ff" size={8} />
          <NetworkNode x="70.8%" y="62.4%" color="#ff3b3b" size={5} />
          <NetworkNode x="61.25%" y="83.2%" color="#2aa7ff" size={5} />
        </div>
      </div>
    );

  return (
    <>
      {content}

      {/* Cover Title - Outside Box, Centered, Print Look */}
      {data.title && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '1200px',
            textAlign: 'left',
            zIndex: 10,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          <h1
            style={{
              fontSize: '5rem',
              lineHeight: '1.1',
              margin: 0,
              fontWeight: 900,
              letterSpacing: '-2px',
              color: '#fff',
            }}
          >
            {data.title}
          </h1>
        </div>
      )}

      {/* Floating Headline - Inside Box */}
      {(data.headline || (data.images && data.images.length > 0)) && (
        <div className="slide-content-wrapper">
          {data.headline && (
            <div className="floating-box box-medium floating-headline">
              <h2 style={{ margin: 0, fontSize: '2rem' }}>{data.headline}</h2>
            </div>
          )}

          {/* Floating Images - Inside Box, Centered */}
          {data.images && data.images.length > 0 && (
            <div className="floating-box box-large floating-images">
              {data.images.map((imageSrc, index) => (
                <img
                  key={index}
                  src={imageSrc}
                  alt={`Slide content ${index + 1}`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '60vh',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Slide;
