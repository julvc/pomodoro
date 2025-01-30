import React from 'react';

interface TimerDisplayProps {
  timeLeft: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft }) => {
  return (
    <div className="mb-4 text-center">
      <div
        className="rounded-circle d-flex justify-content-center align-items-center mb-3"
        style={{ width: '50%', maxWidth: '350px', height: 'auto', margin: '0 auto' }}
      >
        <img
          src="./src/assets/luffy.png"
          alt="luffy"
          className="img-fluid rounded-circle"
          style={{ maxWidth: "250px", maxHeight: "250px", objectFit: "cover" }}
        />
      </div>
      <h3 className="fs-1 fw-bold">{`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}`}</h3>
    </div>
  );
};

export default TimerDisplay;
