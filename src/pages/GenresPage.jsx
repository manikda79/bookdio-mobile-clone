import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAudiobooks } from '../contexts/AudiobooksContext'
import { 
  Briefcase, 
  TrendingUp, 
  User, 
  Heart, 
  Clock, 
  Cpu, 
  Book, 
  Search, 
  Sparkles, 
  Rocket,
  Church,
  Users,
  Globe,
  BookOpen,
  List,
  ChevronRight,
  Grid
} from 'lucide-react'

const GenresPage = () => {
  const { genres, categories, liveCategories, getBooksByGenre } = useAudiobooks()
  const navigate = useNavigate()
  const [showAllCategories, setShowAllCategories] = useState(false)

  const getGenreIcon = (genre) => {
    const iconMap = {
      'Business': Briefcase,
      'Self Help': TrendingUp,
      'Biography': User,
      'Health and Fitness': Heart,
      'Historical': Clock,
      'Science': Cpu,
      'Fiction': Book,
      'Mystery': Search,
      'Romance': Heart,
      'Fantasy': Rocket,
      'Spirituality': Church,
      'Politics': Users,
      'Horror': Book,
      'Thriller': Search,
      'Finance': Briefcase,
      'Motivational': TrendingUp
    }
    return iconMap[genre] || Book
  }

  const getCategoryIcon = (category) => {
    const iconMap = {
      'All Books': BookOpen,
      'English Books': Globe,
      'Marathi Books': Globe,
      'Hindi Books': Globe,
      'Books Categories': List
    }
    return iconMap[category] || BookOpen
  }

  const getBookCount = (genre) => {
    return getBooksByGenre(genre).length
  }

  const displayedCategories = showAllCategories ? liveCategories : liveCategories.slice(0, 12)

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Library</h1>
        <p className="text-gray-600 dark:text-gray-400">Browse audiobooks by language and category</p>
      </div>

      {/* Main Categories - Exact from bookdio.org */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Browse by Language</h2>
        <div className="space-y-3">
          {categories.map((category) => {
            const IconComponent = getCategoryIcon(category)
            
            return (
              <button
                key={category}
                onClick={() => navigate(`/genre/${encodeURIComponent(category)}`)}
                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl text-left hover:shadow-md transition-all duration-200 hover:border-bookdio-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-bookdio-100 dark:bg-bookdio-900 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-bookdio-600 dark:text-bookdio-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{category}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Browse collection</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Live Categories */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Live Categories</h2>
          <button
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="text-bookdio-600 hover:text-bookdio-700 text-sm font-semibold"
          >
            {showAllCategories ? 'Show Less' : 'Show All'}
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {displayedCategories.map((category) => (
            <button
              key={category}
              onClick={() => navigate(`/genre/${encodeURIComponent(category)}`)}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-lg text-left hover:shadow-md transition-all duration-200 hover:border-bookdio-300"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-bookdio-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Grid className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-900 dark:text-white">{category}</h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Summaries Section */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Summaries</h2>
        <button
          onClick={() => navigate('/summaries')}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-xl text-left hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Cherry Tales</h3>
                <p className="text-sm text-pink-100">Quick book summaries</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-pink-200" />
          </div>
        </button>
      </div>
      
      {/* Genre Categories */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Browse by Genre</h2>
        <div className="grid grid-cols-1 gap-3">
          {genres.map((genre) => {
            const IconComponent = getGenreIcon(genre)
            const bookCount = getBookCount(genre)
            
            return (
              <button
                key={genre}
                onClick={() => navigate(`/genre/${encodeURIComponent(genre)}`)}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl text-left hover:shadow-md transition-all duration-200 hover:border-bookdio-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{genre}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {bookCount} audiobooks available
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Popular Categories Section */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Most Popular</h2>
        <div className="grid grid-cols-2 gap-3">
          {['Business', 'Self Help', 'Biography', 'Health and Fitness'].map((genre) => {
            const IconComponent = getGenreIcon(genre)
            const bookCount = getBookCount(genre)
            
            return (
              <button
                key={genre}
                onClick={() => navigate(`/genre/${encodeURIComponent(genre)}`)}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl text-left hover:shadow-md transition-all duration-200 hover:border-bookdio-300"
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-bookdio-100 dark:bg-bookdio-900 rounded-lg flex items-center justify-center mr-3">
                    <IconComponent className="w-4 h-4 text-bookdio-600 dark:text-bookdio-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{genre}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{bookCount} books</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default GenresPage