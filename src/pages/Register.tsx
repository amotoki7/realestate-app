import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')
    setLoading(true)

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setErrorMsg(error.message)
    } else {
      // メール確認が不要な設定の場合はそのままリダイレクト
      setSuccessMsg('登録が完了しました。ログインしてください。')
      setTimeout(() => navigate('/login'), 2000)
    }
    setLoading(false)
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>会員登録</h1>
        <form onSubmit={handleRegister} style={styles.form}>
          <label style={styles.label}>メールアドレス</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            placeholder="example@email.com"
          />
          <label style={styles.label}>パスワード（6文字以上）</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={styles.input}
            placeholder="パスワードを入力"
          />
          {errorMsg && <p style={styles.error}>{errorMsg}</p>}
          {successMsg && <p style={styles.success}>{successMsg}</p>}
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? '登録中...' : '登録する'}
          </button>
        </form>
        <p style={styles.footer}>
          すでにアカウントをお持ちの方は{' '}
          <Link to="/login" style={styles.link}>ログイン</Link>
        </p>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.6rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.9rem',
    color: '#555',
    marginTop: '0.5rem',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    outline: 'none',
  },
  error: {
    color: '#e53e3e',
    fontSize: '0.85rem',
    marginTop: '0.25rem',
  },
  success: {
    color: '#38a169',
    fontSize: '0.85rem',
    marginTop: '0.25rem',
  },
  button: {
    marginTop: '1rem',
    padding: '0.8rem',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  footer: {
    textAlign: 'center',
    marginTop: '1.25rem',
    fontSize: '0.9rem',
    color: '#666',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
  },
}
