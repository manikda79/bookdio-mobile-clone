import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useAudiobooks } from '../contexts/AudiobooksContext'
import { useAuth } from '../contexts/AuthContext'
import { Search, Home, Grid as Grid3X3, Bookmark, User, LogIn } from 'lucide-react'
import AudioPlayer from './AudioPlayer'

const Layout = ({ children }) => {
  const { isDark, toggleTheme } = useTheme()
  const { currentBook } = useAudiobooks()
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setShowSearch(false)
      setSearchQuery('')
    }
  }

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/genres', icon: Grid3X3, label: 'Library' },
    { path: '/bookmarks', icon: Bookmark, label: 'Saved' },
    { path: '/profile', icon: User, label: 'Profile' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header - Exact Bookdio Style */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo Section - Using Official Bookdio Logo */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <img 
                  src="/src/assets/bookdio logo.png" 
                  alt="Bookdio Logo" 
                  className="w-8 h-8"
                />
                <span className="text-xl font-bold text-gray-900 dark:text-white">BOOKDIO</span>
                <span className="text-sm text-gray-500">.org</span>
              </div>
            </div>
            
            {/* Navigation - Like website */}
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => navigate('/genres')}
                className="text-gray-700 dark:text-gray-300 hover:text-bookdio-600 font-medium"
              >
                Library
              </button>
              <button 
                onClick={() => navigate('/summaries')}
                className="text-gray-700 dark:text-gray-300 hover:text-bookdio-600 font-medium"
              >
                Summaries
              </button>
              <button 
                onClick={() => navigate('/cherry-tales')}
                className="text-gray-700 dark:text-gray-300 hover:text-bookdio-600 font-medium"
              >
                Cherry Tales
              </button>
            </div>
            
            {/* Right Section */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              
              {!isAuthenticated ? (
                <button 
                  onClick={() => navigate('/profile')}
                  className="flex items-center space-x-2 bg-bookdio-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-bookdio-700 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Log In</span>
                </button>
              ) : (
                <button 
                  onClick={() => navigate('/profile')}
                  className="w-8 h-8 bg-bookdio-600 rounded-full flex items-center justify-center"
                >
                  <User className="w-4 h-4 text-white" />
                </button>
              )}
            </div>
          </div>
          
          {/* Search Bar */}
          {showSearch && (
            <form onSubmit={handleSearch} className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Books, Authors, Genre or topics"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-bookdio-500 border-0"
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowSearch(false)
                    setSearchQuery('')
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl"
                >
                  ×
                </button>
              </div>
            </form>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-20">
        {children}
      </main>

      {/* Audio Player */}
      {currentBook && (
        <div className="fixed bottom-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700">
          <AudioPlayer />
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="flex">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`flex-1 flex flex-col items-center py-3 px-1 transition-colors ${
                  isActive
                    ? 'text-bookdio-600 dark:text-bookdio-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-bookdio-600 dark:hover:text-bookdio-400'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

export default Layout