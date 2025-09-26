import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Song } from './types';
import PlayerControls from './components/PlayerControls';
import ProgressBar from './components/ProgressBar';
import VolumeControl from './components/VolumeControl';
import SongList from './components/SongList';
import { MusicNoteIcon } from './components/icons';

const App: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.75);

  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setProgress(audio.currentTime);
    };

    const setAudioTime = () => setProgress(audio.currentTime);
    
    const handleSongEnd = () => playNext();

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', handleSongEnd);

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handleSongEnd);
    };
  }, [currentSongIndex, songs]); // Re-attach listeners if song changes

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(error => console.error("Error playing audio:", error));
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSongIndex]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const audioFiles = Array.from(files).filter((file: File) => 
        file.type.startsWith('audio/')
      );

      const newSongs: Song[] = audioFiles.map(file => ({
        file,
        name: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
        url: URL.createObjectURL(file)
      }));
      
      setSongs(prevSongs => [...prevSongs, ...newSongs]); // Append new songs
      if (currentSongIndex === null && newSongs.length > 0) {
        setCurrentSongIndex(0);
        setIsPlaying(false);
      }
    }
  };

  const playSong = (index: number) => {
    if (index >= 0 && index < songs.length) {
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (currentSongIndex !== null) {
      setIsPlaying(!isPlaying);
    }
  };

  const playNext = useCallback(() => {
    if (songs.length === 0) return;
    const newIndex = currentSongIndex === null ? 0 : (currentSongIndex + 1) % songs.length;
    playSong(newIndex);
  }, [currentSongIndex, songs.length]);


  const playPrevious = () => {
    if (songs.length === 0) return;
    const newIndex = currentSongIndex === null ? 0 : (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(newIndex);
  };
  
  const handleProgressChange = (newProgress: number) => {
    if (audioRef.current) {
        audioRef.current.currentTime = newProgress;
        setProgress(newProgress);
    }
  };

  const currentSong = currentSongIndex !== null ? songs[currentSongIndex] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl shadow-blue-500/10 overflow-hidden flex flex-col md:flex-row">
        
        {/* Player Section */}
        <div className="w-full md:w-2/5 p-6 flex flex-col items-center justify-center bg-black/20">
          <div className="w-56 h-56 lg:w-64 lg:h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg flex items-center justify-center mb-6">
            <MusicNoteIcon className="w-24 h-24 text-white opacity-50" />
          </div>
          <h2 className="text-xl font-bold text-center truncate w-full" title={currentSong?.name ?? 'No song selected'}>
            {currentSong?.name ?? 'No song selected'}
          </h2>
          <p className="text-sm text-gray-400">Local Music Player</p>
          
          <div className="w-full mt-6">
            <ProgressBar duration={duration} progress={progress} onProgressChange={handleProgressChange} />
            <PlayerControls
              isPlaying={isPlaying}
              onPlayPause={togglePlayPause}
              onNext={playNext}
              onPrevious={playPrevious}
            />
            <VolumeControl volume={volume} onVolumeChange={setVolume} />
          </div>
        </div>

        {/* Playlist Section */}
        <div className="w-full md:w-3/5 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">Playlist</h3>
            <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
                Add Songs
            </button>
            <input
                type="file"
                ref={fileInputRef}
                multiple
                onChange={handleFileSelect}
                className="hidden"
                accept="audio/*"
            />
          </div>
          <SongList 
            songs={songs} 
            currentSongIndex={currentSongIndex}
            onSongSelect={playSong}
            isPlaying={isPlaying}
          />
        </div>
      </div>
      {currentSong && <audio ref={audioRef} src={currentSong.url} />}
    </div>
  );
};

export default App;