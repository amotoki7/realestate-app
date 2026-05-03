import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '../contexts/AuthContext'

// 未ログイン時はログイン画面へリダイレクトするガード
export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth()

  // セッション確認中はブランク表示（チラ見えを防ぐ）
  if (loading) return null

  return session ? <>{children}</> : <Navigate to="/login" replace />
}
