import React, { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';
import './styles/os-theme.css';
import DeskScene from './components/Experience/DeskScene';
import OSApp from './components/OS/OSApp';
import BootScreen from './components/OS/BootScreen';

const App = () => {
  const [isBooting, setIsBooting] = useState(true);
  const { progress } = useProgress();

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', backgroundColor: 'black' }}>
      {isBooting && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2000 }}>
          <BootScreen
            onComplete={() => setIsBooting(false)}
            externalProgress={progress}
          />
        </div>
      )}

      <div style={{
        width: '100%',
        height: '100%',
        visibility: isBooting ? 'hidden' : 'visible',
        opacity: isBooting ? 0 : 1,
        transition: 'opacity 1s ease-in-out'
      }}>
        <DeskScene>
          <OSApp />
        </DeskScene>
      </div>
    </div>
  );
};

export default App;
