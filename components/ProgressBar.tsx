import React from 'react';

interface ProgressBarProps {
  progress: number;
  duration: number;
  onProgressChange: (newProgress: number) => void;
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) {
    return '00:00';
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, duration, onProgressChange }) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onProgressChange(Number(e.target.value));
  };

  return (
    <div className="flex items-center space-x-2 w-full">
      <span className="text-xs text-gray-400 w-10 text-center">{formatTime(progress)}</span>
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={progress}
        onChange={handleSliderChange}
        className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer range-sm accent-blue-500"
      />
      <span className="text-xs text-gray-400 w-10 text-center">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
