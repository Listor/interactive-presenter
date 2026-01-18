import { useState, useEffect } from 'react';
import Presenter from './components/Presenter';
import Participant from './components/Participant';
import Controller from './components/Controller';
import LandscapePrompt from './components/LandscapePrompt';
import { PEER_CONFIG } from './utils/constants';

function App() {
  const [role, setRole] = useState(null); // 'presenter' | 'controller' | 'participant'

  useEffect(() => {
    const initRole = async () => {
      const params = new URLSearchParams(window.location.search);
      const isPresenterParam = params.get('presenter');
      const isControllerParam = params.get('controller');

      // 1. Explicit URL Overrides
      if (isPresenterParam === 'true') {
        localStorage.setItem('role', 'presenter');
        setRole('presenter');
        window.history.replaceState({}, '', window.location.pathname);
        return;
      }

      if (isControllerParam === 'true') {
        localStorage.setItem('role', 'controller');
        setRole('controller');
        window.history.replaceState({}, '', window.location.pathname);
        return;
      }

      // 2. Check Connection to decide fallback
      try {
        await fetch(
          `https://${PEER_CONFIG.host}:${PEER_CONFIG.port}${PEER_CONFIG.path}`,
          {
            method: 'HEAD',
            mode: 'no-cors', // We just care if it connects, not the response
          }
        );
        console.log('PeerServer is reachable.');

        // 3. Normal Role Logic (from storage or default to participant)
        const storedRole = localStorage.getItem('role');

        if (storedRole === 'presenter') {
          setRole('presenter');
        } else if (storedRole === 'controller') {
          setRole('controller');
        } else {
          setRole('participant');
        }
      } catch (err) {
        console.log(
          'PeerServer unreachable, defaulting to Presenter mode.',
          err
        );
        setRole('presenter');
      }
    };

    initRole();
  }, []);

  if (!role) return <div>Loading...</div>;

  return (
    <>
      {role === 'presenter' && <LandscapePrompt />}
      {role === 'presenter' && <Presenter />}
      {role === 'controller' && <Controller />}
      {role === 'participant' && <Participant />}
    </>
  );
}

export default App;
