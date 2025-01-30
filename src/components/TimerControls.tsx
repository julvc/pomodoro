import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface TimerControlsProps {
  title: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({ title, value, onIncrement, onDecrement }) => {
  return (
    <div className="text-center mb-4">
      <h5 className="mb-3">{title}</h5>
      <div className="d-flex justify-content-center align-items-center gap-4">
        <button
          onClick={onDecrement}
          className="btn btn-danger px-4 py-2 w-auto h-auto"
        >
          <FaMinus />
        </button>
        <span className="fs-3">{value}</span>
        <button
          onClick={onIncrement}
          className="btn btn-success px-4 py-2 w-auto h-auto"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default TimerControls;