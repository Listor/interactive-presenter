export const PRESENTER_PEER_ID = 'presenter-unique-id-v1';

// Server Configuration - easy to toggle between local and prod
export const PEER_SERVER_HOST =
  'interactive-presenter-server-production.up.railway.app';
// export const PEER_SERVER_HOST = window.location.hostname; // Local Dev
export const PEER_SERVER_PORT = 443;

export const PEER_CONFIG = {
  host: PEER_SERVER_HOST,
  port: PEER_SERVER_PORT,
  path: '/presenter-server',
};

// Protocol
export const MSG = {
  CMD_GOTO_SLIDE: 'CMD_GOTO_SLIDE',
  CMD_START_POLL: 'CMD_START_POLL',
  CMD_STOP_POLL: 'CMD_STOP_POLL', // -> Distribution Phase
  CMD_REVEAL_ANSWER: 'CMD_REVEAL_ANSWER', // -> Reveal Phase
  CMD_SHOW_OVERALL: 'CMD_SHOW_OVERALL',
  CMD_HIDE_OVERLAY: 'CMD_HIDE_OVERLAY',
  CMD_RESET_PRESENTATION: 'CMD_RESET_PRESENTATION',

  EVENT_POLL_ACTIVE: 'EVENT_POLL_ACTIVE',
  EVENT_POLL_CLOSED: 'EVENT_POLL_CLOSED',
  EVENT_POLL_REVEALED: 'EVENT_POLL_REVEALED', // Includes correct index
  EVENT_VOTE: 'EVENT_VOTE',

  SYNC_STATE: 'SYNC_STATE',
};
