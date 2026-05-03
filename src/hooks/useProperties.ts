import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'
import type { Property, PropertyInput } from '../types/property'

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // RLSにより、ログイン中のユーザーの物件のみ取得される
  const fetchProperties = useCallback(async () => {
    setLoading(true)
    setError(null)

    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setProperties(data ?? [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  // 新規物件を登録する
  const addProperty = async (input: PropertyInput): Promise<string | null> => {
    // user_id はSupabase側のauth.uid()と一致している必要がある（RLSのWITH CHECK条件）
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return 'ログインが必要です'

    const { error } = await supabase
      .from('properties')
      .insert({ ...input, user_id: user.id })

    if (error) return error.message

    await fetchProperties()
    return null
  }

  // 物件情報を更新する
  const updateProperty = async (id: string, input: PropertyInput): Promise<string | null> => {
    const { error } = await supabase
      .from('properties')
      .update(input)
      .eq('id', id)

    if (error) return error.message

    await fetchProperties()
    return null
  }

  // 物件を削除する
  const deleteProperty = async (id: string): Promise<string | null> => {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)

    if (error) return error.message

    // 削除後はステートを直接更新してリフェッチを省略
    setProperties((prev) => prev.filter((p) => p.id !== id))
    return null
  }

  return { properties, loading, error, addProperty, updateProperty, deleteProperty }
}
