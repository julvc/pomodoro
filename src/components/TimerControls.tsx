import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface TimerControlsProps {
  title: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (value: number) => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  title,
  value,
  onIncrement,
  onDecrement,
  onChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value.toString());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Solo permitir números
    if (/^\d*$/.test(newValue)) {
      setInputValue(newValue);
    }
  };

  const handleBlur = () => {
    const numValue = parseInt(inputValue);
    if (!isNaN(numValue) && numValue > 0 && numValue <= 60) {
      onChange(numValue);
    } else {
      setInputValue(value.toString());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h3 className="fs-6">{title}</h3>
      <div className="d-flex align-items-center gap-2">
        <button
          onClick={onDecrement}
          className="btn btn-outline-light btn-sm"
          disabled={value <= 1}
          style={{
            backgroundColor: '#6a6a6a',
            borderColor: '#6a6a6a',
          }}
        >
          <FaMinus style={{ color: '#FFD700' }} />
        </button>

        {isEditing ? (
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="form-control form-control-sm text-center"
            style={{ width: '60px' }}
            autoFocus
          />
        ) : (
          <span
            onClick={() => setIsEditing(true)}
            style={{ cursor: 'pointer', minWidth: '30px' }}
            className="text-center"
          >
            {value}
          </span>
        )}

        <button
          onClick={onIncrement}
          className="btn btn-outline-light btn-sm"
          disabled={value >= 60}
          style={{
            backgroundColor: '#6a6a6a',
            borderColor: '#6a6a6a',
          }}
        >
          <FaPlus style={{ color: '#87CEEB' }} />
        </button>
      </div>
    </div>
  );
};

export default TimerControls;
