import React from 'react';

interface TimerDisplayProps {
  timeLeft: number;
  isBreakActive: boolean;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft, isBreakActive }) => {
  const imageSource = timeLeft === 0 
    ? "./src/assets/end.png" 
    : isBreakActive 
      ? "./src/assets/luffy.png"
      : "./src/assets/end.png";

  return (
    <div className="mb-4 text-center">
      <div className="rounded-circle d-flex justify-content-center align-items-center mb-3"
        style={{ 
          width: '250px',
          height: '250px',
          margin: '0 auto'
        }}>
        <img
          src={imageSource}
          alt={timeLeft === 0 ? "end" : isBreakActive ? "break" : "session"}
          style={{ 
            width: '350px',
            height: '290px',
          }}
        />
      </div>
      <h3 className={`fs-1 fw-bold ${timeLeft === 0 ? 'time-up-animation' : ''}`}>
        {`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}`}
      </h3>
    </div>
  );
};

export default TimerDisplay;