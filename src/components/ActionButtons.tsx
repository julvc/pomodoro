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
  className="btn btn-primary d-flex align-items-center gap-2 btn-sm btn-md-lg"
>
        {isRunning ? <FaPause /> : <FaPlay />}
        {isRunning ? "Pause" : "Start"}
      </button>
      <button
  onClick={onReset}
  className="btn btn-secondary d-flex align-items-center gap-2 btn-sm btn-md-lg"
>
        <FaRedo />
        Reset
      </button>
    </div>
  );
};

export default ActionButtons;