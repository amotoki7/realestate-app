type Property = {
  id: number
  name: string
  rent: number
  area: string
  type: string
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div style={styles.card}>
      <div style={styles.badge}>{property.type}</div>
      <h2 style={styles.name}>{property.name}</h2>
      <p style={styles.area}>📍 {property.area}</p>
      <p style={styles.rent}>
        月額 <span style={styles.rentAmount}>{property.rent.toLocaleString()}円</span>
      </p>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    position: 'relative',
    transition: 'transform 0.15s',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
    fontSize: '0.75rem',
    padding: '0.2rem 0.6rem',
    borderRadius: '99px',
    marginBottom: '0.75rem',
    fontWeight: 600,
  },
  name: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#1a202c',
    marginBottom: '0.4rem',
  },
  area: {
    fontSize: '0.9rem',
    color: '#718096',
    marginBottom: '0.75rem',
  },
  rent: {
    fontSize: '0.9rem',
    color: '#4a5568',
  },
  rentAmount: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: '#2563eb',
  },
}
