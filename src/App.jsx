import { useState, useEffect } from 'react';
import Presenter from './components/Presenter';
import Participant from './components/Participant';
import Controller from './components/Controller';
import LandscapePrompt from './components/LandscapePrompt';
import { PEER_CONFIG } from './utils/constants';

function App() {
  const [role, setRole] = useState(null); // 'presenter' | 'controller' | 'participant'
  const [wantsController, setWantsController] = useState(false);

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
        setWantsController(true); // Signal that we want to be controller
        setRole('participant'); // Start as participant, will upgrade if accepted
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

        // 3. Normal Role Logic (from storage or default to participant)
        const storedRole = localStorage.getItem('role');

        if (storedRole === 'presenter') {
          setRole('presenter');
        } else if (storedRole === 'controller') {
          setWantsController(true); // Want to be controller
          setRole('participant'); // Start as participant
        } else {
          setRole('participant');
        }
      } catch (err) {
        setRole('presenter');
      }
    };

    initRole();
  }, []);

  const handleControllerAccepted = () => {
    setRole('controller');
  };

  const handleControllerRejected = () => {
    setRole('participant');
    setWantsController(false);
    localStorage.removeItem('role'); // Clear controller role
  };

  if (!role) return <div>Loading...</div>;

  return (
    <>
      {role === 'presenter' && <LandscapePrompt />}
      {role === 'presenter' && <Presenter />}
      {role === 'controller' && <Controller />}
      {role === 'participant' && (
        <Participant
          wantsController={wantsController}
          onControllerAccepted={handleControllerAccepted}
          onControllerRejected={handleControllerRejected}
        />
      )}
    </>
  );
}

export default App;
