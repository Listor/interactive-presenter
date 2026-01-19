import React, { useEffect, useState, useRef } from 'react';
import Peer from 'peerjs';
import { PRESENTER_PEER_ID, MSG, PEER_CONFIG } from '../utils/constants';
import { SLIDES } from '../data/slides.jsx';

// Generate or retrieve controller ID from cookie
const getControllerID = () => {
  const cookieName = 'controller_id';
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      return value;
    }
  }

  // Generate new ID and store in cookie (30 min expiry)
  const newId = `controller-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const expires = new Date(Date.now() + 30 * 60 * 1000).toUTCString();
  document.cookie = `${cookieName}=${newId}; expires=${expires}; path=/; SameSite=Strict`;

  return newId;
};

const Controller = () => {
  const [status, setStatus] = useState('Connecting to Presenter...');
  const [connected, setConnected] = useState(false);
  const [controllerId] = useState(getControllerID());

  // Synced State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [pollPhase, setPollPhase] = useState('idle'); // 'idle', 'voting', 'distribution', 'revealed'
  const [completedPollIds, setCompletedPollIds] = useState([]); // Array of strings

  // Live Stats
  const [connectionCount, setConnectionCount] = useState(0);
  const [voteCount, setVoteCount] = useState(0);

  const connRef = useRef(null);

  useEffect(() => {
    const peer = new Peer(controllerId, PEER_CONFIG);

    peer.on('open', () => {
      const conn = peer.connect(PRESENTER_PEER_ID, {
        metadata: { role: 'controller' },
      });
      connRef.current = conn;

      conn.on('open', () => {
        setStatus('Connected to Presenter ✓');
        setConnected(true);
      });

      conn.on('data', (data) => {
        if (data.type === MSG.SYNC_STATE) {
          setCurrentSlideIndex(data.payload.slideIndex);
          setPollPhase(data.payload.pollPhase);
          setCompletedPollIds(data.payload.completedPollIds || []);
          setConnectionCount(data.payload.connectionCount || 0);
          setVoteCount(data.payload.voteCount || 0);
        }
      });

      conn.on('close', () => {
        setConnected(false);
        setStatus('Disconnected from Presenter');
      });

      conn.on('error', () => {
        setConnected(false);
        setStatus('Connection Error');
      });
    });

    peer.on('error', (err) => {
      console.error('Peer error:', err);
      if (err.type === 'unavailable-id') {
        setStatus('❌ Another controller is active');
        setConnected(false);
        alert(
          'Another controller is already connected. Your session may have expired or someone else is controlling the presentation.'
        );
      } else {
        setStatus(`Connection Error: ${err.type}`);
        setConnected(false);
      }
    });

    return () => peer.destroy();
  }, [controllerId]);

  const send = (type, payload = {}) => {
    if (connRef.current) {
      connRef.current.send({ type, payload });
    }
  };

  const currentSlide = SLIDES[currentSlideIndex] || {};
  const hasPoll = !!currentSlide.poll;
  const isCompleted =
    currentSlide.id && completedPollIds.includes(currentSlide.id);

  const renderPollControls = () => {
    if (isCompleted) {
      return (
        <div
          style={{
            padding: '20px',
            background: '#444',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <p>✅ Poll Completed</p>
          <button
            style={{ ...btnStyle, opacity: 0.5, cursor: 'not-allowed' }}
            disabled
          >
            Done
          </button>
          <div style={{ marginTop: '10px', opacity: 0.7 }}>
            {voteCount} votes recorded
          </div>
        </div>
      );
    }

    if (pollPhase === 'idle') {
      return (
        <button
          style={{ ...btnStyle, background: '#2196f3' }}
          onClick={() => send(MSG.CMD_START_POLL)}
        >
          START POLL
        </button>
      );
    }

    if (pollPhase === 'voting') {
      return (
        <div>
          <div
            style={{
              marginBottom: '15px',
              padding: '10px',
              background: '#333',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#ff9800',
              }}
            >
              VOTING LIVE
            </span>
            <div style={{ fontSize: '2rem', margin: '10px 0' }}>
              {voteCount}{' '}
              <span style={{ fontSize: '1rem', color: '#aaa' }}>
                / {connectionCount}
              </span>
            </div>
            <div
              style={{
                height: '6px',
                background: '#444',
                borderRadius: '3px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${connectionCount > 0 ? (voteCount / connectionCount) * 100 : 0}%`,
                  height: '100%',
                  background: '#ff9800',
                  transition: 'width 0.3s',
                }}
              />
            </div>
          </div>

          <button
            style={{ ...btnStyle, background: '#ff9800' }}
            onClick={() => send(MSG.CMD_STOP_POLL)}
          >
            STOP & SHOW DISTRIBUTION
          </button>
        </div>
      );
    }

    if (pollPhase === 'distribution') {
      return (
        <button
          style={{ ...btnStyle, background: '#4caf50' }}
          onClick={() => send(MSG.CMD_REVEAL_ANSWER)}
        >
          REVEAL ANSWER
        </button>
      );
    }

    if (pollPhase === 'revealed') {
      return (
        <button
          style={{ ...btnStyle, background: '#607d8b' }}
          onClick={() => send(MSG.CMD_HIDE_OVERLAY)}
        >
          HIDE OVERLAYS
        </button>
      );
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        background: '#333',
        minHeight: '100vh',
        color: 'white',
      }}
    >
      {/* Header Stats */}
      {/* Header Stats */}
      <div
        className="floating-box box-small"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            color: connected ? '#4caf50' : '#f44336',
            fontWeight: 'bold',
          }}
        >
          {status}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <img
            src="icons/users.svg"
            alt="Users"
            style={{ width: '20px', height: '20px' }}
          />
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
            {connectionCount}
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '40px',
        }}
      >
        <button
          style={{ ...btnStyle, opacity: currentSlideIndex <= 0 ? 0.3 : 1 }}
          onClick={() => send(MSG.CMD_GOTO_SLIDE, currentSlideIndex - 1)}
          disabled={!connected || currentSlideIndex <= 0}
        >
          PREV
        </button>
        <button
          style={{
            ...btnStyle,
            opacity: currentSlideIndex >= SLIDES.length - 1 ? 0.3 : 1,
          }}
          onClick={() => send(MSG.CMD_GOTO_SLIDE, currentSlideIndex + 1)}
          disabled={!connected || currentSlideIndex >= SLIDES.length - 1}
        >
          NEXT
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3>
          Slide {currentSlideIndex + 1} / {SLIDES.length}
        </h3>
      </div>

      {hasPoll && (
        <div
          className="floating-box box-medium"
          style={{ marginBottom: '20px' }}
        >
          <h4 style={{ marginTop: 0 }}>Poll Controls</h4>
          <p>{currentSlide.poll.question}</p>
          {renderPollControls()}
        </div>
      )}

      <div
        style={{
          marginTop: '40px',
          borderTop: '1px solid #555',
          paddingTop: '20px',
        }}
      >
        <button
          style={{ ...btnStyle, background: '#9c27b0' }}
          onClick={() => send(MSG.CMD_SHOW_OVERALL)}
        >
          SHOW OVERALL STATS
        </button>
        <button
          style={{ ...btnStyle, background: '#f44336', marginTop: '20px' }}
          onClick={() => {
            if (
              confirm(
                'Reset entire presentation? This clears all poll history.'
              )
            ) {
              send(MSG.CMD_RESET_PRESENTATION);
            }
          }}
        >
          RESET PRESENTATION
        </button>
      </div>
    </div>
  );
};

const btnStyle = {
  padding: '20px',
  fontSize: '1.2rem',
  borderRadius: '10px',
  border: 'none',
  width: '100%',
  cursor: 'pointer',
  background: '#eee',
  color: '#333',
};

export default Controller;
