import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAudiobooks } from '../contexts/AudiobooksContext'
import { Search, TrendingUp, Clock, Star, ChevronRight, BookOpen, Headphones, Users } from 'lucide-react'
import BookCard from '../components/BookCard'
import BookDetailsModal from '../components/BookDetailsModal'

const HomePage = () => {
  const { latestBooks, popularBooks, currentBook, categories } = useAudiobooks()
  const navigate = useNavigate()
  const [selectedBook, setSelectedBook] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const openBookDetails = (book) => {
    setSelectedBook(book)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedBook(null)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section - Exact from website */}
      <div className="bg-white dark:bg-gray-800 px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-bookdio-800 dark:text-white mb-4">
            Your 10-Minute Shortcut to the World's Best Books
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Join 1M+ readers learning life lessons from books in under 10 mins. Everyday.
          </p>
          
          {/* Search Bar - Exact from website */}
          <div className="bg-bookdio-700 p-8 rounded-2xl mb-8">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Books, Authors, Genre or topics"
                  className="w-full px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bookdio-300 text-lg"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
                >
                  <Search className="w-6 h-6" />
                </button>
              </div>
            </form>
          </div>

          {/* Fixed pronunciation - changed from book-dee-oo to bookdio */}
          <div className="text-gray-500 dark:text-gray-400 text-lg">
            [bookdio]
          </div>
        </div>
      </div>

      <div className="px-4 py-8 space-y-8">
        {/* Trending Books Section - Exact from website */}
        <div>
          <h2 className="text-xl font-bold text-bookdio-800 dark:text-white mb-6 text-center">
            Trending books this month
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onClick={openBookDetails}
              />
            ))}
          </div>
        </div>

        {/* Quick Access Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => navigate('/genres')}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl text-center hover:shadow-md transition-all duration-200 hover:border-bookdio-300"
          >
            <div className="w-12 h-12 bg-bookdio-100 dark:bg-bookdio-900 rounded-lg flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-bookdio-600 dark:text-bookdio-400" />
            </div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Library</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">All Books</p>
          </button>

          <button
            onClick={() => navigate('/summaries')}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl text-center hover:shadow-md transition-all duration-200 hover:border-bookdio-300"
          >
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Summaries</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Quick reads</p>
          </button>

          <button
            onClick={() => navigate('/cherry-tales')}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl text-center hover:shadow-md transition-all duration-200 hover:border-bookdio-300"
          >
            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Headphones className="w-6 h-6 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Cherry Tales</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Audio stories</p>
          </button>

          <button
            onClick={() => navigate('/search')}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl text-center hover:shadow-md transition-all duration-200 hover:border-bookdio-300"
          >
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Search</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Find books</p>
          </button>
        </div>

        {/* Continue Listening */}
        {currentBook && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                <Clock className="w-5 h-5 mr-2 text-bookdio-600" />
                Continue Listening
              </h2>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <img
                  src={currentBook.cover}
                  alt={currentBook.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{currentBook.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{currentBook.author}</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-bookdio-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <button className="bg-bookdio-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-bookdio-700 transition-colors">
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Latest Releases */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              <Star className="w-5 h-5 mr-2 text-bookdio-600" />
              Latest Releases
            </h2>
            <button className="text-bookdio-600 hover:text-bookdio-700 text-sm font-semibold flex items-center">
              See All <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {latestBooks.slice(0, 4).map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onClick={openBookDetails}
              />
            ))}
          </div>
        </div>

        {/* Cherry Tales Section - Special Bookdio Feature */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6 rounded-2xl">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Cherry Tales</h2>
              <p className="text-pink-100 text-sm">Curated book summaries</p>
            </div>
          </div>
          <p className="text-pink-100 mb-4 text-sm">
            Get the key insights from bestselling books in just 15 minutes
          </p>
          <button className="bg-white text-pink-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Explore Summaries
          </button>
        </div>
      </div>

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

export default HomePage