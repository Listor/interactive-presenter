import React, { useEffect, useState, useRef } from 'react';
import Peer from 'peerjs';
import { PRESENTER_PEER_ID, MSG, PEER_CONFIG } from '../utils/constants';

// Generate or retrieve controller ID from cookie (same as Controller.jsx)
const getControllerID = () => {
  const cookieName = 'controller_id';
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      console.log(`🔄 Reusing existing controller ID from cookie`);
      return value;
    }
  }

  // Generate new ID and store in cookie (30 min expiry)
  const newId = `controller-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const expires = new Date(Date.now() + 30 * 60 * 1000).toUTCString();
  document.cookie = `${cookieName}=${newId}; expires=${expires}; path=/; SameSite=Strict`;

  console.log(`🆕 Generated new controller ID: ${newId}`);
  return newId;
};

const Participant = ({
  wantsController,
  onControllerAccepted,
  onControllerRejected,
}) => {
  const [status, setStatus] = useState('Connecting...');
  const [connected, setConnected] = useState(false);

  // Poll State
  const [activePoll, setActivePoll] = useState(null);
  const [myVote, setMyVote] = useState(null); // Index or null

  // Feedback State
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null

  // Persistent Stats (Session)
  const [stats, setStats] = useState({ correct: 0, total: 0 });

  const connRef = useRef(null);

  useEffect(() => {
    // Use controller ID if we want to be controller, otherwise let PeerJS generate random ID
    const peerId = wantsController ? getControllerID() : undefined;

    const peer = new Peer(peerId, PEER_CONFIG);

    peer.on('open', (myPeerId) => {
      const conn = peer.connect(PRESENTER_PEER_ID);
      connRef.current = conn;

      conn.on('open', () => {
        setStatus('Connected live!');
        setConnected(true);

        // If we want to be controller, request it
        if (wantsController) {
          console.log(`🎮 Requesting controller role with ID: ${myPeerId}`);
          conn.send({ type: MSG.REQUEST_CONTROLLER, payload: myPeerId });
        }
      });

      conn.on('data', (data) => {
        const { type, payload } = data;

        console.log('data', data);

        // Handle controller registration responses
        if (type === MSG.CONTROLLER_ACCEPTED) {
          console.log(`✅ Controller request accepted!`);
          if (onControllerAccepted) onControllerAccepted();
          return;
        } else if (type === MSG.CONTROLLER_REJECTED) {
          console.log(
            `🚫 Controller request rejected. Active controller: ${payload}`
          );
          alert(
            `Another controller is already active. You'll stay as a participant.`
          );
          if (onControllerRejected) onControllerRejected();
          return;
        }

        if (type === MSG.EVENT_POLL_ACTIVE) {
          setActivePoll(payload); // payload is poll object
          setMyVote(null);
          setFeedback(null);
          if (navigator.vibrate) navigator.vibrate(200);
        } else if (type === MSG.EVENT_POLL_CLOSED) {
          setActivePoll(null); // Hides voting UI, shows waiting
          // Could optionally show "Waiting for reveal..."
        } else if (type === MSG.EVENT_POLL_REVEALED) {
          // Payload: { correctIndex }
          handleReveal(payload.correctIndex);
        } else if (type === MSG.EVENT_RESET_SESSION) {
          setStats({ correct: 0, total: 0 });
          setMyVote(null);
          setFeedback(null);
          setActivePoll(null);
        }
      });

      conn.on('close', () => setConnected(false));
      conn.on('error', () => setConnected(false));
    });

    return () => peer.destroy();
  }, [wantsController, onControllerAccepted, onControllerRejected]);

  // Needed to access myVote inside the event handler closure securely?
  // Using a ref to track vote for the current poll cycle
  const myVoteRef = useRef(null);
  useEffect(() => {
    myVoteRef.current = myVote;
  }, [myVote]);

  const handleReveal = (correctIndex) => {
    const votedIndex = myVoteRef.current;

    // If user didn't vote, do nothing or count as wrong?
    // Let's only count if they voted.
    if (votedIndex === null) return;

    const isCorrect = votedIndex === correctIndex;

    setStats((prev) => ({
      total: prev.total + 1,
      correct: prev.correct + (isCorrect ? 1 : 0),
    }));

    setFeedback(isCorrect ? 'correct' : 'wrong');

    // Auto-hide feedback after 5s
    setTimeout(() => setFeedback(null), 5000);
  };

  const sendReaction = (text) => {
    if (connRef.current) {
      connRef.current.send({ type: 'message', payload: text });
    }
  };

  const sendVote = (index) => {
    if (connRef.current) {
      connRef.current.send({ type: MSG.EVENT_VOTE, payload: index });
      setMyVote(index);
    }
  };

  // -- VIEWS --

  if (activePoll && myVote === null) {
    return (
      <div style={containerStyle}>
        <h2>📊 Poll Time!</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          {activePoll.question}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {activePoll.options.map((opt, i) => (
            <button key={i} style={optionBtnStyle} onClick={() => sendVote(i)}>
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (activePoll && myVote !== null) {
    return (
      <div style={containerStyle}>
        <h2>✅ Vote Sent!</h2>
        <p>Waiting for everyone else...</p>
        <div className="loader"></div>
      </div>
    );
  }

  // Default View with Stats/Reactions
  return (
    <div style={containerStyle}>
      {/* Top Section: Stats & Status */}
      <div>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Join In!</h1>
          <p
            style={{
              color: connected ? '#4caf50' : '#f44336',
              margin: '0.5rem 0',
            }}
          >
            {connected ? '● LIVE' : '○ DISCONNECTED'}
          </p>
        </div>

        {/* Stats */}
        {stats.total > 0 && (
          <div
            className="floating-box box-small"
            style={{
              textAlign: 'center',
              marginBottom: '1rem',
            }}
          >
            <span
              style={{
                color: '#aaa',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
              }}
            >
              My Score
            </span>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              {stats.correct} / {stats.total}
            </div>
          </div>
        )}

        {/* Feedback Overlay - now easier to see */}
        {feedback && (
          <div
            style={{
              padding: '15px',
              borderRadius: '8px',
              background: feedback === 'correct' ? '#4caf50' : '#f44336',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              animation: 'popIn 0.3s ease',
              marginBottom: '1rem',
            }}
          >
            {feedback === 'correct' ? '🎉 Correct!' : '❌ Wrong'}
          </div>
        )}
      </div>

      {/* Middle Spacer */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.5,
          textAlign: 'center',
        }}
      >
        <p>Wait for poll...</p>
      </div>

      {/* Bottom Section: Reactions */}
      <div
        className="floating-box box-small"
        style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'center',
          marginBottom: '10px', // small safe area
        }}
      >
        <button style={reactionBtn} onClick={() => sendReaction('❤️')}>
          ❤️
        </button>
        <button style={reactionBtn} onClick={() => sendReaction('👏')}>
          👏
        </button>
        <button style={reactionBtn} onClick={() => sendReaction('🔥')}>
          🔥
        </button>
        <button style={reactionBtn} onClick={() => sendReaction('😂')}>
          😂
        </button>
        <button style={reactionBtn} onClick={() => sendReaction('🤯')}>
          🤯
        </button>
        <button style={reactionBtn} onClick={() => sendReaction('👋')}>
          👋
        </button>
      </div>

      <style>{`
                @keyframes popIn {
                    from { transform: scale(0.8); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
    </div>
  );
};

const containerStyle = {
  height: '100dvh',
  width: '100vw',
  maxWidth: '100vw',
  maxHeight: '100dvh',
  background: '#121212',
  color: 'white',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'sans-serif',
  overflow: 'hidden',
  position: 'fixed',
  top: 0,
  left: 0,
};

const reactionBtn = {
  fontSize: '1.5rem',
  padding: '0.5rem',
  background: '#1e1e1e',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  flex: 1,
  minWidth: '0', // Allow shrinking
};

const optionBtnStyle = {
  padding: '1.5rem',
  fontSize: '1.1rem',
  background: '#2196f3',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

export default Participant;
