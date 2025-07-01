import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = async (email, password) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const userData = {
        id: 1,
        email,
        name: email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      }
      
      setUser(userData)
      setIsAuthenticated(true)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const loginWithGoogle = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const userData = {
        id: 1,
        email: 'user@gmail.com',
        name: 'John Doe',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=google'
      }
      
      setUser(userData)
      setIsAuthenticated(true)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const signup = async (email, password, name) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const userData = {
        id: 1,
        email,
        name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      }
      
      setUser(userData)
      setIsAuthenticated(true)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      loginWithGoogle,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}