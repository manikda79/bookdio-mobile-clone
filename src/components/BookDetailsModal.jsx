import React, { useState } from 'react'
import { useAudiobooks } from '../contexts/AudiobooksContext'
import { X, Play, Bookmark, Bookmark as BookmarkCheck, Download, Download as DownloadCheck, Star } from 'lucide-react'

const BookDetailsModal = ({ book, onClose }) => {
  const { bookmarks, downloads, toggleBookmark, toggleDownload, playBook } = useAudiobooks()
  const [activeTab, setActiveTab] = useState('details')
  
  const isBookmarked = bookmarks.includes(book.id)
  const isDownloaded = downloads.includes(book.id)

  const handlePlayBook = () => {
    playBook(book)
    onClose()
  }

  const mockReviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      comment: 'Absolutely loved this audiobook! The narrator did an amazing job bringing the characters to life.'
    },
    {
      id: 2,
      name: 'Mike Chen',
      rating: 4,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
      comment: 'Great story and excellent narration. Highly recommend for anyone who enjoys this genre.'
    }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold dark:text-white">Book Details</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 dark:text-white" />
          </button>
        </div>

        {/* Book Info */}
        <div className="p-4">
          <div className="flex space-x-4 mb-6">
            <img
              src={book.cover}
              alt={book.title}
              className="w-32 h-44 object-cover rounded-lg"
            />
            
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 dark:text-white">{book.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-1">by {book.author}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">
                Narrated by {book.narrator}
              </p>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm dark:text-white">{book.rating}</span>
                </div>
                <span className="text-sm px-2 py-1 bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300 rounded-full">
                  {book.genre}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{book.duration}</span>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                {book.description}
              </p>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={handlePlayBook}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  <span>Play</span>
                </button>
                
                <button
                  onClick={() => toggleBookmark(book.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                    isBookmarked
                      ? 'bg-yellow-50 border-yellow-300 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-400'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                </button>
                
                <button
                  onClick={() => toggleDownload(book.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                    isDownloaded
                      ? 'bg-green-50 border-green-300 text-green-700 dark:bg-green-900/20 dark:border-green-700 dark:text-green-400'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {isDownloaded ? <DownloadCheck className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                  <span>{isDownloaded ? 'Downloaded' : 'Download'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
            <div className="flex space-x-6">
              {['details', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'details' && (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="font-medium dark:text-white">Publisher:</span>
                <span className="text-gray-600 dark:text-gray-400">Penguin Random House Audio</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium dark:text-white">Release Date:</span>
                <span className="text-gray-600 dark:text-gray-400">January 15, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium dark:text-white">Language:</span>
                <span className="text-gray-600 dark:text-gray-400">{book.language}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium dark:text-white">File Size:</span>
                <span className="text-gray-600 dark:text-gray-400">245 MB</span>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div key={review.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-sm dark:text-white">{review.name}</div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookDetailsModal