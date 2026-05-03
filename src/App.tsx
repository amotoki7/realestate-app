import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Properties from './pages/Properties'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ルートは物件一覧へリダイレクト */}
          <Route path="/" element={<Navigate to="/properties" replace />} />

          {/* 認証不要ルート */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 要認証ルート */}
          <Route
            path="/properties"
            element={
              <PrivateRoute>
                <Properties />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
