import React from 'react';

const Socials = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '32px',
    marginTop: '40px',
    animation: 'fadeInUp 0.7s ease-out',
  };

  const profileStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    marginBottom: '8px',
  };

  const avatarStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  };

  const infoStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    textAlign: 'left',
  };

  const nameStyle = {
    fontSize: '2.2rem',
    fontWeight: 600,
    margin: 0,
    color: '#fff',
    letterSpacing: '-1px',
    fontFamily: 'Montserrat, sans-serif',
  };

  const titleStyle = {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.5)',
    margin: 0,
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontWeight: 600,
  };

  const listStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
  };

  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '1.2rem',
    color: '#fff',
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '12px 20px',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    width: 'fit-content',
    fontFamily: 'monospace',
  };

  const iconStyle = {
    width: '24px',
    height: '24px',
    fill: 'currentColor',
    opacity: 0.8,
  };

  return (
    <div style={containerStyle}>
      <div style={profileStyle}>
        <img src="me.png" alt="Michael Ehrich" style={avatarStyle} />
        <div style={infoStyle}>
          <h2 style={nameStyle}>Michael Ehrich</h2>
          <p style={titleStyle}>CEO & Speaker</p>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: '0px',
          width: '100%',
        }}
      >
        <div style={listStyle}>
          <div style={itemStyle}>
            <svg style={iconStyle} viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            eny.social
          </div>
          <div style={itemStyle}>
            <svg style={iconStyle} viewBox="0 0 64 57">
              <path d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805ZM50.127 3.805C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745Z" />
            </svg>
            @michael.eny.team
          </div>
          <div style={itemStyle}>
            <svg style={iconStyle} viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            github.io/Listor/interactive-presenter/slides.pdf
          </div>
          <div style={itemStyle}>
            <svg style={iconStyle} viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            linkedin.com/in/themichaelehrich
          </div>
        </div>

        <img
          src="qrcode-slides.svg"
          alt="QR Code Slides"
          style={{
            width: '266px',
            height: '266px',
            background: 'white',
            padding: '8px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        />
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Socials;
