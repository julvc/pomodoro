import React from "react";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";

interface ActionButtonsProps {
  isRunning: boolean;
  onStartPause: () => void;
  onReset: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ isRunning, onStartPause, onReset }) => {
  return (
    <div className="mt-4 d-flex flex-column gap-3 flex-sm-row justify-content-center">
      <button
        onClick={onStartPause}
        className="btn btn-lg btn-primary d-flex align-items-center gap-2"
      >
        {isRunning ? <FaPause /> : <FaPlay />}
        {isRunning ? "Pause" : "Start"}
      </button>
      <button
        onClick={onReset}
        className="btn btn-lg btn-secondary d-flex align-items-center gap-2"
      >
        <FaRedo />
        Reset
      </button>
    </div>
  );
};

export default ActionButtons;