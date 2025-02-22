import React, { useState, useEffect, useRef } from 'react';
import TimerControls from './components/TimerControls';
import Display from './components/Display';
import ActionButtons from './components/ActionButtons';
import alarmSound from '/alarm.mp3';
//import alarmSound from './assets/alarm.mp3';

const App: React.FC = () => {
  const [breakLength, setBreakLength] = useState<number>(5);
  const [sessionLength, setSessionLength] = useState<number>(25);
  const [timeLeft, setTimeLeft] = useState<number>(sessionLength * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  //const [isBreak, setIsBreak] = useState<boolean>(false);
  const [alarmPlaying, setAlarmPlaying] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [timeIsUp, setTimeIsUp] = useState<boolean>(false);
  const [isBreakActive, setIsBreakActive] = useState<boolean>(false);
  const breakAlarmSound = '/break.mp3';
  const sessionAlarmSound = '/session.mp3';  
  // const breakAlarmSound = '@/src/assets/break.mp3';
  // const sessionAlarmSound = '@/src/assets/session.mp3';

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 0) return prev - 1;

          if (audioRef.current) {
            audioRef.current.src = !isBreakActive
              ? breakAlarmSound
              : sessionAlarmSound;
            audioRef.current.play();
            setAlarmPlaying(true);
          }

          setTimeout(() => {
            if (!isBreakActive) {
              setIsBreakActive(true);
              setTimeLeft(breakLength * 60);
            } else {
              setIsBreakActive(false);
              setTimeLeft(sessionLength * 60);
            }
          });

          return 0;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, breakLength, sessionLength, isBreakActive]);

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
    if (timeIsUp) {
      setTimeIsUp(false);
    }
  };

  const handleReset = () => {
    clearInterval(timerRef.current!);
    setIsRunning(false);
    setIsBreakActive(false);
    setTimeLeft(sessionLength * 60);
    setTimeIsUp(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setAlarmPlaying(false);
    }
  };

  const handleStopAlarm = () => {
    if (audioRef.current && alarmPlaying) { // Usar alarmPlaying aquí
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setAlarmPlaying(false);
    }
    handleReset();
  };

  const handleValueChange = (type: 'break' | 'session', newValue: number) => {
    if (type === 'break') {
      setBreakLength(newValue);
    } else {
      setSessionLength(newValue);
      if (!isRunning) {
        setTimeLeft(newValue * 60);
      }
    }
  };

  return (
    <div
      className="vh-100 d-flex flex-column justify-content-center align-items-center px-md-5 px-3 text-white"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backgroundImage: `url('/background.jpg')`,
        // backgroundImage: `url('@/src/assets/background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        backdropFilter: 'blur(10px)',
      }}
    >
      <audio ref={audioRef} src={alarmSound} />
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
            onChange={(value) => handleValueChange('break', value)}
          />
          <TimerControls
            title="Session Length"
            value={sessionLength}
            onIncrement={() => handleIncrement('session')}
            onDecrement={() => handleDecrement('session')}
            onChange={(value) => handleValueChange('session', value)}
          />
        </div>
        <h2>{isBreakActive ? 'Break Time' : 'Session Time'}</h2>
        <Display timeLeft={timeLeft} isBreakActive={isBreakActive} />
        <ActionButtons
          isRunning={isRunning}
          onStartPause={handleStartPause}
          onReset={handleStopAlarm}
        />
      </div>
    </div>
  );
};

export default App;
