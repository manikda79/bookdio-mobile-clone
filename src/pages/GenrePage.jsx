import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAudiobooks } from '../contexts/AudiobooksContext'
import { ArrowLeft } from 'lucide-react'
import BookCard from '../components/BookCard'
import BookDetailsModal from '../components/BookDetailsModal'

const GenrePage = () => {
  const { genre } = useParams()
  const navigate = useNavigate()
  const { getBooksByGenre } = useAudiobooks()
  const [selectedBook, setSelectedBook] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const books = getBooksByGenre(decodeURIComponent(genre))

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
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 dark:text-white" />
        </button>
        <h1 className="text-2xl font-bold dark:text-white">{decodeURIComponent(genre)}</h1>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📚</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No books found in this genre
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Check back later for new additions
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((book) => (
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

export default GenrePage