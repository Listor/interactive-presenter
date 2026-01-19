import React, { useRef, useEffect } from 'react';
import NetworkNode from './NetworkNode';
import Socials from './Socials';

const Slide = ({ data, isActive, pollResults, pollPhase, isLast }) => {
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
          {isLast && <Socials />}
        </div>
      )}

      {/* Floating Headline and Content */}
      {(data.headline ||
        (data.images && data.images.length > 0) ||
        (data.content && data.content.length > 0) ||
        (data.poll && data.poll.options)) && (
        <div className="slide-content-wrapper">
          {data.headline && (
            <div className="floating-box box-medium floating-headline">
              <h2 style={{ margin: 0, fontSize: '2rem' }}>{data.headline}</h2>
            </div>
          )}

          {/* Floating Content - Mixed images and custom slots */}
          {((data.content && data.content.length > 0) ||
            (data.poll && data.poll.options)) && (
            <div className="floating-box box-large floating-content">
              {data.content &&
                data.content.map((item, index) => {
                  // If item is a string, render as image
                  if (typeof item === 'string') {
                    return (
                      <img
                        key={index}
                        src={item}
                        alt={`Slide content ${index + 1}`}
                        className="slide__img"
                      />
                    );
                  }
                  // Otherwise, render as custom JSX slot
                  return (
                    <div key={index} className="content-slot">
                      {item}
                    </div>
                  );
                })}

              {!data.content &&
                data.poll &&
                data.poll.options.map((opt, index) => {
                  let overlayShim = null;

                  if (
                    (pollPhase === 'distribution' ||
                      pollPhase === 'revealed') &&
                    pollResults
                  ) {
                    const count =
                      pollResults.counts &&
                      pollResults.counts[index] !== undefined
                        ? pollResults.counts[index]
                        : 0;
                    const total = pollResults.total > 0 ? pollResults.total : 1;
                    const pct = Math.round((count / total) * 100);

                    const isCorrect =
                      pollPhase === 'revealed' &&
                      pollResults.correctIndex === index;

                    overlayShim = (
                      <div
                        className="poll-overlay"
                        style={{
                          border: isCorrect ? '4px solid #4caf50' : 'none',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            marginBottom: '10px',
                            textTransform: 'uppercase',
                          }}
                        >
                          {opt.label}
                        </div>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                          {pct}%
                        </div>
                        <div style={{ fontSize: '1.2rem', opacity: 0.8 }}>
                          {count} Votes
                        </div>
                        {isCorrect && (
                          <div
                            style={{
                              color: '#4caf50',
                              fontSize: '1.5rem',
                              marginTop: '10px',
                              fontWeight: 'bold',
                              background: 'rgba(0,0,0,0.5)',
                              padding: '5px 10px',
                              borderRadius: '5px',
                            }}
                          >
                            ✅ Richtig
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div
                      key={index}
                      className="content-slot"
                      style={{ position: 'relative' }}
                    >
                      {opt.content}
                      {overlayShim}
                    </div>
                  );
                })}
            </div>
          )}

          {/* Legacy support for images array */}
          {!data.content &&
            !data.poll &&
            data.images &&
            data.images.length > 0 && (
              <div className="floating-box box-large floating-content">
                {data.images.map((imageSrc, index) => (
                  <img
                    key={index}
                    src={imageSrc}
                    alt={`Slide content ${index + 1}`}
                    className="slide__img"
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
