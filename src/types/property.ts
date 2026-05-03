// Supabase の properties テーブルの行型
export type Property = {
  id: string
  user_id: string
  name: string
  rent: number
  area: string
  floor_plan: string
  created_at: string
}

// INSERT / UPDATE 時に使うフォーム入力型（id・user_id・created_at はDB側で付与）
export type PropertyInput = {
  name: string
  rent: number
  area: string
  floor_plan: string
}
