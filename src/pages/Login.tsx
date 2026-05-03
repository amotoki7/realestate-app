import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setErrorMsg(error.message)
    } else {
      navigate('/properties')
    }
    setLoading(false)
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>ログイン</h1>
        <form onSubmit={handleLogin} style={styles.form}>
          <label style={styles.label}>メールアドレス</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            placeholder="example@email.com"
          />
          <label style={styles.label}>パスワード</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            placeholder="パスワードを入力"
          />
          {errorMsg && <p style={styles.error}>{errorMsg}</p>}
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>
        <p style={styles.footer}>
          アカウントをお持ちでない方は{' '}
          <Link to="/register" style={styles.link}>会員登録</Link>
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
