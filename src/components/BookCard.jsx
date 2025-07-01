import React from 'react'
import { useAudiobooks } from '../contexts/AudiobooksContext'
import { Play, Bookmark, Bookmark as BookmarkCheck, Star, Clock, Download } from 'lucide-react'

const BookCard = ({ book, onClick }) => {
  const { bookmarks, toggleBookmark, playBook } = useAudiobooks()
  const isBookmarked = bookmarks.includes(book.id)

  const handleBookmarkClick = (e) => {
    e.stopPropagation()
    toggleBookmark(book.id)
  }

  const handlePlayClick = (e) => {
    e.stopPropagation()
    playBook(book)
  }

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg hover:border-bookdio-300"
      onClick={() => onClick?.(book)}
    >
      <div className="relative">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-48 object-cover"
        />
        
        {/* Free Badge - Exact Bookdio Style */}
        <div className="absolute top-2 left-2">
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
            Free
          </span>
        </div>
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2">
          <div className="bg-black bg-opacity-60 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span>{book.rating}</span>
          </div>
        </div>
        
        {/* Bookmark Button */}
        <button
          onClick={handleBookmarkClick}
          className="absolute bottom-2 left-2 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-4 h-4 text-yellow-400" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-sm line-clamp-2 mb-1 text-bookdio-800 dark:text-white leading-tight">
          {book.title}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">
          {book.author}
        </p>
        
        <div className="flex items-center justify-between text-xs mb-3">
          <div className="text-gray-500 dark:text-gray-400">
            Language: {book.language}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs mb-3">
          <div className="text-gray-500 dark:text-gray-400">
            Category: {book.category}
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            {book.duration}
          </div>
        </div>

        {/* Action Buttons - Exact Bookdio Style */}
        <div className="flex space-x-2">
          <button
            onClick={handlePlayClick}
            className="flex-1 bg-bookdio-600 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-bookdio-700 transition-colors flex items-center justify-center space-x-1"
          >
            <Play className="w-3 h-3" />
            <span>Listen to Summary</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              // Handle download
            }}
            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg text-xs font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
          >
            <Download className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookCard