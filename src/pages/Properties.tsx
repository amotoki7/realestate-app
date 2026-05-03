import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useProperties } from '../hooks/useProperties'
import PropertyCard from '../components/PropertyCard'
import PropertyForm from '../components/PropertyForm'
import type { Property, PropertyInput } from '../types/property'

export default function Properties() {
  const { user, signOut } = useAuth()
  const { properties, loading, error, addProperty, updateProperty, deleteProperty } = useProperties()

  // モーダル制御: null=非表示, 'new'=新規登録, Property=編集対象
  const [formTarget, setFormTarget] = useState<null | 'new' | Property>(null)

  // 操作エラーをユーザーに通知するためのメッセージ
  const [actionError, setActionError] = useState<string | null>(null)

  const handleAddSubmit = async (input: PropertyInput) => {
    const err = await addProperty(input)
    if (err) return err
    setFormTarget(null)
    return null
  }

  const handleEditSubmit = async (input: PropertyInput) => {
    if (!formTarget || formTarget === 'new') return '編集対象が不正です'
    const err = await updateProperty(formTarget.id, input)
    if (err) return err
    setFormTarget(null)
    return null
  }

  const handleDelete = async (id: string) => {
    setActionError(null)
    const err = await deleteProperty(id)
    if (err) setActionError(err)
  }

  return (
    <div style={styles.page}>
      {/* ヘッダー */}
      <header style={styles.header}>
        <h1 style={styles.logo}>🏠 不動産管理アプリ</h1>
        <div style={styles.userInfo}>
          <span style={styles.email}>{user?.email}</span>
          <button onClick={signOut} style={styles.signOutButton}>ログアウト</button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main style={styles.main}>
        <div style={styles.toolbar}>
          <div>
            <h2 style={styles.sectionTitle}>物件一覧</h2>
            {!loading && (
              <p style={styles.count}>{properties.length} 件</p>
            )}
          </div>
          <button onClick={() => setFormTarget('new')} style={styles.addButton}>
            ＋ 新規登録
          </button>
        </div>

        {/* API エラー表示 */}
        {(error || actionError) && (
          <p style={styles.error}>{error ?? actionError}</p>
        )}

        {/* ローディング */}
        {loading && <p style={styles.loading}>読み込み中...</p>}

        {/* 物件ゼロ件 */}
        {!loading && properties.length === 0 && (
          <div style={styles.empty}>
            <p>登録された物件がありません。</p>
            <p>「＋ 新規登録」から追加してください。</p>
          </div>
        )}

        {/* 物件グリッド */}
        {!loading && properties.length > 0 && (
          <div style={styles.grid}>
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onEdit={(p) => setFormTarget(p)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* 新規登録モーダル */}
      {formTarget === 'new' && (
        <PropertyForm
          onSubmit={handleAddSubmit}
          onCancel={() => setFormTarget(null)}
        />
      )}

      {/* 編集モーダル */}
      {formTarget && formTarget !== 'new' && (
        <PropertyForm
          initialData={formTarget}
          onSubmit={handleEditSubmit}
          onCancel={() => setFormTarget(null)}
        />
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f7fafc',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    backgroundColor: '#fff',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  },
  logo: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#1a202c',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  email: {
    fontSize: '0.9rem',
    color: '#718096',
  },
  signOutButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '0.9rem',
    color: '#4a5568',
    cursor: 'pointer',
  },
  main: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#1a202c',
  },
  count: {
    fontSize: '0.9rem',
    color: '#718096',
    marginTop: '0.2rem',
  },
  addButton: {
    padding: '0.65rem 1.25rem',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.95rem',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  error: {
    color: '#e53e3e',
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  loading: {
    color: '#718096',
    fontSize: '0.9rem',
  },
  empty: {
    textAlign: 'center',
    padding: '4rem 0',
    color: '#718096',
    lineHeight: 2,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.25rem',
  },
}
