import React from 'react';
import { VolumeUpIcon, VolumeMuteIcon } from './icons';

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (newVolume: number) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ volume, onVolumeChange }) => {
  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button onClick={() => onVolumeChange(volume > 0 ? 0 : 0.75)} className="text-gray-400 hover:text-white">
        {volume > 0 ? <VolumeUpIcon className="w-5 h-5" /> : <VolumeMuteIcon className="w-5 h-5" />}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => onVolumeChange(Number(e.target.value))}
        className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer range-sm accent-blue-500"
      />
    </div>
  );
};

export default VolumeControl;
