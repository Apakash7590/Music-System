import React from 'react';
import { PlayIcon, PauseIcon, NextIcon, PreviousIcon } from './icons';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
}) => {
  return (
    <div className="flex items-center justify-center space-x-6 my-4">
      <button onClick={onPrevious} className="p-2 rounded-full text-gray-400 hover:text-white transition-colors duration-300">
        <PreviousIcon className="w-6 h-6" />
      </button>
      <button
        onClick={onPlayPause}
        className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white shadow-lg transform hover:scale-110 transition-transform duration-300"
      >
        {isPlaying ? <PauseIcon className="w-8 h-8" /> : <PlayIcon className="w-8 h-8" />}
      </button>
      <button onClick={onNext} className="p-2 rounded-full text-gray-400 hover:text-white transition-colors duration-300">
        <NextIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default PlayerControls;
