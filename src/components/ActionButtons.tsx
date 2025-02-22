import React from 'react';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';

interface ActionButtonsProps {
  isRunning: boolean;
  onStartPause: () => void;
  onReset: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isRunning,
  onStartPause,
  onReset,
}) => {
  return (
    <div className="d-flex flex-column flex-sm-row justify-content-center mt-4 gap-3">
      <button
        onClick={onStartPause}
        className="btn btn-primary d-flex align-items-center btn-sm btn-md-lg gap-2"
      >
        {isRunning ? <FaPause /> : <FaPlay />}
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button
        onClick={onReset}
        className="btn btn-secondary d-flex align-items-center btn-sm btn-md-lg gap-2"
      >
        <FaRedo />
        Reset
      </button>
    </div>
  );
};

export default ActionButtons;
