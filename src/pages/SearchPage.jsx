import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAudiobooks } from '../contexts/AudiobooksContext'
import { Search } from 'lucide-react'
import BookCard from '../components/BookCard'
import BookDetailsModal from '../components/BookDetailsModal'

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { searchBooks } = useAudiobooks()
  const [selectedBook, setSelectedBook] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const query = searchParams.get('q') || ''
  const searchResults = searchBooks(query)

  const openBookDetails = (book) => {
    setSelectedBook(book)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedBook(null)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2 dark:text-white">Search Results</h1>
      
      {query && (
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Showing results for "{query}"
        </p>
      )}

      {searchResults.length === 0 && query ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No results found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Try different keywords or browse our genres
          </p>
          <button
            onClick={() => navigate('/genres')}
            className="btn btn-primary px-6 py-2"
          >
            Browse Genres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResults.map((book) => (
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

export default SearchPage