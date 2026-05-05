import React, { createContext, useContext, useState, useCallback } from 'react'
import { authApi } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('nutri_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const login = useCallback(async (email, senha) => {
    const { data } = await authApi.login(email, senha)
    localStorage.setItem('nutri_token', data.access_token)
    localStorage.setItem('nutri_user', JSON.stringify(data.user ?? { email }))
    setUser(data.user ?? { email })
    return data
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('nutri_token')
    localStorage.removeItem('nutri_user')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
