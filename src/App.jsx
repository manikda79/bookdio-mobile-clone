import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AudiobooksProvider } from './contexts/AudiobooksContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import GenresPage from './pages/GenresPage'
import GenrePage from './pages/GenrePage'
import BookmarksPage from './pages/BookmarksPage'
import ProfilePage from './pages/ProfilePage'
import SearchPage from './pages/SearchPage'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AudiobooksProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/genres" element={<GenresPage />} />
                <Route path="/genre/:genre" element={<GenrePage />} />
                <Route path="/bookmarks" element={<BookmarksPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/search" element={<SearchPage />} />
              </Routes>
            </Layout>
          </Router>
        </AudiobooksProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App