import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { useAudiobooks } from '../contexts/AudiobooksContext'
import { 
  User, 
  Settings, 
  Moon, 
  Sun, 
  Download, 
  Bell, 
  HelpCircle, 
  LogOut,
  Crown,
  Star,
  Clock,
  Bookmark
} from 'lucide-react'
import LoginModal from '../components/LoginModal'

const ProfilePage = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const { bookmarkedBooks, downloadedBooks } = useAudiobooks()
  const [showLoginModal, setShowLoginModal] = useState(false)

  if (!isAuthenticated) {
    return (
      <div className="p-4">
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Join Bookdio</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Sign up to sync your library and get personalized recommendations
          </p>

          <div className="space-y-3 max-w-sm mx-auto">
            <button
              onClick={() => setShowLoginModal(true)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Sign Up / Sign In
            </button>
            
            <button className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2">
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                className="w-5 h-5"
              />
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="mt-8 text-xs text-gray-500 dark:text-gray-400">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </div>
        </div>

        {showLoginModal && (
          <LoginModal onClose={() => setShowLoginModal(false)} />
        )}
      </div>
    )
  }

  const settingsItems = [
    {
      icon: Crown,
      label: 'Upgrade to Premium',
      description: 'Unlock exclusive features',
      action: () => {},
      hasArrow: true,
      isPremium: true
    },
    {
      icon: isDark ? Sun : Moon,
      label: 'Dark Mode',
      description: isDark ? 'Switch to light mode' : 'Switch to dark mode',
      action: toggleTheme,
      hasToggle: true,
      toggleValue: isDark
    },
    {
      icon: Download,
      label: 'Download Settings',
      description: 'Manage offline content',
      action: () => {},
      hasArrow: true
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: 'New releases and updates',
      action: () => {},
      hasArrow: true
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      description: 'Get help and contact us',
      action: () => {},
      hasArrow: true
    }
  ]

  return (
    <div className="p-4 space-y-6">
      {/* User Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 rounded-2xl">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-blue-100">{user.email}</p>
            <div className="flex items-center mt-2">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="text-sm">Free Member</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center border border-gray-200 dark:border-gray-700">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Bookmark className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {bookmarkedBooks.length}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Saved</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center border border-gray-200 dark:border-gray-700">
          <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Download className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {downloadedBooks.length}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Downloaded</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center border border-gray-200 dark:border-gray-700">
          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">24h</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Listened</div>
        </div>
      </div>

      {/* Settings */}
      <div>
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Settings</h3>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
          {settingsItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-xl last:rounded-b-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    item.isPremium 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    <IconComponent className={`w-4 h-4 ${
                      item.isPremium ? 'text-white' : 'text-gray-600 dark:text-gray-400'
                    }`} />
                  </div>
                  <div className="text-left">
                    <div className={`font-medium ${
                      item.isPremium ? 'text-orange-600 dark:text-orange-400' : 'text-gray-900 dark:text-white'
                    }`}>
                      {item.label}
                    </div>
                    {item.description && (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                      </div>
                    )}
                  </div>
                </div>
                
                {item.hasToggle && (
                  <div className={`w-12 h-6 rounded-full transition-colors ${
                    item.toggleValue ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform mt-0.5 ${
                      item.toggleValue ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </div>
                )}
                
                {item.hasArrow && (
                  <span className="text-gray-400">›</span>
                )}
              </button>
            )
          })}
          
          {/* Sign Out */}
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 p-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400 rounded-b-xl"
          >
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
              <LogOut className="w-4 h-4" />
            </div>
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage