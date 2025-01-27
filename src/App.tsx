import React, { useState } from 'react';
import TimerControls from "./components/TimerControls";
import Display from "./components/Display";
import ActionButtons from "./components/ActionButtons";

const App: React.FC = () => {
  const [breakLength, setBreakLength] = useState<number>(5);
  const [sessionLength, setSessionLength] = useState<number>(25);
  const [timeLeft, setTimeLeft] = useState<number>(sessionLength * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleIncrement = (type: 'break' | 'session') => {
    if (type === 'break') setBreakLength(prev => prev + 1);
    else {
      const newSession = sessionLength + 1;
      setSessionLength(newSession);
      if (!isRunning) setTimeLeft(newSession * 60);
    }
  };

  const handleDecrement = (type: 'break' | 'session') => {
    if (type === 'break' && breakLength > 1) setBreakLength(prev => prev - 1);
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
    <div className="min-vh-100 bg-gradient p-5 d-flex flex-column align-items-center justify-content-center text-white">
      <h1 className="display-4 mb-5">Pomodoro Timer</h1>
      <div className="bg-primary p-4 rounded shadow w-75">
        <div className="d-flex flex-wrap justify-content-between mb-4">
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