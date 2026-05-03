import type { Property } from '../types/property'

type Props = {
  property: Property
  onEdit: (property: Property) => void
  onDelete: (id: string) => void
}

export default function PropertyCard({ property, onEdit, onDelete }: Props) {
  const handleDelete = () => {
    // 誤操作を防ぐため削除前に確認ダイアログを表示
    if (window.confirm(`「${property.name}」を削除してもよいですか？`)) {
      onDelete(property.id)
    }
  }

  return (
    <div style={styles.card}>
      <div style={styles.badgeRow}>
        <span style={styles.badge}>{property.floor_plan}</span>
      </div>
      <h2 style={styles.name}>{property.name}</h2>
      <p style={styles.area}>📍 {property.area}</p>
      <p style={styles.rent}>
        月額 <span style={styles.rentAmount}>{property.rent.toLocaleString()}円</span>
      </p>
      <div style={styles.actions}>
        <button onClick={() => onEdit(property)} style={styles.editButton}>
          編集
        </button>
        <button onClick={handleDelete} style={styles.deleteButton}>
          削除
        </button>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  badgeRow: {
    marginBottom: '0.25rem',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
    fontSize: '0.75rem',
    padding: '0.2rem 0.6rem',
    borderRadius: '99px',
    fontWeight: 600,
  },
  name: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#1a202c',
  },
  area: {
    fontSize: '0.9rem',
    color: '#718096',
  },
  rent: {
    fontSize: '0.9rem',
    color: '#4a5568',
    marginBottom: '0.5rem',
  },
  rentAmount: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: '#2563eb',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  editButton: {
    flex: 1,
    padding: '0.5rem',
    backgroundColor: '#fff',
    border: '1px solid #cbd5e0',
    borderRadius: '8px',
    fontSize: '0.85rem',
    color: '#2d3748',
    cursor: 'pointer',
  },
  deleteButton: {
    flex: 1,
    padding: '0.5rem',
    backgroundColor: '#fff',
    border: '1px solid #fed7d7',
    borderRadius: '8px',
    fontSize: '0.85rem',
    color: '#e53e3e',
    cursor: 'pointer',
  },
}
