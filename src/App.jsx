import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'

import Login       from './pages/Login'
import Register    from './pages/Register'
import Dashboard   from './pages/Dashboard'
import Users       from './pages/Users'
import Nutritionists from './pages/Nutritionists'
import NutritionistForm from './pages/NutritionistForm'
import UserForm    from './pages/UserForm'
import Layout      from './components/Layout'

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index                         element={<Dashboard />} />
            <Route path="users"                  element={<Users />} />
            <Route path="users/new"              element={<UserForm />} />
            <Route path="users/:id/edit"         element={<UserForm />} />
            <Route path="nutritionists"          element={<Nutritionists />} />
            <Route path="nutritionists/new"      element={<NutritionistForm />} />
            <Route path="nutritionists/:id/edit" element={<NutritionistForm />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
