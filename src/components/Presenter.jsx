import React, { useEffect, useState, useRef } from 'react';
import Peer from 'peerjs';
import { PRESENTER_PEER_ID, MSG, PEER_CONFIG } from '../utils/constants';
import { SLIDES } from '../data/slides.jsx';
import Slide from './Slide';

const Presenter = () => {
  const [peerId, setPeerId] = useState('');
  const [status, setStatus] = useState('Initializing...');

  // State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [messages, setMessages] = useState([]); // Reactions
  const [overlay, setOverlay] = useState(null); // 'results' | 'overall' | null
  const [pollResults, setPollResults] = useState(null);
  const [overallStats, setOverallStats] = useState({
    totalCorrect: 0,
    totalVotes: 0,
  });

  // Live Stats
  const [connectionCount, setConnectionCount] = useState(0);
  const [currentVoteCount, setCurrentVoteCount] = useState(0);

  // New State for Advanced Polls
  // Phase: 'idle' | 'voting' | 'distribution' | 'revealed'
  const [pollPhase, setPollPhase] = useState('idle');
  const [completedPollIds, setCompletedPollIds] = useState(new Set()); // IDs of finished polls

  // Connections
  const connections = useRef([]);
  const pollVotes = useRef(new Map()); // userId -> optionIndex
  const activeControllerIdRef = useRef(null); // Ref to avoid stale closure in PeerJS handlers
  const [activeControllerId, setActiveControllerId] = useState(null); // State for UI/Sync

  // Helpers to broadcast
  const broadcast = (data) => {
    connections.current.forEach((conn) => {
      if (conn.open) conn.send(data);
    });
  };

  const stateRef = useRef({
    currentSlide: 0,
    pollPhase: 'idle',
    completedPollIds: new Set(),
    connectionCount: 0,
    currentVoteCount: 0,
  });

  useEffect(() => {
    stateRef.current.currentSlide = currentSlide;
    stateRef.current.pollPhase = pollPhase;
    stateRef.current.completedPollIds = completedPollIds;
    stateRef.current.connectionCount = connectionCount;
    stateRef.current.currentVoteCount = currentVoteCount;

    // Broadcast whenever state changes
    broadcastSync();
  }, [
    currentSlide,
    pollPhase,
    completedPollIds,
    connectionCount,
    currentVoteCount,
  ]);

  // Auto-start poll when entering a slide with a poll
  useEffect(() => {
    const slide = SLIDES[currentSlide];
    if (
      slide &&
      slide.poll &&
      !completedPollIds.has(slide.id) &&
      pollPhase === 'idle'
    ) {
      setTimeout(() => startPoll(), 500); // Small delay for smooth transition
    }
  }, [currentSlide, pollPhase]);

  useEffect(() => {
    let peer;
    let retryTimeout;

    const setupPeer = () => {
      if (peer) {
        peer.destroy();
        peer = null;
      }

      peer = new Peer(PRESENTER_PEER_ID, PEER_CONFIG);

      peer.on('open', (id) => {
        setPeerId(id);
        setStatus('Ready');
      });

      peer.on('error', (err) => {
        console.error('Peer Error:', err);
        if (err.type === 'unavailable-id') {
          setStatus('ID Taken. Retrying in 2s...');
          retryTimeout = setTimeout(setupPeer, 2000);
        } else {
          setStatus(`Error: ${err.type}`);
        }
      });

      peer.on('connection', (conn) => {
        connections.current.push(conn);

        conn.on('open', () => {
          updateConnectionCount();
          conn.send({
            type: MSG.SYNC_STATE,
            payload: getSyncPayload(),
          });
        });

        conn.on('data', (data) => {
          handleData(data, conn);
        });

        conn.on('close', () => {
          connections.current = connections.current.filter((c) => c !== conn);
          updateConnectionCount();
        });

        conn.on('error', () => {
          connections.current = connections.current.filter((c) => c !== conn);
          updateConnectionCount();
        });
      });
    };

    setupPeer();

    return () => {
      if (peer) peer.destroy();
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, []);

  const updateConnectionCount = () => {
    // Filter only open connections for accurate count
    // Exclude controller(s) based on metadata
    const activeCount = connections.current.filter(
      (c) => c.open && c.metadata?.role !== 'controller'
    ).length;
    setConnectionCount(activeCount);
  };

  const getSyncPayload = () => ({
    slideIndex: stateRef.current.currentSlide,
    pollPhase: stateRef.current.pollPhase,
    completedPollIds: Array.from(stateRef.current.completedPollIds),
    connectionCount: stateRef.current.connectionCount,
    voteCount: stateRef.current.currentVoteCount,
    activeControllerId: activeControllerIdRef.current, // Use ref here
  });

  const broadcastSync = () => {
    broadcast({
      type: MSG.SYNC_STATE,
      payload: getSyncPayload(),
    });
  };

  const handleData = (data, conn) => {
    const { type, payload } = data;

    // Handle controller registration request
    if (type === MSG.REQUEST_CONTROLLER) {
      const requesterId = conn.peer;
      const currentActive = activeControllerIdRef.current;

      if (!currentActive) {
        // No controller yet, accept this one
        activeControllerIdRef.current = requesterId;
        setActiveControllerId(requesterId);
        conn.send({ type: MSG.CONTROLLER_ACCEPTED, payload: requesterId });
      } else if (currentActive === requesterId) {
        // This is the current controller reconnecting
        conn.send({ type: MSG.CONTROLLER_ACCEPTED, payload: requesterId });
      } else {
        // Already have a different controller
        conn.send({
          type: MSG.CONTROLLER_REJECTED,
          payload: currentActive,
        });
      }
      return;
    }

    // Only accept commands from the active controller
    const isControllerCommand = [
      MSG.CMD_GOTO_SLIDE,
      MSG.CMD_START_POLL,
      MSG.CMD_STOP_POLL,
      MSG.CMD_REVEAL_ANSWER,
      MSG.CMD_SHOW_OVERALL,
      MSG.CMD_HIDE_OVERLAY,
      MSG.CMD_RESET_PRESENTATION,
    ].includes(type);

    if (
      isControllerCommand &&
      conn.peer.trim() !== activeControllerIdRef.current?.trim()
    ) {
      return;
    }

    switch (type) {
      case MSG.CMD_GOTO_SLIDE:
        gotoSlide(payload);
        break;
      case MSG.CMD_START_POLL:
        startPoll();
        break;
      case MSG.CMD_STOP_POLL:
        stopPoll();
        break;
      case MSG.CMD_REVEAL_ANSWER:
        revealAnswer();
        break;
      case MSG.CMD_SHOW_OVERALL:
        setOverlay('overall');
        break;
      case MSG.CMD_HIDE_OVERLAY:
        setOverlay(null);
        break;
      case MSG.CMD_RESET_PRESENTATION:
        resetPresentation();
        break;
      case MSG.EVENT_VOTE:
        recordVote(conn.peer, payload);
        break;
      case 'message':
        showReaction(payload);
        break;
      default:
        break;
    }
  };

  const gotoSlide = (index) => {
    if (index < 0 || index >= SLIDES.length) return;

    setCurrentSlide(index);
    // pollPhase reset will trigger effect -> sync
    resetPollState();
  };

  const resetPollState = () => {
    setOverlay(null);
    setPollPhase('idle');
    pollVotes.current.clear();
    setCurrentVoteCount(0);
    broadcast({ type: MSG.EVENT_POLL_CLOSED });
  };

  const resetPresentation = () => {
    // Reset all states
    setCompletedPollIds(new Set());
    setOverallStats({ totalCorrect: 0, totalVotes: 0 });

    // resetPollState usually broadcasts EVENT_POLL_CLOSED
    // We'll manually handle the sequence to avoid flood
    setOverlay(null);
    setPollPhase('idle');
    pollVotes.current.clear();
    setCurrentVoteCount(0);
    setCurrentSlide(0);

    // Broadcast the main reset event
    broadcast({ type: MSG.EVENT_RESET_SESSION });

    // Also broadcast SYNC_STATE to controllers
    broadcastSync();
  };

  const startPoll = () => {
    const slide = SLIDES[stateRef.current.currentSlide];
    if (!slide.poll) return;

    // Prevent restart if already done
    if (stateRef.current.completedPollIds.has(slide.id)) {
      return;
    }

    pollVotes.current.clear();
    setCurrentVoteCount(0);
    setOverlay(null);
    setPollPhase('voting');

    broadcast({
      type: MSG.EVENT_POLL_ACTIVE,
      payload: {
        ...slide.poll,
        options: slide.poll.options.map((o) => o.label),
      },
    });
  };

  const stopPoll = () => {
    // Move to Distribution Phase (Results Hidden)
    const slide = SLIDES[stateRef.current.currentSlide];
    if (!slide.poll) return;

    setPollPhase('distribution');
    broadcast({ type: MSG.EVENT_POLL_CLOSED });
    calculateResults(slide);
    setOverlay('results');
  };

  const revealAnswer = () => {
    // Move to Revealed Phase
    const slide = SLIDES[stateRef.current.currentSlide];
    if (!slide.poll) return;

    setPollPhase('revealed');
    broadcast({
      type: MSG.EVENT_POLL_REVEALED,
      payload: { correctIndex: slide.poll.correctIndex },
    });

    // Mark as completed
    setCompletedPollIds((prev) => {
      const next = new Set(prev);
      next.add(slide.id);
      return next;
    });

    // Update overall stats now (commit the session scores)
    const { correctCount, totalCount } = calculateVoteStats(slide);
    setOverallStats((prev) => ({
      totalVotes: prev.totalVotes + totalCount,
      totalCorrect: prev.totalCorrect + correctCount,
    }));
  };

  const calculateVoteStats = (slide) => {
    const votes = Array.from(pollVotes.current.values());
    let correct = 0;
    votes.forEach((idx) => {
      if (idx === slide.poll.correctIndex) correct++;
    });
    return { correctCount: correct, totalCount: votes.length };
  };

  const calculateResults = (slide) => {
    const votes = Array.from(pollVotes.current.values());
    const total = votes.length;
    const counts = new Array(slide.poll.options.length).fill(0);

    votes.forEach((idx) => {
      counts[idx]++;
    });

    setPollResults({
      question: slide.poll.question,
      options: slide.poll.options,
      counts,
      total,
      correctIndex: slide.poll.correctIndex,
    });
  };

  const recordVote = (peerId, optionIndex) => {
    // Only accept if allowed
    if (stateRef.current.pollPhase === 'voting') {
      const isNew = !pollVotes.current.has(peerId);
      pollVotes.current.set(peerId, optionIndex);

      // Update counts which will trigger sync
      setCurrentVoteCount(pollVotes.current.size);
    }
  };

  const showReaction = (text) => {
    const id = Date.now() + Math.random();
    setMessages((prev) => [...prev, { id, text }]);
    setTimeout(
      () => setMessages((prev) => prev.filter((m) => m.id !== id)),
      5000
    );
  };

  // -- RENDER --

  const renderOverlay = () => {
    if (!overlay) return null;

    const style = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
    };

    if (overlay === 'overall') {
      const pct =
        overallStats.totalVotes > 0
          ? (overallStats.totalCorrect / overallStats.totalVotes) * 100
          : 0;

      return (
        <div style={style}>
          <div
            className="floating-box box-large"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h1>Session Overview</h1>
            <div
              style={{ fontSize: '6rem', fontWeight: 'bold', color: '#00e676' }}
            >
              {Math.round(pct)}%
            </div>
            <p style={{ fontSize: '1.5rem' }}>Correct Guesses</p>
            <div style={{ marginTop: '40px', fontSize: '1.2rem' }}>
              <p>Total Votes Cast: {overallStats.totalVotes}</p>
              <p>Total Correct: {overallStats.totalCorrect}</p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        position: 'relative',
        background: 'black',
      }}
    >
      {/* Connection Status in Top Right */}
      <div
        className="floating-box box-small"
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '1rem',
        }}
      >
        <span>{connectionCount}</span>
        <img
          src="icons/users.svg"
          alt="Users"
          style={{ width: '20px', height: '20px' }}
        />
      </div>

      {/* Status (Hidden in prod usually) */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 100,
          color: 'rgba(255,255,255,0.3)',
          pointerEvents: 'none',
          fontSize: '10px',
        }}
      >
        ID: {peerId}
      </div>

      <Slide
        data={SLIDES[currentSlide]}
        isActive={true}
        pollResults={pollResults}
        pollPhase={pollPhase}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 50,
          overflow: 'hidden',
        }}
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className="reaction"
            style={{
              position: 'absolute',
              left: `${Math.random() * 80 + 10}%`,
              bottom: '-50px',
              fontSize: '3rem',
              animation: 'floatUp 4s forwards',
            }}
          >
            {m.text}
          </div>
        ))}
      </div>

      {renderOverlay()}

      <style>{`
                @keyframes floatUp {
                    to { transform: translateY(-110vh) rotate(${Math.random() * 20 - 10}deg); opacity: 0; }
                }
            `}</style>
    </div>
  );
};

export default Presenter;
