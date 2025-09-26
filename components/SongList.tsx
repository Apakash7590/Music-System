import React from 'react';
import { Song } from '../types';
import { MusicNoteIcon, PlayIcon } from './icons';

interface SongListProps {
  songs: Song[];
  currentSongIndex: number | null;
  isPlaying: boolean;
  onSongSelect: (index: number) => void;
}

const SongList: React.FC<SongListProps> = ({ songs, currentSongIndex, isPlaying, onSongSelect }) => {
  if (songs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <MusicNoteIcon className="w-16 h-16 mb-4" />
        <p>Your playlist is empty.</p>
        <p className="text-sm">Click "Load Music" to add a folder.</p>
      </div>
    );
  }

  return (
    <div className="h-96 overflow-y-auto pr-2">
      <ul>
        {songs.map((song, index) => {
          const isActive = index === currentSongIndex;
          return (
            <li
              key={song.url}
              onClick={() => onSongSelect(index)}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 mb-2 ${
                isActive
                  ? 'bg-blue-600/30 text-white'
                  : 'hover:bg-gray-800/70 text-gray-300'
              }`}
            >
              <div className="w-8 text-center mr-4">
                {isActive && isPlaying ? (
                  <div className="playing-indicator">
                    <span />
                    <span />
                    <span />
                  </div>
                ) : (
                  <MusicNoteIcon className="w-5 h-5 mx-auto" />
                )}
              </div>
              <span className="flex-grow truncate" title={song.name}>{song.name}</span>
            </li>
          );
        })}
      </ul>
      {/* Fix: Removed invalid 'jsx' prop from style tag. This is not standard React and is specific to frameworks like Next.js. */}
      <style>{`
        .playing-indicator {
          display: flex;
          justify-content: space-around;
          align-items: flex-end;
          width: 20px;
          height: 20px;
        }
        .playing-indicator span {
          width: 4px;
          background-color: #3b82f6; /* Tailwind blue-500 */
          display: block;
          animation: bounce 1.2s infinite ease-in-out;
        }
        .playing-indicator span:nth-of-type(2) {
          animation-delay: -0.9s;
        }
        .playing-indicator span:nth-of-type(3) {
          animation-delay: -0.6s;
        }
        @keyframes bounce {
          0%, 100% {
            transform: scaleY(0.4);
            height: 8px;
          }
          50% {
            transform: scaleY(1.0);
            height: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default SongList;