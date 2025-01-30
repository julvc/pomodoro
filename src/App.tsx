import React, { useState } from 'react';
import TimerControls from './components/TimerControls';
import Display from './components/Display';
import ActionButtons from './components/ActionButtons';

const App: React.FC = () => {
  const [breakLength, setBreakLength] = useState<number>(5);
  const [sessionLength, setSessionLength] = useState<number>(25);
  const [timeLeft, setTimeLeft] = useState<number>(sessionLength * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);


  const handleIncrement = (type: 'break' | 'session') => {
    if (type === 'break') setBreakLength((prev) => prev + 1);
    else {
      const newSession = sessionLength + 1;
      setSessionLength(newSession);
      if (!isRunning) setTimeLeft(newSession * 60);
    }
  };

  const handleDecrement = (type: 'break' | 'session') => {
    if (type === 'break' && breakLength > 1) setBreakLength((prev) => prev - 1);
    else if (type === 'session' && sessionLength > 1) {
      const newSession = sessionLength - 1;
      setSessionLength(newSession);
      if (!isRunning) setTimeLeft(newSession * 60);
    }
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
  };

  return (
    <div
      className="vh-100 d-flex flex-column justify-content-center align-items-center px-md-5 px-3 text-white"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backgroundImage: "url('./src/assets/background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        backdropFilter: 'blur(10px)',
      }}
    >
      <h1 className="display-4 mb-5" style={{ fontFamily: 'OnePieceFont' }}>
        POMODORO TIMER
      </h1>
      <div
        className="w-md-75 w-lg-50 max-h-75 w-100 rounded p-3 shadow-lg"
        style={{
          backgroundColor: '#4B3F72',
          maxWidth: '750px',
          maxHeight: '750px',
          minHeight: '350px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div className="d-flex justify-content-between mb-4 flex-wrap">
          <TimerControls
            title="Break Length"
            value={breakLength}
            onIncrement={() => handleIncrement('break')}
            onDecrement={() => handleDecrement('break')}
          />
          <TimerControls
            title="Session Length"
            value={sessionLength}
            onIncrement={() => handleIncrement('session')}
            onDecrement={() => handleDecrement('session')}
          />
        </div>
        <Display timeLeft={timeLeft} />
        <ActionButtons
          isRunning={isRunning}
          onStartPause={handleStartPause}
          onReset={handleReset}
        />
      </div>
    </div>
  );
};

export default App;
