import { useState } from 'react'
import type { Property, PropertyInput } from '../types/property'

type Props = {
  // 編集時は初期値を渡す。新規登録時は undefined
  initialData?: Property
  onSubmit: (input: PropertyInput) => Promise<string | null>
  onCancel: () => void
}

// 間取りの選択肢
const FLOOR_PLAN_OPTIONS = ['1R', '1K', '1DK', '1LDK', '2K', '2DK', '2LDK', '3LDK', '4LDK以上']

export default function PropertyForm({ initialData, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(initialData?.name ?? '')
  const [rent, setRent] = useState(String(initialData?.rent ?? ''))
  const [area, setArea] = useState(initialData?.area ?? '')
  const [floorPlan, setFloorPlan] = useState(initialData?.floor_plan ?? '')
  const [errorMsg, setErrorMsg] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const isEdit = Boolean(initialData)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    const rentNum = parseInt(rent, 10)
    if (isNaN(rentNum) || rentNum < 0) {
      setErrorMsg('家賃は0以上の整数を入力してください')
      return
    }

    setSubmitting(true)
    const err = await onSubmit({ name, rent: rentNum, area, floor_plan: floorPlan })
    if (err) {
      setErrorMsg(err)
      setSubmitting(false)
    }
    // 成功時は親側でモーダルを閉じる
  }

  return (
    // モーダルオーバーレイ
    <div style={styles.overlay} onClick={onCancel}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.title}>{isEdit ? '物件を編集' : '物件を新規登録'}</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>物件名</label>
          <input
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="例: グランドヒルズ渋谷"
          />

          <label style={styles.label}>家賃（円）</label>
          <input
            style={styles.input}
            type="number"
            min={0}
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            required
            placeholder="例: 150000"
          />

          <label style={styles.label}>エリア</label>
          <input
            style={styles.input}
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
            placeholder="例: 東京都渋谷区"
          />

          <label style={styles.label}>間取り</label>
          <select
            style={styles.input}
            value={floorPlan}
            onChange={(e) => setFloorPlan(e.target.value)}
            required
          >
            <option value="">選択してください</option>
            {FLOOR_PLAN_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>

          {errorMsg && <p style={styles.error}>{errorMsg}</p>}

          <div style={styles.actions}>
            <button type="button" onClick={onCancel} style={styles.cancelButton}>
              キャンセル
            </button>
            <button type="submit" disabled={submitting} style={styles.submitButton}>
              {submitting ? '送信中...' : isEdit ? '更新する' : '登録する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    width: '100%',
    maxWidth: '480px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
  },
  title: {
    fontSize: '1.3rem',
    fontWeight: 700,
    color: '#1a202c',
    marginBottom: '1.25rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  label: {
    fontSize: '0.85rem',
    color: '#555',
    marginTop: '0.6rem',
  },
  input: {
    padding: '0.7rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    outline: 'none',
    width: '100%',
  },
  error: {
    color: '#e53e3e',
    fontSize: '0.85rem',
    marginTop: '0.25rem',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
    marginTop: '1.25rem',
  },
  cancelButton: {
    padding: '0.65rem 1.2rem',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: '#fff',
    color: '#4a5568',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  submitButton: {
    padding: '0.65rem 1.4rem',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
}
