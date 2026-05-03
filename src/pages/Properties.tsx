import { useAuth } from '../contexts/AuthContext'
import PropertyCard from '../components/PropertyCard'

// ダミー物件データ
const DUMMY_PROPERTIES = [
  { id: 1, name: 'グランドヒルズ渋谷', rent: 180000, area: '東京都渋谷区', type: 'マンション' },
  { id: 2, name: 'サンライズ新宿', rent: 120000, area: '東京都新宿区', type: 'アパート' },
  { id: 3, name: 'ラ・コリーナ六本木', rent: 250000, area: '東京都港区', type: 'マンション' },
  { id: 4, name: 'エレガンス恵比寿', rent: 160000, area: '東京都渋谷区', type: 'マンション' },
  { id: 5, name: 'パークビュー豊島', rent: 90000, area: '東京都豊島区', type: 'アパート' },
  { id: 6, name: 'ブルースカイ中野', rent: 75000, area: '東京都中野区', type: 'アパート' },
]

export default function Properties() {
  const { user, signOut } = useAuth()

  return (
    <div style={styles.page}>
      {/* ヘッダー */}
      <header style={styles.header}>
        <h1 style={styles.logo}>🏠 不動産管理アプリ</h1>
        <div style={styles.userInfo}>
          <span style={styles.email}>{user?.email}</span>
          <button onClick={signOut} style={styles.signOutButton}>
            ログアウト
          </button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main style={styles.main}>
        <h2 style={styles.sectionTitle}>物件一覧</h2>
        <p style={styles.count}>{DUMMY_PROPERTIES.length} 件</p>
        <div style={styles.grid}>
          {DUMMY_PROPERTIES.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>
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
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#1a202c',
    marginBottom: '0.25rem',
  },
  count: {
    fontSize: '0.9rem',
    color: '#718096',
    marginBottom: '1.5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.25rem',
  },
}
