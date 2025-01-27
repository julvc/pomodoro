import React from 'react';

interface TimerDisplayProps {
  timeLeft: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft }) => {
  return (
    <div className="text-center mb-4">
      <div className="rounded-circle w-150px h-150px d-flex justify-content-center align-items-center bg-light mb-3">
        <img src="./src/assets/luffy.png" alt="luffy" className="img-fluid rounded-circle" />
      </div>
      <h3 className="fs-1 fw-bold">{`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}`}</h3>
    </div>
  );
};

export default TimerDisplay;