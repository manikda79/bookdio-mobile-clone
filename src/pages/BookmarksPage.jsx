import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAudiobooks } from '../contexts/AudiobooksContext'
import { Bookmark, Download, Clock } from 'lucide-react'
import BookCard from '../components/BookCard'
import BookDetailsModal from '../components/BookDetailsModal'

const BookmarksPage = () => {
  const { bookmarkedBooks, downloadedBooks } = useAudiobooks()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('bookmarks')
  const [selectedBook, setSelectedBook] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const openBookDetails = (book) => {
    setSelectedBook(book)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedBook(null)
  }

  const tabs = [
    { id: 'bookmarks', label: 'Bookmarked', icon: Bookmark, books: bookmarkedBooks },
    { id: 'downloads', label: 'Downloaded', icon: Download, books: downloadedBooks },
    { id: 'history', label: 'History', icon: Clock, books: [] }
  ]

  const activeTabData = tabs.find(tab => tab.id === activeTab)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">My Library</h1>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {tabs.map((tab) => {
          const IconComponent = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Content */}
      {activeTabData.books.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <activeTabData.icon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {activeTab === 'bookmarks' && 'No bookmarked books yet'}
            {activeTab === 'downloads' && 'No downloaded books yet'}
            {activeTab === 'history' && 'No listening history yet'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {activeTab === 'bookmarks' && 'Start exploring and bookmark your favorite audiobooks'}
            {activeTab === 'downloads' && 'Download books for offline listening'}
            {activeTab === 'history' && 'Your recently played books will appear here'}
          </p>
          {activeTab === 'bookmarks' && (
            <button
              onClick={() => navigate('/')}
              className="btn btn-primary px-6 py-2"
            >
              Browse Books
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {activeTabData.books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onClick={openBookDetails}
            />
          ))}
        </div>
      )}

      {/* Book Details Modal */}
      {showModal && selectedBook && (
        <BookDetailsModal
          book={selectedBook}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default BookmarksPage