import React from 'react'
import { useAudiobooks } from '../contexts/AudiobooksContext'
import { Play, Pause, SkipBack, SkipForward, X, Volume2 } from 'lucide-react'

const AudioPlayer = () => {
  const {
    currentBook,
    isPlaying,
    currentTime,
    duration,
    volume,
    pauseBook,
    resumeBook,
    seekTo,
    setVolume,
    stopBook
  } = useAudiobooks()

  if (!currentBook) return null

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    seekTo(newTime)
  }

  const skipBackward = () => {
    const newTime = Math.max(0, currentTime - 15)
    seekTo(newTime)
  }

  const skipForward = () => {
    const newTime = Math.min(duration, currentTime + 15)
    seekTo(newTime)
  }

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4">
        {/* Book Cover */}
        <img
          src={currentBook.cover}
          alt={currentBook.title}
          className="w-12 h-12 rounded-lg object-cover"
        />

        {/* Book Info */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{currentBook.title}</div>
          <div className="text-xs text-gray-400 truncate">{currentBook.author}</div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={skipBackward}
            className="p-1 rounded-full hover:bg-gray-700 transition-colors"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          
          <button
            onClick={isPlaying ? pauseBook : resumeBook}
            className="p-2 rounded-full bg-primary-600 hover:bg-primary-700 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          
          <button
            onClick={skipForward}
            className="p-1 rounded-full hover:bg-gray-700 transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={stopBook}
            className="p-1 rounded-full hover:bg-gray-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3">
        <div
          className="w-full h-1 bg-gray-600 rounded-full cursor-pointer"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-primary-600 rounded-full transition-all"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer